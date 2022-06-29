import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateRoute = (handler) => [
  async (req: NextApiRequest, res: NextApiResponse) => {
    // COOKIE REQ PROCESS ENV
    const token = req.cookies[process.env.TOKEN_NAME];
    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("User not found");
        }
      } catch (err) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Not Authorized" });
  },
];
