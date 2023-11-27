import jwt from "jsonwebtoken";

export const signJwt = async (_id: string, email: string) => {
  if (!process.env.JW_SECRET_SEED) {
    throw new Error("No JWT Seed - Check environment variables");
  }

  return jwt.sign({ _id, email }, process.env.JW_SECRET_SEED, {
    expiresIn: "7d",
  });
};

export const isValidToken = async (token: string): Promise<string> => {
  if (!process.env.JW_SECRET_SEED) {
    throw new Error("No JWT Seed - Check environment variables");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JW_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("JWT not valid");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject("JWT not valid");
    }
  });
};
