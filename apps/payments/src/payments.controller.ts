/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { SubscriptionPlansService } from './payments.service';

@Controller()
export class ServiceCategoryController {
  constructor(private readonly serviceCategoryService: ServiceCategoryService) { }

  @MessagePattern(SERVICECATEGORYPATTERN.CREATE)
  create(@Payload() createServiceCategoryDto: CreateServiceCategoryDto) {
    return from(this.serviceCategoryService.create(createServiceCategoryDto)).pipe(
      catchError((err) => {
        console.error("Error in ServiceCategoryService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  @MessagePattern(SERVICECATEGORYPATTERN.FINDALL)
  findAll(@Payload() limit: number, @Payload() offset: number, deletedAt?: boolean) {
    return from(this.serviceCategoryService.findAll(limit, offset, deletedAt)).pipe(
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

  @MessagePattern(SERVICECATEGORYPATTERN.FINDONEBYID)
  findOne(@Payload() id: string) {
    return from(this.serviceCategoryService.findOne(id)).pipe(
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



  @MessagePattern(SERVICECATEGORYPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updateServiceCategoryDto: UpdateServiceCategoryDto) {
    return from(this.serviceCategoryService.update(id, updateServiceCategoryDto)).pipe(
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

  @MessagePattern(SERVICECATEGORYPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.serviceCategoryService.remove(id, updaterId)).pipe(
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


  @MessagePattern(SERVICECATEGORYPATTERN.PERMANENTDELETE)
  permanentDelete(@Payload() id: string) {
    return from(this.serviceCategoryService.permanentDelete(id)).pipe(
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
