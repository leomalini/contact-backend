import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, status } = request.body as {
        name: string;
        email: string;
        status: boolean;
      };

      const customer = await prisma.customer.create({
        data: {
          name,
          email,
          status: true,
          userId: request.user.id,
        },
      });

      return reply.status(201).send(customer);
    } catch (error) {
      return reply.status(400).send({ error: error });
    }
  }
}
