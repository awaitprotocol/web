import Typesense from "typesense"
import { Schema } from "./types"

export const client = new Typesense.Client({
  nodes: [
    {
      host: "127.0.0.1",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz", // default API key
  connectionTimeoutSeconds: 2,
})

export const name = "sites"

export const collection = client.collections<Schema>(name)
