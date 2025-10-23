import { getAddressForFid } from "../../lib/frame-helpers.js"

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // Base USDC
const CONTRACT_ADDRESS = "0x9C751E6825EDAa55007160b99933846f6ECeEc9B"
const CHAIN_ID = "eip155:8453" // Base

export async function POST(req) {
  try {
    const body = await req.json()

    // Get user's address from their FID
    const address = await getAddressForFid(body.untrustedData.fid)

    if (!address) {
      return new Response(JSON.stringify({ error: "Could not get user address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Approve contract to spend max USDC (type(uint256).max)
    const approvalCalldata = `0x095ea7b3${CONTRACT_ADDRESS.slice(2).padStart(64, "0")}${"f".repeat(64)}`

    return new Response(
      JSON.stringify({
        chainId: CHAIN_ID,
        method: "eth_sendTransaction",
        params: {
          abi: [
            {
              inputs: [
                { name: "spender", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              name: "approve",
              outputs: [{ name: "", type: "bool" }],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          to: USDC_ADDRESS,
          data: approvalCalldata,
          value: "0",
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] Error in approve-tx:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
