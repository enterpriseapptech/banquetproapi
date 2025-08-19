import { Controller } from '@nestjs/common';
import { CateringService } from './catering.service';
import { MessagePattern, Payload, RpcException, RmqContext, Ctx } from '@nestjs/microservices';
import { CATERINGPATTERN, CreateCateringDto, UpdateCateringDto } from '@shared/contracts/catering';
import { catchError, from, throwError } from 'rxjs';


@Controller()
export class CateringController {
  constructor(private readonly cateringService: CateringService) {}

  @MessagePattern(CATERINGPATTERN.CREATE)
      create(@Payload() createCateringDto: CreateCateringDto, @Ctx() context: RmqContext,) {
          return from(this.cateringService.create(createCateringDto)).pipe(
                  catchError((err) => {
                      console.error("Error in UsersService:", err);
                      return throwError(() => new RpcException({
                          statusCode: err.response.statusCode || 500,
                          message: err.message || "Internal Server Error",
                          error: err.response.error || "Sever error",
                      }));
  
                  })
              );
      }
  
      @MessagePattern(CATERINGPATTERN.FINDALL)
      findAll(@Payload() data: { limit?: number, offset?: number, serviceProvider?: string, city?: string, state?: string, country?: string, }) {
          const { limit, offset, serviceProvider, city, state, country } = data
          return from(this.cateringService.findAll(limit, offset, serviceProvider, city, state, country)).pipe(
              catchError((err) => {
                  console.error("Error in UsersService:", err);
                  return throwError(() => new RpcException({
                      statusCode: err.response.statusCode || 500,
                      message: err.message || "Internal Server Error",
                      error: err.response.error || "Sever error",
                  }));
  
              })
          );
  
      }
  
      @MessagePattern(CATERINGPATTERN.FINDONEBYID)
      findOne(@Payload() id: string) {
          return from(this.cateringService.findOne(id)).pipe(
              catchError((err) => {
                  console.error("Error in UsersService:", err);
                  return throwError(() => new RpcException({
                      statusCode: err.response.statusCode || 500,
                      message: err.message || "Internal Server Error",
                      error: err.response.error || "Sever error",
                  }));
  
              })
          );
  
      }
  
      @MessagePattern(CATERINGPATTERN.UPDATE)
      update(@Payload() data: { id: string, updateCateringDto: UpdateCateringDto}) {
        const { id, updateCateringDto } = data
        return from(this.cateringService.update(id, updateCateringDto)).pipe(
              catchError((err) => {
                  console.error("Error in EventService:", err);
                  return throwError(() => new RpcException({
                      statusCode: err.response.statusCode || 500,
                      message: err.message || "Internal Server Error",
                      error: err.response.error || "Sever error",
                  }));
  
              })
          );
  
      }
  
      @MessagePattern(CATERINGPATTERN.DELETE)
      remove(@Payload() data: { id: string, updaterId: string }) {
          const { id, updaterId } = data
          return from(this.cateringService.remove(id, updaterId)).pipe(
              catchError((err) => {
                  console.error("Error in UsersService:", err);
                  return throwError(() => new RpcException({
                      statusCode: err.response.statusCode || 500,
                      message: err.message || "Internal Server Error",
                      error: err.response.error || "Sever error",
                  }));
  
              })
          );
  
      }
}
