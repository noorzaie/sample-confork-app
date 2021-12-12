import { RegisterHandlersType } from 'confork-core/types/routeTypes/RegisterHandlerTypes';
import { RouteTypes } from '../routeCreator';

const typeRegisters: { [key in RouteTypes ]: RegisterHandlersType} = {
	create: [],
	get: [
		{
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'MyAwesomeRepository',
					throwNotFound: true
				}
			]
		}
	],
	list: [
		{
			handler: 'requestRegisterHandler',
			args: [
				{
					fromKey: 'query.page',
					toKey: 'page',
					default: 1,
					parser: 'integer'
				},
				{
					fromKey: 'query.limit',
					toKey: 'perPage',
					default: 10,
					parser: 'integer'
				},
				{
					fromKey: 'query.order',
					toKey: 'order',
					default: 'DESC'
				},
				{
					fromKey: 'query.orderBy',
					toKey: 'orderBy',
					default: 'id'
				}
			]
		}
	],
	update: [
		{
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'MyAwesomeRepository',
					throwNotFound: true
				}
			]
		}
	],
	delete: [
		{
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'MyAwesomeRepository',
					throwNotFound: true
				}
			]
		}
	],
	deleteMany: [],
	addAssociation: [
		{
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'MyAwesomeRepository',
					throwNotFound: true
				}
			]
		}
	],
	removeAssociation: [
		{
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'MyAwesomeRepository',
					throwNotFound: true
				}
			]
		}
	]
};

export const getRegisters = (type: RouteTypes, table: string) => {
	const registers = typeRegisters[type];

	if ([ 'get', 'update', 'delete', 'addAssociation', 'removeAssociation' ].includes(type) && table) {
		// @ts-ignore
		registers[0].args[0].repository = `${table.toUpperCase()}Repository`;
	}

	return registers;
};
