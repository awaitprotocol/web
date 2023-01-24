import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections"
import { CollectionFieldSchema } from "typesense/lib/Typesense/Collection"
import { client, collection, name, Schema } from "../shared/typesense"

type CollectionSchema = CollectionCreateSchema & {
  fields: Array<CollectionFieldSchema & { name: keyof Schema }>
}

const schema: CollectionSchema = {
  name,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string", optional: true },
    { name: "desc", type: "string", optional: true },
    { name: "text", type: "string[]" },
    { name: "date", type: "int64" },
  ],
}

async function dropAndCreateSchema() {
  await collection.delete()

  const { name, created_at } = await client.collections().create(schema)
  console.log("done", name, created_at)
}

dropAndCreateSchema()
