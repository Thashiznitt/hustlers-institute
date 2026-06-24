import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email, redirect } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

    // Store token in DB
    await prisma.authToken.create({
      data: {
        email: cleanEmail,
        token,
        expiresAt,
      },
    });

    const origin = new URL(request.url).origin;
    let magicLink = `${origin}/api/auth/verify?token=${token}`;
    if (redirect) {
      magicLink += `&redirect=${encodeURIComponent(redirect)}`;
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Sovereign Onboarding <onboarding@sovereignmillionaires.com>",
      to: cleanEmail,
      subject: "Access the Sovereign Millionaires Foundry",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sovereign Foundry Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #faf9f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #faf9f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 0px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <!-- Top Header Status Bar -->
          <tr>
            <td style="background-color: #eae3d7; padding: 12px 24px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <span style="font-family: monospace; font-size: 10px; font-weight: bold; color: #5c5346; letter-spacing: 0.15em; text-transform: uppercase;">
                THE SOVEREIGN SYNDICATE • FOUNDRY ACCESS
              </span>
            </td>
          </tr>
          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 32px; text-align: left;">
              <span style="font-size: 11px; font-weight: bold; color: #64748b; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase; display: block; margin-bottom: 12px;">
                Secured Login Request
              </span>
              <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">
                Access the Foundry
              </h1>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; font-weight: 500;">
                You requested a secure connection link to log in to Sovereign Millionaires. Click the link below to enter your workspace and resume your road to sovereign freedom.
              </p>
              <!-- CTA Button -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center" style="background-color: #000000; border-radius: 0px;">
                    <a href="${magicLink}" target="_blank" style="display: inline-block; padding: 14px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid #000000;">
                      Enter the Foundry &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin: 0 0 8px 0;">
                If you did not request this email, you can safely ignore it.
              </p>
              <p style="font-size: 11px; line-height: 1.5; color: #94a3b8; margin: 0; border-top: 1px dashed #e2e8f0; padding-top: 16px;">
                This link will expire in 60 minutes for security reasons.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf9f6; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <span style="font-size: 10px; color: #94a3b8; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">
                SOVEREIGNMILLIONAIRES.COM
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json({ error: e.message || "Failed to send magic link" }, { status: 500 });
  }
}
