import type { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "webmaster@otai.co.jp";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "noreply@otai.co.jp";

export async function handler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("Contact form submission received");

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight request
  if (request.method === "OPTIONS") {
    return { status: 204, headers };
  }

  // Only allow POST
  if (request.method !== "POST") {
    return {
      status: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = await request.json() as ContactFormData;

    // Validate required fields
    if (!data.name || !data.email || !data.category || !data.message) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({ error: "必須項目を入力してください" }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({ error: "メールアドレスの形式が正しくありません" }),
      };
    }

    const categoryLabels: Record<string, string> = {
      product: "商品について",
      custom: "オリジナル制作について",
      catalog: "カタログ請求",
      other: "その他",
    };

    const emailContent = `
小田井窯ウェブサイトからお問い合わせがありました。

【お名前】
${data.name}

【メールアドレス】
${data.email}

【電話番号】
${data.phone || "未入力"}

【お問い合わせ種別】
${categoryLabels[data.category] || data.category}

【お問い合わせ内容】
${data.message}
    `.trim();

    // Send email via SendGrid
    if (SENDGRID_API_KEY) {
      const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: TO_EMAIL }],
              subject: `【お問い合わせ】${categoryLabels[data.category] || "小田井窯ウェブサイト"}`,
            },
          ],
          from: { email: FROM_EMAIL, name: "小田井窯ウェブサイト" },
          reply_to: { email: data.email, name: data.name },
          content: [
            {
              type: "text/plain",
              value: emailContent,
            },
          ],
        }),
      });

      if (!sendGridResponse.ok) {
        context.error("SendGrid error:", await sendGridResponse.text());
        throw new Error("メール送信に失敗しました");
      }
    } else {
      // Log for development (no SendGrid key)
      context.log("Contact form data (SendGrid not configured):", data);
    }

    return {
      status: 200,
      headers,
      body: JSON.stringify({ success: true, message: "お問い合わせを受け付けました" }),
    };
  } catch (error) {
    context.error("Error processing contact form:", error);
    return {
      status: 500,
      headers,
      body: JSON.stringify({ error: "サーバーエラーが発生しました" }),
    };
  }
}

export default handler;
