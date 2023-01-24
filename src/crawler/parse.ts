import fs from "node:fs"
import readline from "node:readline"
import { loadEnvConfig } from "@next/env"
import { ethers } from "ethers"
import { CheerioAPI, load } from "cheerio"
import { collection } from "./config"
import { Schema } from "./types"

loadEnvConfig(process.cwd())

async function main() {
  const { ALCHEMY_API, IPFS_GATEWAY } = process.env
  const provider = new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API)
  const domains = readline.createInterface({
    input: fs.createReadStream("src/crawler/ens.txt"),
    crlfDelay: Infinity,
  })

  for await (const domain of domains) {
    const resolver = await provider.getResolver(domain)
    if (!resolver) continue

    const contentHash = await resolver.getContentHash()
    if (!contentHash) continue

    const [protocol, hash] = contentHash.split("://")
    const response = await fetch(`${IPFS_GATEWAY}/${protocol}/${hash}`)
    const html = await response.text()
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

    const { id, date } = await collection.documents().upsert(document)
    console.log(id, date)
  }
}

function getProperty($: CheerioAPI, field: string): string | undefined {
  const text =
    $(field).text() ||
    $(`[property="og:${field}"]`).attr("content") ||
    $(`[property="twitter:${field}"]`).attr("content")

  return text?.trim()
}

main()
