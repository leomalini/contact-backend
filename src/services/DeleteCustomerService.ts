import prismaClient from "../prisma";

interface DeleteCustomerProps {
  id: string;
}

class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    if (!id) {
      throw new Error("Informe o ID do usuário!");
    }

    const customerExists = await prismaClient.customer.findFirst({
      where: {
        id,
      },
    });

    if (!customerExists) {
      throw new Error("Usuário não encontrado!");
    }

    await prismaClient.customer.delete({
      where: {
        id,
      },
    });

    return { message: "Usuário deletado com sucesso!" };
  }
}

export { DeleteCustomerService };
