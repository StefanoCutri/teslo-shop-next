import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { User } from "@/models";
import { isValidToken, signJwt } from "@/utils";

type Data =
  | {
      message: string;
    }
  | { token: string; user: { email: any; role: string; name: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";
  try {
    userId = await isValidToken(token);
  } catch (error) {
    res.status(401).json({
      message: "JWT not valid",
    });
  }

    await db.connect();
    const user = await User.findById(userId);
    await db.disconnect();

    if (!user) {
      return res.status(400).json({
        message: "No user found with that id",
      });
    }

    const { role, name, _id, email } = user;


    return res.status(200).json({
      token : await signJwt(_id, email),
      user: {
        email,
        role,
        name,
      },
    });
};
