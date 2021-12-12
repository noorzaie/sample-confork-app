import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = {
	name: 'Add photo to user',
	method: 'post',
	path: '/:id/photos',
	active: true,
	order: 0,
	successCode: 200,
	validateBody: true,
	schema: {
		input: [
			{
				schema: {
					data: {
						anyOf: [
							{
								type: 'array',
								items: {
									type: 'number'
								}
							},
							{
								type: 'number'
							},
							{
								type: 'object',
								properties: {
									name: {
										type: 'string'
									},
									description: {
										type: 'string'
									},
									filename: {
										type: 'string'
									}
								}
							},
							{
								type: 'array',
								items: {
									type: 'object'
								}
							}
						]
					}
				}
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
			handler: 'AddAssociationUseCase',
			keepResponse: true,
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
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'PhotoRepository',
							toKey: 'relationRepository',
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
							fromKey: 'body.data',
							toKey: 'relationData'
						}
					]
				},
				{
					handler: 'fixedHandler',
					args: [
						{
							relationKey: 'photos',
							keepOld: false
						}
					]
				}
			],
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
		handler: 'update',
		args: {
			message: 'Updated successfully!',
			translate: false
		}
	},
	aqsOptions: {}
};

export default route;
