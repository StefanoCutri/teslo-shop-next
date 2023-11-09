// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(400).json({ message: "Should scpecify search query" });
}
