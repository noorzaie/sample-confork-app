import { RouteType } from 'confork-core';
import create from './user/create';
import list from './user/list';
import get from './user/get';
import addPhoto from './user/addPhoto';
import del from './photo/delete';

const routes: RouteType[] = [
	{
		prefix: '/users',
		routes: [
			create,
			list,
			get,
			addPhoto
		]
	},
	{
		prefix: '/photo',
		routes: [
			del
		]
	}
];

export default routes;
