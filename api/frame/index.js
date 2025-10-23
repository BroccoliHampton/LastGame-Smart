export async function GET(req) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.vercel.app"

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/frame/image" />
        <meta property="fc:frame:button:1" content="Play Game" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}/api/frame/approve-tx" />
        <meta property="fc:frame:button:1:post_url" content="${baseUrl}/api/frame/approved" />
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

export async function POST(req) {
  return GET(req)
}
