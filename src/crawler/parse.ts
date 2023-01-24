import fs from "node:fs"
import readline from "node:readline"
import { loadEnvConfig } from "@next/env"
import { ethers } from "ethers"
import { CheerioAPI, load } from "cheerio"
import { collection, Schema } from "../shared/typesense"

loadEnvConfig(process.cwd())

async function main() {
  const domains = readline.createInterface({
    input: fs.createReadStream("src/crawler/ens.txt"),
    crlfDelay: Infinity,
  })

  for await (const domain of domains) {
    const url = await getUrl(domain)
    if (!url) continue

    const html = await fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          console.error(res.status, url)
          return null
        }

        return res.text()
      })
      .catch((error) => console.error("fetch error", error))

    if (!html) continue
    const $ = load(html)

    const document: Schema = {
      id: domain,
      title: getProperty($, "title"),
      desc: getProperty($, "description"),
      text: $("body")
        .text()
        .split(/[\n|\r|\t]/)
        .map((s) => s.trim())
        .filter(Boolean),
      date: Date.now(),
    }

    const { date } = await collection.documents().upsert(document)
    console.log(url, date)
  }
}

async function getUrl(domain: string): Promise<string | null> {
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

function getProperty($: CheerioAPI, field: string): string | undefined {
  const text =
    $(field).text() ||
    $(`[property="og:${field}"]`).attr("content") ||
    $(`[property="twitter:${field}"]`).attr("content")

  return text?.trim()
}

main()
