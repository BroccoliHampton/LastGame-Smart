export async function getAddressForFid(fid) {
  try {
    const response = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY,
      },
    })

    const data = await response.json()

    if (data.users && data.users[0] && data.users[0].verified_addresses) {
      // Return the first verified Ethereum address
      const ethAddresses = data.users[0].verified_addresses.eth_addresses
      if (ethAddresses && ethAddresses.length > 0) {
        return ethAddresses[0]
      }
    }

    return null
  } catch (error) {
    console.error("[v0] Error fetching address for FID:", error)
    return null
  }
}
