import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: string;
    };
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return reply.status(401).send({ error: "User not found" });
    }

    request.user = { id: user.id };
  } catch (error) {
    return reply.status(401).send({ error: "Invalid token" });
  }
}
