import Typesense from "typesense"

export type Schema = {
  id: string
  title: string | undefined
  desc?: string | undefined
  text?: string[]
  date: number
}

export const client = new Typesense.Client({
  nodes: [
    {
      host: "167.71.42.6",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || "xyz",
  connectionTimeoutSeconds: 2,
})

export const name = "sites"

export const collection = client.collections<Schema>(name)
