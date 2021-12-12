import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = {
	name: 'List users',
	method: 'get',
	path: '',
	active: true,
	order: 0,
	successCode: 200,
	schema: {
		input: [],
		customSpecification: {
			parameters: [
				{
					name: 'page',
					in: 'query',
					schema: {
						type: 'number',
						default: 1
					}
				},
				{
					name: 'limit',
					in: 'query',
					schema: {
						type: 'number',
						default: 10
					}
				},
				{
					name: 'order',
					in: 'query',
					schema: {
						type: 'string',
						default: 'DESC',
						enum: [
							'DESC',
							'ASC'
						]
					}
				},
				{
					name: 'orderBy',
					in: 'query',
					schema: {
						type: 'string',
						default: 'id'
					}
				},
				{
					name: 'select',
					in: 'query',
					schema: {
						type: 'array',
						items: {
							type: 'string'
						}
					}
				}
			]
		},
		output: {
			schema: [
				{
					table: 'user',
					fields: 'all'
				}
			],
			isArray: true
		}
	},
	actions: [
		{
			name: 'lastStep',
			handler: 'ListUseCase',
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'UserRepository',
							toKey: 'repository',
							options: {
								allowUnregistered: false
							}
						}
					]
				},
				{
					handler: 'requestHandler',
					args: [
						{
							fromKey: 'aqs',
							toKey: 'criteria'
						}
					]
				},
				{
					handler: 'fixedHandler',
					args: [
						{
							aqsTypeOrmConfig: {
								perPage: 10
							}
						}
					]
				}
			],
			async: false,
			keepResponse: true,
			startTransaction: false,
			endTransaction: false,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	register: [
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
	responseHandler: {
		handler: 'default',
		args: {
			plural: false,
			schema: [
				{
					fromKey: '0',
					toKey: 'data',
					step: 'lastStep',
					childes: {
						plural: true,
						schema: [
							{
								fields: [
									'id',
									'name'
								]
							}
						]
					}
				},
				{
					fromKey: '1',
					toKey: 'total',
					step: 'lastStep'
				}
			]
		}
	},
	edgeResponseHandler: {
		handler: 'list',
		args: {}
	},
	aqsOptions: {
		paramsConfigs: {},
		fixedParams: [],
		globalConfigs: {
			allowedParams: [
				'select',
				'limit',
				'orderBy',
				'order',
				'page'
			]
		}
	}
};

export default route;
