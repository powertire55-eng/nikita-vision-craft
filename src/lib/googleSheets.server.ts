import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const appendResponseSchema = z.object({
  updates: z.object({
    updatedRange: z.string().optional(),
  }).optional(),
});

export async function appendToSheet({
  spreadsheetId,
  range,
  values,
}: {
  spreadsheetId: string;
  range: string;
  values: unknown[][];
}) {
  const lovableApiKey = process.env.LOVABLE_API_KEY;
  const sheetsApiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!lovableApiKey) {
    throw new Error("LOVABLE_API_KEY is not configured");
  }
  if (!sheetsApiKey) {
    throw new Error("Google Sheets connection is not linked. Connect Google Sheets in project settings.");
  }

  const url = `${GATEWAY_URL}/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": sheetsApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range,
      majorDimension: "ROWS",
      values,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error(`Google Sheets append failed [${response.status}]: ${errorText}`);
    throw new Error(`Google Sheets request failed [${response.status}]: ${errorText}`);
  }

  const raw = await response.json();
  const parsed = appendResponseSchema.safeParse(raw);
  if (!parsed.success) {
    console.warn("Unexpected Google Sheets response shape", raw);
  }

  return parsed.data ?? raw;
}
