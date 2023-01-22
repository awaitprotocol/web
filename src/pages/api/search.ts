// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { exRes } from "./exampleResut";
import { TypeResult } from "./types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TypeResult>
) {
  res.status(200).json(exRes)
   
}
