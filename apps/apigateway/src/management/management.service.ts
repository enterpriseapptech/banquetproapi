/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  CACHE_KEYS, MANAGMENT_CLIENT } from '@shared/contracts';
import { CreateAppSettingDto, CreateCountryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { AppSettingDto, CountryDto, StateDto } from '@shared/contracts/management/management.dto';
import { APPSETTINGPATTERN, COUNTRYPATTERN,STATEPATTERN } from '@shared/contracts/management/management.pattern';
import { UpdateCountryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';
import { Cache } from 'cache-manager';
import { Cacheable, CacheEvict } from '../common/cache/cache.decorators';

@Injectable()
export class AppSettingService {
	constructor(
		@Inject(MANAGMENT_CLIENT) private readonly appSettingClient: ClientProxy,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) { }

	@CacheEvict(
		`${CACHE_KEYS.APP_SETTING}:*`
	)
	async create(createCountryDto: CreateAppSettingDto) {
		await this.cacheManager.del(CACHE_KEYS.INVOICES_ALL)
		return this.appSettingClient.send(APPSETTINGPATTERN.CREATEORUPDATE, createCountryDto)
	}


	@Cacheable((...args) => `${CACHE_KEYS.APP_SETTING}:${args.join(':')}`)
	find() {
		return this.appSettingClient.send<AppSettingDto >(APPSETTINGPATTERN.FIND, {})
	
	}

}


@Injectable()
export class CountryService {
	constructor(
		@Inject(MANAGMENT_CLIENT) private readonly countryClient: ClientProxy
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

	permanentDelete(id: string) {
		return this.countryClient.send<CountryDto, string>(COUNTRYPATTERN.PERMANENTDELETE, id)

	}


}

@Injectable()
export class StateService {
	constructor(
		@Inject(MANAGMENT_CLIENT) private readonly stateClient: ClientProxy
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

	findMany(ids: string[]) {
		return this.stateClient.send<StateDto[], string[]>(STATEPATTERN.FINDMANY, ids)
	}


	findOne(id: string) {
		return this.stateClient.send<StateDto, string>(STATEPATTERN.FINDONEBYID, id)
	}

	update(id: string, updateStateDto: UpdateStateDto) {
		return this.stateClient.send<StateDto, { id: string, updateStateDto: UpdateStateDto }>(STATEPATTERN.UPDATE, { id, updateStateDto })
	}

	remove(id: string, updaterId: string) {
		return this.stateClient.send<StateDto, { id: string, updaterId: string }>(STATEPATTERN.DELETE, { id, updaterId })

	}

	permanentDelete(id: string) {
		return this.stateClient.send<StateDto, string>(STATEPATTERN.PERMANENTDELETE,  id)

	}


}
