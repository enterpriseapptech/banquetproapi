/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  MANAGMENT_CLIENT,  } from '@shared/contracts';
import { CreateCountryDto, CreateStateDto } from '@shared/contracts/management/create-management.dto';
import { CountryDto, StateDto } from '@shared/contracts/management/management.dto';
import { COUNTRYPATTERN,STATEPATTERN } from '@shared/contracts/management/management.pattern';
import { UpdateCountryDto, UpdateStateDto } from '@shared/contracts/management/update-management.dto';



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

	permanentDelete(id: string, updaterId: string) {
		return this.countryClient.send<CountryDto, { id: string, updaterId: string }>(COUNTRYPATTERN.PERMANENTDELETE, { id, updaterId })

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
