import { RouteResponseHandlersType } from 'confork-core/types/routeTypes/ResponseHandlerTypes';
import { RouteTypes } from '../routeCreator';

export const getResponseHandler = (type: RouteTypes) => {
	const responseHandler: RouteResponseHandlersType = type === 'list'
		? {
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
									fields: [ 'id' ]
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
		}
		: {
			handler: 'default',
			args: {
				plural: false,
				schema: [
					{
						step: 'lastStep',
						fields: [ 'id' ]
					}
				]
			}
		};

	return responseHandler;
};
