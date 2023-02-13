import { ethers } from "ethers"
import { CheerioAPI } from "cheerio"

export async function getUrl(domain: string): Promise<string | null> {
  const { ALCHEMY_API, IPFS_GATEWAY, ENS_GATEWAY } = process.env
  if (ENS_GATEWAY) return `https://${domain}.${ENS_GATEWAY}/`

  const provider = new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API)

  const resolver = await provider.getResolver(domain)
  if (!resolver) return null

  const contentHash = await resolver.getContentHash()
  if (!contentHash) return null

  const [protocol, hash] = contentHash.split("://")
  return `${IPFS_GATEWAY}/${protocol}/${hash}`
}

export function getProperty($: CheerioAPI, field: string): string | undefined {
  const text =
    $(field).text() ||
    $(`[property="og:${field}"]`).attr("content") ||
    $(`[property="twitter:${field}"]`).attr("content")

  return text?.trim()
}
