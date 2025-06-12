/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CITY_CLIENT, COUNTRY_CLIENT, FEATUREDPLAN_CLIENT, FEES_CLIENT, SERVICE_CATEGORY_CLIENT, SERVICE_CLIENT, SERVICE_SUB_CATEGORY_CLIENT, STATE_CLIENT } from '@shared/contracts';
import { CreateCityDto, CreateCountryDto, CreateFeaturedPlanDto, CreateFeeDto, CreateServiceCategoryDto, CreateServiceDto, CreateServiceSubCategoryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { CityDto, CountryDto, FeaturedPlanDto, ServiceCategoryDto, ServiceDto, StateDto } from '@shared/contracts/management/management.dto';
import { CITYPATTERN, COUNTRYPATTERN, FEATUREDPLANSPATTERN, FEESPATTERN, SERVICECATEGORYPATTERN, SERVICEPATTERN, SERVICESUBCATEGORYPATTERN, STATEPATTERN } from '@shared/contracts/management/management.pattern';
import { UpdateCityDto, UpdateCountryDto, UpdateFeaturedPlanDto, UpdateFeeDto, UpdateServiceCategoryDto, UpdateServiceDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';
import { catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class ServiceService {
	constructor(
		@Inject(SERVICE_CLIENT) private readonly serviceClient: ClientProxy
	) { }

	create(createServiceDto: CreateServiceDto) {
		return this.serviceClient.send(SERVICEPATTERN.CREATE, createServiceDto)
	}

	findAll(limit: number, 
		offset: number, 
		deletedAt?: boolean,
		search?: string, 
		filterByServiceCategory? : string, 
		filterByServiceSubCategory? : string, 
		filterByTags? : string[]
	) {

		// try {
		// 	// Attempting to send the request to the microservice with timeout and error handling
		// 	const response$ = this.serviceClient
		// 	  .send<ServiceDto[], { 
		// 		limit: number, 
		// 		offset: number, 
		// 		deletedAt?:	 boolean, 
		// 		search?: string, 
		// 		filterByServiceCategory? : string, 
		// 		filterByServiceSubCategory? : string, 
		// 		filterByTags? : string[]
	
		// 	}>(SERVICEPATTERN.FINDALL, {limit, offset, deletedAt, search, filterByServiceCategory, filterByServiceSubCategory, filterByTags })
		// 	  .pipe(
		// 		timeout(5000), // 5 seconds timeout
		// 		catchError(err => {
		// 		  // Log the error and provide a user-friendly error message
		// 		  console.error('Error while calling the microservice:', err);
		// 		  return throwError(() =>
		// 			new Error('Microservice is unavailable. Please try again later.')
		// 		  );
		// 		})
		// 	  );
	  
		// 	// Subscribe to response to trigger the flow
		// 	return  response$;
	  
		//   } catch (err) {
		// 	// Log the error and provide a more general error message for the user
		// 	console.error('Error while handling the request:', err);
		// 	throw new Error(`Failed to process the request: ${err.message}`);
		//   }


		return this.serviceClient.send<ServiceDto[], { 
			limit: number, 
			offset: number, 
			deletedAt?:	 boolean, 
			search?: string, 
			filterByServiceCategory? : string, 
			filterByServiceSubCategory? : string, 
			filterByTags? : string[]

		}>(SERVICEPATTERN.FINDALL, {limit, offset, deletedAt, search, filterByServiceCategory, filterByServiceSubCategory, filterByTags })
	
	}

	findOne(id: string) {
		return this.serviceClient.send<ServiceDto, string>(SERVICEPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateServiceDto: UpdateServiceDto) {
		return this.serviceClient.send<ServiceDto, { id: string, updateServiceDto: UpdateServiceDto }>(SERVICEPATTERN.UPDATE, { id, updateServiceDto })
	}

	remove(id: string, updaterId: string) {
		return this.serviceClient.send<ServiceDto, { id: string, updaterId: string }>(SERVICEPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.serviceClient.send<ServiceDto, { id: string, updaterId: string }>(SERVICEPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class ServiceCategoryService {
	constructor(
		@Inject(SERVICE_CATEGORY_CLIENT) private readonly serviceCategoryClient: ClientProxy
	) { }

	create(createServiceCategoryDto: CreateServiceCategoryDto) {
		return this.serviceCategoryClient.send(SERVICECATEGORYPATTERN.CREATE, createServiceCategoryDto)
	}

	findAll(limit: number, offset: number, deletedAt?: boolean) {
		return this.serviceCategoryClient.send<ServiceCategoryDto[], { limit: number, offset: number, deletedAt }>(SERVICECATEGORYPATTERN.FINDALL, { limit, offset, deletedAt })
	}

	findOne(id: string) {
		return this.serviceCategoryClient.send<ServiceCategoryDto, string>(SERVICECATEGORYPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
		return this.serviceCategoryClient.send<ServiceCategoryDto, { id: string, updateServiceCategoryDto: UpdateServiceCategoryDto }>(SERVICECATEGORYPATTERN.UPDATE, { id, updateServiceCategoryDto })
	}

	remove(id: string, updaterId: string) {
		return this.serviceCategoryClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(SERVICECATEGORYPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.serviceCategoryClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(SERVICECATEGORYPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class ServiceSubCategoryService {
	constructor(
		@Inject(SERVICE_SUB_CATEGORY_CLIENT) private readonly serviceSubCategoryClient: ClientProxy
	) { }

	create(createServiceSubCategoryDto: CreateServiceSubCategoryDto) {
		// try {
		// 	const response$ = this.serviceSubCategoryClient.send(SERVICESUBCATEGORYPATTERN.CREATE, createServiceSubCategoryDto)
		// 	  .pipe(
		// 		timeout(5000), // Set timeout here (e.g. 5s)
		// 		catchError(err => {
				  
		// 		  return throwError(() => new Error('Microservice isnt running, this action will execute when its back online'));
		// 		})
		// 	  );
		
		// 	return response$;
		//   } catch (err) {
		// 	throw new Error(`Failed to fetch data: ${err.message}`);
		//   }
		return this.serviceSubCategoryClient.send(SERVICESUBCATEGORYPATTERN.CREATE, createServiceSubCategoryDto)
	}

	findAll(limit: number, offset: number, deletedAt?: boolean) {
		return this.serviceSubCategoryClient.send<ServiceCategoryDto[], { limit: number, offset: number, deletedAt }>(SERVICESUBCATEGORYPATTERN.FINDALL, { limit, offset, deletedAt })
	}

	findOne(id: string) {
		return this.serviceSubCategoryClient.send<ServiceCategoryDto, string>(SERVICESUBCATEGORYPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto) {
		return this.serviceSubCategoryClient.send<ServiceCategoryDto, { id: string, updateServiceCategoryDto: UpdateServiceCategoryDto }>(SERVICESUBCATEGORYPATTERN.UPDATE, { id, updateServiceCategoryDto })
	}

	remove(id: string, updaterId: string) {
		return this.serviceSubCategoryClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(SERVICESUBCATEGORYPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.serviceSubCategoryClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(SERVICESUBCATEGORYPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class FeesService {
	constructor(
		@Inject(FEES_CLIENT) private readonly feesClient: ClientProxy
	) { }

	create(createFeeDto: CreateFeeDto) {
		return this.feesClient.send(FEESPATTERN.CREATE, createFeeDto)
	}

	findAll(limit: number, offset: number, deletedAt?: boolean) {
		return this.feesClient.send<ServiceCategoryDto[], { limit: number, offset: number, deletedAt }>(FEESPATTERN.FINDALL, { limit, offset, deletedAt })
	}

	findOne(id: string) {
		return this.feesClient.send<ServiceCategoryDto, string>(FEESPATTERN.FINDBYID, id)
	}

	update(id: string, updateFeeDto: UpdateFeeDto) {
		return this.feesClient.send<ServiceCategoryDto, { id: string, updateFeeDto: UpdateFeeDto }>(FEESPATTERN.UPDATE, { id, updateFeeDto })
	}

	remove(id: string, updaterId: string) {
		return this.feesClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(FEESPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.feesClient.send<ServiceCategoryDto, { id: string, updaterId: string }>(FEESPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class FeaturedPlanService {
	constructor(
		@Inject(FEATUREDPLAN_CLIENT) private readonly featuredPlan: ClientProxy
	) { }

	create(createFeaturedPlanDto: CreateFeaturedPlanDto) {
		return this.featuredPlan.send(FEATUREDPLANSPATTERN.CREATE, createFeaturedPlanDto)
	}

	findAll(limit: number, offset: number, deletedAt?: boolean) {
		return this.featuredPlan.send<FeaturedPlanDto[], { limit: number, offset: number, deletedAt }>(FEATUREDPLANSPATTERN.FINDALL, { limit, offset, deletedAt })
	}

	findOne(id: string) {
		return this.featuredPlan.send<FeaturedPlanDto, string>(FEATUREDPLANSPATTERN.FINDBYID, id)
	}

	update(id: string, updateFeaturedPlanDto: UpdateFeaturedPlanDto) {
		return this.featuredPlan.send<FeaturedPlanDto, { id: string, updateFeaturedPlanDto: UpdateFeaturedPlanDto }>(FEATUREDPLANSPATTERN.UPDATE, { id, updateFeaturedPlanDto })
	}

	remove(id: string, updaterId: string) {
		return this.featuredPlan.send<FeaturedPlanDto, { id: string, updaterId: string }>(FEATUREDPLANSPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.featuredPlan.send<FeaturedPlanDto, { id: string, updaterId: string }>(FEATUREDPLANSPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class CountryService {
	constructor(
		@Inject(COUNTRY_CLIENT) private readonly countryClient: ClientProxy
	) { }

	create(createCountryDto: CreateCountryDto) {
		return this.countryClient.send(COUNTRYPATTERN.CREATE, createCountryDto)
	}

	findAll(limit: number, 
		offset: number, 
		deletedAt?: boolean,
		search?: string, 
	) {

		return this.countryClient.send<CountryDto[], { 
			limit: number, 
			offset: number, 
			deletedAt?:	 boolean, 
			search?: string, 
		}>(COUNTRYPATTERN.FINDALL, {limit, offset, deletedAt, search })
	
	}

	findOne(id: string) {
		return this.countryClient.send<CountryDto, string>(COUNTRYPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateCountryDto: UpdateCountryDto) {
		return this.countryClient.send<CountryDto, { id: string, updateCountryDto: UpdateCountryDto }>(COUNTRYPATTERN.UPDATE, { id, updateCountryDto })
	}

	remove(id: string, updaterId: string) {
		return this.countryClient.send<CountryDto, { id: string, updaterId: string }>(COUNTRYPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.countryClient.send<CountryDto, { id: string, updaterId: string }>(COUNTRYPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}

@Injectable()
export class StateService {
	constructor(
		@Inject(STATE_CLIENT) private readonly stateClient: ClientProxy
	) { }

	create(createstateDto: CreateStateDto) {
		return this.stateClient.send(STATEPATTERN.CREATE, createstateDto)
	}

	findAll(limit: number, 
		offset: number, 
		deletedAt?: boolean,
		search?: string, 
	) {

		return this.stateClient.send<StateDto[], { 
			limit: number, 
			offset: number, 
			deletedAt?:	 boolean, 
			search?: string, 
		}>(STATEPATTERN.FINDALL, {limit, offset, deletedAt, search })
	
	}

	findOne(id: string) {
		return this.stateClient.send<StateDto, string>(STATEPATTERN.FINDONEBYID, id)
	}

	update(id: string, updatestateDto: UpdateStateDto) {
		return this.stateClient.send<StateDto, { id: string, updatestateDto: UpdateStateDto }>(STATEPATTERN.UPDATE, { id, updatestateDto })
	}

	remove(id: string, updaterId: string) {
		return this.stateClient.send<StateDto, { id: string, updaterId: string }>(STATEPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.stateClient.send<StateDto, { id: string, updaterId: string }>(STATEPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}


@Injectable()
export class CityService {
	constructor(
		@Inject(CITY_CLIENT) private readonly cityClient: ClientProxy
	) { }

	create(createCityDto: CreateCityDto) {
		return this.cityClient.send(CITYPATTERN.CREATE, createCityDto)
	}

	findAll(limit: number, 
		offset: number, 
		deletedAt?: boolean,
		search?: string, 
	) {

		return this.cityClient.send<CityDto[], { 
			limit: number, 
			offset: number, 
			deletedAt?:	 boolean, 
			search?: string, 
		}>(CITYPATTERN.FINDALL, {limit, offset, deletedAt, search })
	
	}

	findOne(id: string) {
		return this.cityClient.send<CityDto, string>(CITYPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateCityDto: UpdateCityDto) {
		return this.cityClient.send<CityDto, { id: string, updateCityDto: UpdateCityDto }>(CITYPATTERN.UPDATE, { id, updateCityDto })
	}

	remove(id: string, updaterId: string) {
		return this.cityClient.send<CityDto, { id: string, updaterId: string }>(CITYPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string, updaterId: string) {
		return this.cityClient.send<CityDto, { id: string, updaterId: string }>(CITYPATTERN.PERMANENTDELETE, { id, updaterId })

	}


}