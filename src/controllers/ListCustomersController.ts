import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const customers = await prisma.customer.findMany({
        where: {
          userId: request.user.id,
        },
      });

      return reply.status(200).send(customers);
    } catch (error) {
      return reply.status(400).send({ error: error });
    }
  }
}
