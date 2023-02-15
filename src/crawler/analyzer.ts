import { ethers } from "ethers"
import { CheerioAPI } from "cheerio"

const supportedProtocols = ["ipfs", "ipns"]

export async function getUrl(domain: string): Promise<string | void> {
  const { ALCHEMY_API, IPFS_GATEWAY, ENS_GATEWAY } = process.env

  if (ENS_GATEWAY) return `https://${domain}.${ENS_GATEWAY}/`

  try {
    const provider = new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API)
    const resolver = await provider.getResolver(domain)
    if (!resolver) return console.error(domain, "no resolver")

    const contentHash = await resolver.getContentHash()
    if (!contentHash) return console.error(domain, "no contentHash")

    const [protocol, hash] = contentHash.split("://")

    if (supportedProtocols.includes(protocol)) {
      return `${IPFS_GATEWAY}/${protocol}/${hash}`
    }
  } catch (error: any) {
    console.error("getUrl", error?.operation, error?.code, error?.reason)
  }
}

export function getProperty($: CheerioAPI, field: string): string | undefined {
  const text =
    $(field).text() ||
    $(`[property="og:${field}"]`).attr("content") ||
    $(`[property="twitter:${field}"]`).attr("content")

  return text?.trim()
}
