// shared/lib/prisma-error-handler.ts
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class PrismaErrorHandler {
  static handle(error: unknown, PrismaNamespace: any) {
    if (!(error instanceof PrismaNamespace.PrismaClientKnownRequestError)) {
        return
    }

    const meta = (error as any ).meta as Record<string, any> | undefined;

    switch ((error as any ).code) {

      case "P2002":

        throw new BadRequestException(`${(meta?.modelName as string || '').toLowerCase()} with ${(meta?.target[0] as string || '').toLowerCase()} already exists`, {
            cause: new Error(),
            description: (error as any ).message
        });

      case "P2003":
        throw new BadRequestException(`Invalid foreign key value for ${meta?.field_name || 'unknown field'}`, {
            cause: new Error(),
            description: (error as any ).message
        });

      case "P2004":
        throw new BadRequestException( `Null value in column ${meta?.field_name || 'unknown field'} violates not-null constraint`, {
            cause: new Error(),
            description: (error as any ).message
        });

      case "P2000":
        throw new BadRequestException(
          `Value too long for field ${meta?.field_name || 'unknown field'}`,
          { cause: error, description: (error as any ).message }
        );


      case "P2025":
        throw new NotFoundException(
          `${meta?.cause || 'No record found'}`,
          { cause: error, description: (error as any ).message }
        );

      default:
        throw new BadRequestException(
          `Database error: ${(error as any ).message}`,
          { cause: error }
        );
    }
  }
}
