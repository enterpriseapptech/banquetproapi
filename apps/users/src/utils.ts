import { Prisma } from '../prisma/@prisma/users';
import { PrismaClient } from '@prisma/client';

export type PrismaClientOrTransaction =
  | PrismaClient
  | Prisma.TransactionClient;

export async function findUser(
    prisma: PrismaClientOrTransaction,
    where: Prisma.UserWhereInput,
    select?: Prisma.UserSelectScalar,
    include?: Prisma.UserInclude,
) {
    return prisma.user.findFirst({
        where,
        include,
        select,
    });
}

export async function updateUser(
    prisma: PrismaClientOrTransaction,
    where: Prisma.UserWhereInput,
    userUpdateInpute: Prisma.UserUpdateInput,
): Promise<void> {
    await prisma.user.update({
        where,
        data: { ...userUpdateInpute }
    });
}
