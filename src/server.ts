import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  await app.register(routes);

  try {
    await app.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3333,
      host: "0.0.0.0",
    });
  } catch (err) {
    process.exit(1);
  }
};

start();
