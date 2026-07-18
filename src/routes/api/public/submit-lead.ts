import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { appendToSheet } from "@/lib/googleSheets.server";
import { sendTelegramMessage } from "@/lib/telegram.server";

const ALLOWED_ORIGINS = new Set([
  "https://ziminikita.ru",
  "https://www.ziminikita.ru",
  "http://localhost:8080",
  "http://localhost:3000",
]);

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://ziminikita.ru";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  } as const;
}

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(1).max(50),
  eventType: z.string().trim().min(1).max(50),
  contactWay: z.string().trim().min(1).max(50),
  date: z.string().trim().max(50).optional().default(""),
  comment: z.string().trim().max(1000).optional().default(""),
  // honeypot — must be empty
  website: z.string().max(0).optional(),
});

export const Route = createFileRoute("/api/public/submit-lead")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(request.headers.get("origin")),
        });
      },
      POST: async ({ request }) => {
        const cors = corsHeaders(request.headers.get("origin"));
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Validation failed" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }
        const data = parsed.data;

        const row = [
          new Date().toLocaleString("ru-RU"),
          data.name,
          data.phone,
          data.eventType,
          data.contactWay,
          data.date || "",
          data.comment || "",
        ];

        const spreadsheetId = process.env.GOOGLE_SHEETS_LEADS_SPREADSHEET_ID;
        if (spreadsheetId) {
          try {
            await appendToSheet({ spreadsheetId, range: "Заявка!A1", values: [row] });
          } catch (err) {
            console.error("Google Sheets append failed", err);
          }
        }

        const escape = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const lines = [
          "<b>🎤 Новая заявка с сайта</b>",
          `<b>Имя:</b> ${escape(data.name)}`,
          `<b>Телефон:</b> ${escape(data.phone)}`,
          `<b>Тип мероприятия:</b> ${escape(data.eventType)}`,
          `<b>Способ связи:</b> ${escape(data.contactWay)}`,
        ];
        if (data.date) lines.push(`<b>Дата:</b> ${escape(data.date)}`);
        if (data.comment) lines.push(`<b>Комментарий:</b> ${escape(data.comment)}`);
        try {
          await sendTelegramMessage(lines.join("\n"));
        } catch (err) {
          console.error("Telegram notification failed", err);
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...cors },
        });
      },
    },
  },
});