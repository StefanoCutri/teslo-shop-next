import jwt from "jsonwebtoken";

export const signJwt = async (_id: string, email: string) => {


    if (!process.env.JW_SECRET_SEED) {
        throw new Error('No JWT Seed - Check environment variables')
    }

    return jwt.sign(
        {_id, email},
        process.env.JW_SECRET_SEED,
        {
            expiresIn: '7d'
        }
    )

};
