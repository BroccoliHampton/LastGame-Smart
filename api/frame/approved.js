export async function POST(req) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.vercel.app"

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/frame/image-approved" />
        <meta property="fc:frame:button:1" content="Take Over!" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}/api/frame/takeover-tx" />
        <meta property="fc:frame:button:1:post_url" content="${baseUrl}/api/frame/verify" />
      </head>
    </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}
