import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import { isValidEmail, signJwt } from "@/utils";

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
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    email = "",
    password = "",
  } = req.body as { name: string; email: string; password: string };

  if (name.length < 2) {
    return res.status(400).json({
      message: "Name should be at least 2 characters long",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password should be at least 6 characters long",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "The email is not valid",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "There is already an user with that email",
    });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    name,
    role: "client",
    password: bcrypt.hashSync(password),
  });

  try {
    newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Check server logs",
    });
  }

  const { role, _id } = newUser;

  const token = await signJwt(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
