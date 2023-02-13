import fs from "node:fs"
import readline from "node:readline"
import PQueue from "p-queue"
import { loadEnvConfig } from "@next/env"
import { load } from "cheerio"
import { collection, Schema } from "../shared/typesense"
import { getProperty, getUrl } from "./analyzer"

loadEnvConfig(process.cwd())

const queue = new PQueue({ concurrency: 20 }).on("idle", () => {
  console.log(`Queue is idle. Size: ${queue.size}  Pending: ${queue.pending}`)
})

async function main() {
  const domains = readline.createInterface({
    input: fs.createReadStream("src/crawler/ens.txt"),
    crlfDelay: Infinity,
  })

  for await (const domain of domains) {
    queue.add(async () => {
      const url = await getUrl(domain)
      if (!url) return

      const html = await fetch(url)
        .then((res) => {
          if (res.status !== 200) {
            console.error(res.status, url)
            return null
          }

          return res.text()
        })
        .catch((error) => console.error("fetch", domain, error.message))

      if (!html) return
      const $ = load(html)

      if ($("title").text().endsWith(" Nimi")) {
        console.error("nimi", url)
        return
      }

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

      collection
        .documents()
        .upsert(document)
        .then(({ date }) => console.log(url, date))
    })
  }
}

main()
