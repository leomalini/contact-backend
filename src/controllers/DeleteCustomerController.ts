import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.query as { id: string };

      // First check if the customer belongs to the user
      const customer = await prisma.customer.findFirst({
        where: {
          id,
          userId: request.user.id,
        },
      });

      if (!customer) {
        return reply.status(404).send({ error: "Customer not found" });
      }

      await prisma.customer.delete({
        where: { id },
      });

      return reply
        .status(200)
        .send({ message: "Customer deleted successfully" });
    } catch (error) {
      return reply.status(400).send({ error: error });
    }
  }
}
