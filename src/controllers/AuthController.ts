import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = request.body as {
        name: string;
        email: string;
        password: string;
      };

      const result = await this.authService.register(name, email, password);
      return reply.status(201).send(result);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "Email already registered"
      ) {
        return reply.status(409).send({ error: "Email already registered" });
      }
      return reply
        .status(400)
        .send({
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const result = await this.authService.login(email, password);
      return reply.status(200).send(result);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "User not found") {
        return reply.status(404).send({ error: "User not found" });
      }
      if (error instanceof Error && error.message === "Invalid password") {
        return reply.status(401).send({ error: "Invalid password" });
      }
      return reply
        .status(400)
        .send({
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
}
