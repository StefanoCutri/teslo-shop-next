import { User } from "@/models";
import { db } from ".";
import bcrypt from "bcryptjs";

export const checkUser = async (email: string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { name, role, _id } = user;

  return {
    name,
    role,
    _id,
  };
};
