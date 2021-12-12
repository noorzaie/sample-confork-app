import { ActionType } from 'confork-core/types/routeTypes/ActionTypes';
import BaseError from 'confork-core/utils/error/BaseError';
import { RouteTypes } from '../routeCreator';

const typeActions: { [ key in RouteTypes ]: [ ActionType ] } = {
	create: [
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
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
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
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	get: [
		{
			name: 'lastStep',
			handler: 'GetUseCase',
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
						}
					]
				}
			],
			async: false,
			keepResponse: true,
			startTransaction: false,
			endTransaction: false,
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	list: [
		{
			name: 'lastStep',
			handler: 'ListUseCase',
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
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
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	update: [
		{
			name: 'lastStep',
			handler: 'UpdateUseCase',
			async: false,
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
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
			endTransaction: false,
			startTransaction: false,
			keepResponse: true,
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	delete: [
		{
			name: 'lastStep',
			handler: 'DeleteUseCase',
			async: false,
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
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
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	deleteMany: [
		{
			name: 'lastStep',
			handler: 'DeleteManyUseCase',
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'MyAwesomeRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
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
				},
				{
					handler: 'requestHandler',
					args: [
						{
							fromKey: 'aqs',
							toKey: 'params'
						}
					]
				}
			],
			async: false,
			keepResponse: true,
			startTransaction: false,
			endTransaction: false,
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	addAssociation: [
		{
			name: 'lastStep',
			handler: 'AddAssociationUseCase',
			keepResponse: true,
			startTransaction: true,
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'SourceRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
						}
					]
				},
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'RelationRepository',
							toKey: 'relationRepository',
							options: { allowUnregistered: false }
						}
					]
				},
				{
					handler: 'requestHandler',
					args: [
						{
							fromKey: 'body',
							toKey: 'relationData'
						}
					]
				},
				{
					handler: 'fixedHandler',
					args: [
						{
							relationKey: 'change me!',
							keepOld: false
						}
					]
				}
			],
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	],
	removeAssociation: [
		{
			name: 'lastStep',
			handler: 'RemoveAssociationUseCase',
			keepResponse: true,
			inputs: [
				{
					handler: 'containerHandler',
					args: [
						{
							fromKey: 'SourceRepository',
							toKey: 'repository',
							options: { allowUnregistered: false }
						}
					]
				},
				{
					handler: 'fixedHandler',
					args: [
						{
							relationKey: 'change me!'
						}
					]
				},
				{
					handler: 'requestHandler',
					args: [
						{
							fromKey: 'body',
							toKey: 'relationId'
						}
					]
				}
			],
			conditions: undefined,
			falseConditionHandler: {
				handler: 'throwHandler',
				args: new BaseError(400)
			}
		}
	]
};

export const getActions = (type: RouteTypes, table: string, relatedTable: string) => {
	const actions = typeActions[type];

	if (table) {
    actions[0].inputs![0].args[0].fromKey = `${table.toUpperCase()}Repository`;
	}

	if (type === 'addAssociation' && relatedTable) {
    actions[0].inputs![1].args[0].fromKey = `${relatedTable.toUpperCase()}Repository`;
	} else if (type === 'removeAssociation' && relatedTable) {
    // @ts-ignore
    actions[0].inputs![1].args[0].relationKey = relatedTable;
	}
	// @ts-ignore
	actions[0].falseConditionHandler?.args = 'new BaseError(400)';

	return actions;
};
