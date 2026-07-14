import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendToSheet } from "./googleSheets.server";

const submitLeadSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(100, "Имя слишком длинное"),
  phone: z.string().trim().min(1, "Укажите телефон").max(50, "Телефон слишком длинный"),
  eventType: z.string().trim().min(1).max(50),
  contactWay: z.string().trim().min(1).max(50),
  date: z.string().trim().max(50).optional(),
  comment: z.string().trim().max(1000).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((data) => submitLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const spreadsheetId = process.env.GOOGLE_SHEETS_LEADS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEETS_LEADS_SPREADSHEET_ID is not configured");
    }

    const row = [
      new Date().toLocaleString("ru-RU"),
      data.name,
      data.phone,
      data.eventType,
      data.contactWay,
      data.date || "",
      data.comment || "",
    ];

    const result = await appendToSheet({
      spreadsheetId,
      range: "Заявки!A1",
      values: [row],
    });

    return { success: true, updatedRange: result.updates?.updatedRange };
  });
