const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

export async function sendTelegramMessage(text: string) {
  const lovableApiKey = process.env.LOVABLE_API_KEY;
  const telegramApiKey = process.env.TELEGRAM_API_KEY;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!lovableApiKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!telegramApiKey) throw new Error("TELEGRAM_API_KEY is not configured");
  if (!chatId) throw new Error("TELEGRAM_CHAT_ID is not configured");

  const response = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": telegramApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error(`Telegram sendMessage failed [${response.status}]: ${errorText}`);
    throw new Error(`Telegram request failed [${response.status}]: ${errorText}`);
  }

  return response.json();
}
