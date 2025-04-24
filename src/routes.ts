import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { AuthController } from "./controllers/AuthController";
import { authenticate } from "./middleware/auth";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: "Hello World!" };
  });

  // Auth routes
  fastify.post(
    "/auth/register",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AuthController().register(request, reply);
    }
  );

  fastify.post(
    "/auth/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AuthController().login(request, reply);
    }
  );

  // Protected Customer routes
  fastify.post(
    "/customer",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply);
    }
  );

  fastify.get(
    "/customers",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersController().handle(request, reply);
    }
  );

  fastify.delete(
    "/customer",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );
}
