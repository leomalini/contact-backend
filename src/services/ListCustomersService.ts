import prismaClient from "../prisma";

class ListCustomerService {
  async execute() {
    const customers = await prismaClient.customer.findMany({
      where: {
        status: true,
      },
    });

    return customers;
  }
}

export { ListCustomerService };
