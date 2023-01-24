export type Schema = {
  id: string
  title: string | undefined
  desc: string | undefined
  text: string[]
  date: number
}

type Keys = keyof Schema

/** @see https://typesense.org/docs/0.22.2/api/documents.html#search-parameters */
export type Parameters = {
  q: string
  query_by:
    | `${Keys}`
    | `${Keys}, ${Keys}`
    | `${Keys}, ${Keys}, ${Keys}`
    | `${Keys}, ${Keys}, ${Keys}, ${Keys}`
  exclude_fields: Keys
  highlight_fields: Keys
  highlight_affix_num_tokens: number
}
