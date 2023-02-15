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
      host: process.env.SEARCH_API_HOST || "127.0.0.1",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: process.env.SEARCH_API_KEY || "xyz",
  connectionTimeoutSeconds: 3,
})

export const name = "sites"

export const collection = client.collections<Schema>(name)

export type Messages = {
  mainDesc: string
  search: string
  close: string
  saveChanges: string
  chooseENS: string
  gateway: string
  social: string
  we: string
  weDesc: string
}
