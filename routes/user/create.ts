import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = {
	name: 'Create new user',
	method: 'post',
	path: '',
	active: true,
	order: 0,
	successCode: 201,
	validateBody: true,
	schema: {
		input: [
			{
				table: 'user',
				fields: 'all',
				exclude: [
					'id'
				]
			}
		],
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
			handler: 'CreateUseCase',
			async: false,
			endTransaction: false,
			startTransaction: false,
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
							fromKey: 'body',
							toKey: 'data',
							default: {}
						}
					]
				}
			],
			keepResponse: true,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	register: [],
	responseHandler: {
		handler: 'default',
		args: {
			plural: false,
			schema: [
				{
					step: 'lastStep',
					fields: [
						'id'
					]
				}
			]
		}
	},
	edgeResponseHandler: {
		handler: 'post',
		args: {
			message: 'Created successfully!',
			translate: false
		}
	},
	aqsOptions: {}
};

export default route;
