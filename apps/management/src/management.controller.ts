import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { ServiceCategoryService, ServiceService, FeesService, ServiceSubCategoryService, FeaturedPlanService, CountryService, StateService, CityService } from './management.service';
import { CreateCityDto, CreateCountryDto, CreateFeaturedPlanDto, CreateFeeDto, CreateServiceCategoryDto, CreateServiceDto, CreateServiceSubCategoryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { APPSETTINGPATTERN, CITYPATTERN, COUNTRYPATTERN, FEATUREDPLANSPATTERN, FEESPATTERN, SERVICECATEGORYPATTERN, SERVICEPATTERN, SERVICESUBCATEGORYPATTERN, STATEPATTERN } from '@shared/contracts/management/management.pattern';
import { UpdateCityDto, UpdateCountryDto, UpdateFeaturedPlanDto, UpdateFeeDto, UpdateServiceCategoryDto, UpdateServiceDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';



@Controller()
export class AppSettingController {
	constructor(private readonly serviceCategoryService: ServiceCategoryService) { }

	@MessagePattern(APPSETTINGPATTERN.CREATE)
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

	@MessagePattern(APPSETTINGPATTERN.FIND)
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



	@MessagePattern(APPSETTINGPATTERN.UPDATE)
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



}


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

@Controller()
export class ServiceSubCategoryController {
	constructor(private readonly serviceSubCategoryService: ServiceSubCategoryService) { }

	@MessagePattern(SERVICESUBCATEGORYPATTERN.CREATE)
	create(@Payload() createServiceSubCategoryDto: CreateServiceSubCategoryDto) {
		return from(this.serviceSubCategoryService.create(createServiceSubCategoryDto)).pipe(
			catchError((err) => {
				console.error("Error in ServiceSubCategoryService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(SERVICESUBCATEGORYPATTERN.FINDALL)
	findAll(@Payload() limit: number, @Payload() offset: number, deletedAt?: boolean) {
		return from(this.serviceSubCategoryService.findAll(limit, offset, deletedAt)).pipe(
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

	@MessagePattern(SERVICESUBCATEGORYPATTERN.FINDONEBYID)
	findOne(@Payload() id: string) {
		return from(this.serviceSubCategoryService.findOne(id)).pipe(
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



	@MessagePattern(SERVICESUBCATEGORYPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateServiceCategoryDto: UpdateServiceCategoryDto) {
		return from(this.serviceSubCategoryService.update(id, updateServiceCategoryDto)).pipe(
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

	@MessagePattern(SERVICESUBCATEGORYPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.serviceSubCategoryService.remove(id, updaterId)).pipe(
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


	@MessagePattern(SERVICESUBCATEGORYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.serviceSubCategoryService.permanentDelete(id)).pipe(
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
export class ServiceController {
	constructor(private readonly serviceService: ServiceService) { }

	@MessagePattern(SERVICEPATTERN.CREATE)
	create(@Payload() createServiceDto: CreateServiceDto) {
		return from(this.serviceService.create(createServiceDto)).pipe(
			catchError((err) => {
				console.error("Error in ServiceService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(SERVICEPATTERN.FINDALL)
	findAll(@Payload() data: {
		limit: number,
		offset: number,
		deletedAt?: boolean,
		search?: string,
		filterByServiceCategory?: string,
		filterByServiceSubCategory?: string,
		filterByTags?: string[]}) {
		const { 
			limit, 
			offset, 
			deletedAt, 
			search, 
			filterByServiceCategory, 
			filterByServiceSubCategory, 
			filterByTags } = data;
		return from(this.serviceService.findAll(limit, offset, deletedAt,search, filterByServiceCategory, filterByServiceSubCategory, 
			filterByTags )).pipe(
			catchError((err) => {
				console.error("Error in ServiceService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(SERVICEPATTERN.FINDONEBYID)
	findOne(@Payload() id: string) {
		return from(this.serviceService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in ServiceService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(SERVICEPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateServiceDto: UpdateServiceDto) {
		return from(this.serviceService.update(id, updateServiceDto)).pipe(
			catchError((err) => {
				console.error("Error in ServiceService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(SERVICEPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.serviceService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in ServiceService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(SERVICESUBCATEGORYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.serviceService.permanentDelete(id)).pipe(
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
export class FeesController {
	constructor(private readonly feesService: FeesService) { }

	@MessagePattern(FEESPATTERN.CREATE)
	create(@Payload() createFeeDto: CreateFeeDto) {
		return from(this.feesService.create(createFeeDto)).pipe(
			catchError((err) => {
				console.error("Error in feesService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(FEESPATTERN.FINDALL)
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return from(this.feesService.findAll(limit, offset)).pipe(
			catchError((err) => {
				console.error("Error in feesService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(FEESPATTERN.FINDBYID)
	findOne(@Payload() id: string) {
		return from(this.feesService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in feesService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(FEESPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateFeesDto: UpdateFeeDto) {
		return from(this.feesService.update(id, updateFeesDto)).pipe(
			catchError((err) => {
				console.error("Error in feesService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(FEESPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.feesService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in feesService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(SERVICESUBCATEGORYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.feesService.permanentDelete(id)).pipe(
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
export class FeaturedPlanController {
	constructor(private readonly featuredPlanService: FeaturedPlanService) { }

	@MessagePattern(FEATUREDPLANSPATTERN.CREATE)
	create(@Payload() createFeaturedPlanDto: CreateFeaturedPlanDto) {
		return from(this.featuredPlanService.create(createFeaturedPlanDto)).pipe(
			catchError((err) => {
				console.error("Error in featuredPlanService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(FEATUREDPLANSPATTERN.FINDALL)
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return from(this.featuredPlanService.findAll(limit, offset)).pipe(
			catchError((err) => {
				console.error("Error in featuredPlanService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(FEATUREDPLANSPATTERN.FINDBYID)
	findOne(@Payload() id: string) {
		return from(this.featuredPlanService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in featuredPlanService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(FEATUREDPLANSPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateFeaturedPlanDto: UpdateFeaturedPlanDto) {
		return from(this.featuredPlanService.update(id, updateFeaturedPlanDto)).pipe(
			catchError((err) => {
				console.error("Error in featuredPlanService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(FEATUREDPLANSPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.featuredPlanService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in featuredPlanService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(SERVICESUBCATEGORYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.featuredPlanService.permanentDelete(id)).pipe(
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
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return from(this.countryService.findAll(limit, offset)).pipe(
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
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return from(this.stateService.findAll(limit, offset)).pipe(
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


@Controller() 
export class CityController {
	constructor(private readonly cityService: CityService) { }

	@MessagePattern(CITYPATTERN.CREATE)
	create(@Payload() createCityDto: CreateCityDto) {
		return from(this.cityService.create(createCityDto)).pipe(
			catchError((err) => {
				console.error("Error in city Service:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		)
	}

	@MessagePattern(CITYPATTERN.FINDALL)
	findAll(@Payload() limit: number, @Payload() offset: number) {
		return from(this.cityService.findAll(limit, offset)).pipe(
			catchError((err) => {
				console.error("Error in city Service:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(CITYPATTERN.FINDONEBYID)
	findOne(@Payload() id: string) {
		return from(this.cityService.findOne(id)).pipe(
			catchError((err) => {
				console.error("Error in cityService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}



	@MessagePattern(CITYPATTERN.UPDATE)
	update(@Payload() id: string, @Payload() updateCityDto: UpdateCityDto) {
		return from(this.cityService.update(id, updateCityDto)).pipe(
			catchError((err) => {
				console.error("Error in cityService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}

	@MessagePattern(CITYPATTERN.DELETE)
	remove(@Payload() id: string, @Payload() updaterId: string) {
		return from(this.cityService.remove(id, updaterId)).pipe(
			catchError((err) => {
				console.error("Error in cityService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


	@MessagePattern(CITYPATTERN.PERMANENTDELETE)
	permanentDelete(@Payload() id: string) {
		return from(this.cityService.permanentDelete(id)).pipe(
			catchError((err) => {
				console.error("Error in cityService:", err);
				return throwError(() => new RpcException({
					statusCode: err.response.statusCode || 500,
					message: err.message || "Internal Server Error",
					error: err.response.error || "Sever error",
				}));

			})
		);
	}


}