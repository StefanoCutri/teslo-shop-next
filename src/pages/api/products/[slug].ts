// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SHOP_CONSTANTS, db } from "../../../../database";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsBySlug(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }

  res.status(200).json({ message: "Proccess completed successfully" });
}

const getProductsBySlug = async ( req: NextApiRequest,res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({message: "Product couldn't be found"})
  }

  return res.status(200).json(product);
};
