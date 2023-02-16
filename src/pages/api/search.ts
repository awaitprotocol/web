import type { NextApiRequest, NextApiResponse } from "next"
import { SearchParams, SearchResponse } from "typesense/lib/Typesense/Documents"
import { z, ZodIssue } from "zod"
import { collection, Schema } from "@/shared/typesense"

type Keys = keyof Schema
type Parameters = SearchParams & {
  q: string
  page: number
  query_by:
    | `${Keys}`
    | `${Keys}, ${Keys}`
    | `${Keys}, ${Keys}, ${Keys}`
    | `${Keys}, ${Keys}, ${Keys}, ${Keys}`
  exclude_fields: Keys
  highlight_fields: Keys
  highlight_affix_num_tokens: number
  per_page: number
}

const querySchema = z.object({
  q: z
    .string({ required_error: "Query is required" })
    .min(2, { message: "Must be 2 or more characters long" }),
  page: z.string({ required_error: "Query is required" }),
})

export type Res =
  | { success: false; error: ZodIssue }
  | { success: true; result: SearchResponse<Schema> }

async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  const query = querySchema.safeParse(req.query)
  if (!query.success) {
    return res.status(200).json({ success: false, error: query.error.issues[0] })
  }

  const parameters: Parameters = {
    q: query.data.q,
    page: Number(query.data.page),
    query_by: "title, desc, text",
    exclude_fields: "text",
    highlight_fields: "text",
    highlight_affix_num_tokens: 10,
    per_page: 5,
  }

  const result = await collection.documents().search(parameters)
  res.status(200).json({ success: true, result })
}

export default handler
