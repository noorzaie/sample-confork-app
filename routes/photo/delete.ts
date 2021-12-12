import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = {
	name: 'Delete a photo',
	method: 'delete',
	path: ':id',
	active: true,
	order: 0,
	successCode: 200,
	schema: {
		input: [],
		output: {
			schema: [
				{
					table: 'photo',
					fields: 'all'
				}
			]
		}
	},
	actions: [
		{
			name: 'lastStep',
			handler: 'DeleteUseCase',
			async: false,
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'PhotoRepository',
							toKey: 'repository',
							options: {
								allowUnregistered: false
							}
						}
					]
				},
				{
					handler: 'fixedHandler',
					args: [
						{
							soft: false
						}
					]
				}
			],
			endTransaction: false,
			startTransaction: false,
			keepResponse: true,
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
					repository: 'PhotoRepository',
					throwNotFound: true
				}
			]
		}
	],
	responseHandler: {
		handler: 'step',
		args: 'lastStep'
	},
	edgeResponseHandler: {
		handler: 'delete',
		args: {
			message: 'Deleted successfully!',
			translate: false
		}
	},
	aqsOptions: {}
};

export default route;
