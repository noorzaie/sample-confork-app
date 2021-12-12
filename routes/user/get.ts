import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = {
	name: 'Get a user',
	method: 'get',
	path: ':id',
	active: true,
	order: 0,
	successCode: 200,
	schema: {
		input: [],
		output: {
			schema: [
				{
					table: 'user',
					fields: 'all'
				}
			]
		}
	},
	actions: [
		{
			name: 'lastStep',
			handler: 'GetUseCase',
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
			handler: 'dbRegisterHandler',
			args: [
				{
					idSource: 'params',
					idName: 'id',
					toKey: 'entity',
					repository: 'UserRepository',
					throwNotFound: true
				}
			]
		},
		{
			handler: 'fixedRegisterHandler',
			args: [
				{
					key: 'relations',
					value: [ 'photos' ]
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
					step: 'lastStep',
					fields: [
						'id',
						'name',
						'photos'
					]
				}
			]
		}
	},
	edgeResponseHandler: {
		handler: 'get',
		args: {}
	},
	aqsOptions: {}
};

export default route;
