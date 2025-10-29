import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { CountryService, StateService, AppSettingService } from './management.service';
import { CreateAppSettingDto, CreateCountryDto,  CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { APPSETTINGPATTERN, COUNTRYPATTERN, STATEPATTERN } from '@shared/contracts/management/management.pattern';
import { UpdateAppSettingDto, UpdateCountryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';



@Controller()
export class AppSettingController {
	constructor(private readonly appSettingService: AppSettingService) { }

	@MessagePattern(APPSETTINGPATTERN.CREATE)
	create(@Payload() createAppSettingDto: CreateAppSettingDto) {
		return from(this.appSettingService.create(createAppSettingDto)).pipe(
			catchError((err) => {
				console.error("Error in appSettingService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(APPSETTINGPATTERN.FIND)
	find() {
		return from(this.appSettingService.find()).pipe(
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


	@MessagePattern(APPSETTINGPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateAppSettingDto: UpdateAppSettingDto) {
		return from(this.appSettingService.update(id, updateAppSettingDto)).pipe(
			catchError((err) => {
				console.error("Error in updateAppSettingDto:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

}

@Controller() 
export class CountryController {
	constructor(private readonly countryService: CountryService) { }

	@MessagePattern(COUNTRYPATTERN.CREATE)
	create(@Payload() createCountryDto: CreateCountryDto) {
		return from(this.countryService.create(createCountryDto)).pipe(
			catchError((err) => {
				console.error("Error in countryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(COUNTRYPATTERN.FINDALL)
	findAll(@Payload() data: { limit: number, offset: number, deletedAt?: boolean, search?: string }) {
		return from(this.countryService.findAll(data.limit, data.offset, data.deletedAt, data.search)).pipe(
			catchError((err) => {
				console.error("Error in countryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(COUNTRYPATTERN.FINDONEBYID)
	findOne(@Payload() id: string) {
		return from(this.countryService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in countryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(COUNTRYPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateCountryDto: UpdateCountryDto) {
		return from(this.countryService.update(id, updateCountryDto)).pipe(
			catchError((err) => {
				console.error("Error in countryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(COUNTRYPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.countryService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in countryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(COUNTRYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.countryService.permanentDelete(id)).pipe(
			catchError((err) => {
				console.error("Error in ServiceSubCategoryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


}

@Controller() 
export class StateController {
	constructor(private readonly stateService: StateService) { }

	@MessagePattern(STATEPATTERN.CREATE)
	create(@Payload() createStateDto: CreateStateDto) {
		return from(this.stateService.create(createStateDto)).pipe(
			catchError((err) => {
				console.error("Error in state Service:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(STATEPATTERN.FINDALL)
	findAll(@Payload() data: { limit: number, offset: number, deletedAt?: boolean, search?: string }) {
		return from(this.stateService.findAll(data.limit, data.offset, data.deletedAt, data.search)).pipe(
			catchError((err) => {
				console.error("Error in stateService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(STATEPATTERN.FINDONEBYID)
	findOne(@Payload() id: string) {
		return from(this.stateService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in stateService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(STATEPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateStateDto: UpdateStateDto) {
		return from(this.stateService.update(id, updateStateDto)).pipe(
			catchError((err) => {
				console.error("Error in stateService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(STATEPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.stateService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in stateService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(STATEPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.stateService.permanentDelete(id)).pipe(
			catchError((err) => {
				console.error("Error in ServiceSubCategoryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


}

