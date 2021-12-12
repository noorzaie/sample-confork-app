// eslint-disable-next-line import/no-extraneous-dependencies
import { prompt, QuestionCollection } from 'inquirer';
import type { MethodType, SingleRouteType } from 'confork-core';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getSchema } from './routeTemplates/schema';
import { getActions } from './routeTemplates/actions';
import { getRegisters } from './routeTemplates/register';
import { getResponseHandler } from './routeTemplates/responseHandler';
import { getEdgeResponseHandler } from './routeTemplates/edgeResponseHandler';
import { getAqsOptions } from './routeTemplates/aqsOptions';

const booleanChoices = [
	{
		name: 'Yes',
		value: true
	},
	{
		name: 'No',
		value: false
	}
];

export type RouteTypes = 'create' | 'get' | 'list' | 'update' | 'delete' | 'deleteMany' | 'addAssociation' | 'removeAssociation';

const typeMethods: { [key in RouteTypes]: MethodType } = {
	create: 'post',
	get: 'get',
	list: 'get',
	update: 'patch',
	delete: 'delete',
	deleteMany: 'delete',
	addAssociation: 'post',
	removeAssociation: 'delete'
};

const questions: QuestionCollection = [
	{
		type: 'input',
		message: 'Endpoint name',
		name: 'name'
	},
	{
		type: 'list',
		message: 'Endpoint type',
		name: 'type',
		choices: [
			{
				name: 'Create resource',
				value: 'create'
			},
			{
				name: 'Get single resource',
				value: 'get'
			},
			{
				name: 'Get list of resources',
				value: 'list'
			},
			{
				name: 'Update resource',
				value: 'update'
			},
			{
				name: 'Delete resource',
				value: 'delete'
			},
			{
				name: 'Delete multiple resources',
				value: 'deleteMany'
			},
			{
				name: 'Add relation to a resource',
				value: 'addAssociation'
			},
			{
				name: 'Remove relation from a resource',
				value: 'removeAssociation'
			}
		]
	},
	{
		type: 'input',
		message: 'Database table name for CRUD operation (if any)',
		name: 'table'
	},
	{
		type: 'input',
		message: 'Name of related table',
		name: 'relatedTable',
		when: answers => [ 'addAssociation', 'removeAssociation' ].includes(answers.type) && !!answers.table
	},
	{
		type: 'list',
		message: 'Enable swagger for this endpoint',
		name: 'addSwagger',
		choices: booleanChoices
	},
	{
		type: 'input',
		message: 'Endpoint URI',
		name: 'path'
	},
	{
		type: 'list',
		message: 'Enable body validation',
		name: 'validateBody',
		choices: booleanChoices,
		when: answers => [ 'create', 'update', 'deleteMany', 'addAssociation', 'removeAssociation' ].includes(answers.type)
	},
	{
		type: 'input',
		message: 'Route directory',
		name: 'directory',
		default: 'routes'
	}
];

const writeRoute = (route: SingleRouteType, type: RouteTypes, path: string) => {
	const routePath = join(__dirname, '..', path, `${type}.ts`);

	if (existsSync(routePath)) {
		console.error(`Another file with name ${type}.ts already exists in ${path} directory!`);
	} else {
		const routeString = `import { SingleRouteType } from 'confork-core';
import BaseError from 'confork-core/utils/error/BaseError';

const route: SingleRouteType = ${JSON.stringify(route, null, '\t')};

export default route;
`;

		writeFileSync(
			routePath,
			routeString
				.replace('"new BaseError(400)"', 'new BaseError(400)')
				.replace(/"([^"]+)":/g, '$1:')
				.replace(/"/g, "'")
		);

		console.log(`Route ${routePath} created successfully!\nYou can enable it by adding it to routes/index.ts`);
	}
};

const run = () => {
	prompt(questions)
		.then(options => {
			const template: SingleRouteType = {} as any;
			template.name = options.name;
			template.method = typeMethods[options.type as RouteTypes];
			template.path = options.path;
			template.active = true;
			template.order = 0;

			if (options.type === 'create') {
				template.successCode = 201;
			} else {
				template.successCode = 200;
			}

			if (options.validateBody) {
				template.validateBody = true;
				template.validationOption = undefined;
			}

			if (options.table) {
				template.schema = getSchema(options.type, options.table);
			} else {
				template.schema = {};
			}

			template.actions = getActions(options.type, options.table, options.relatedTable);
			template.register = getRegisters(options.type, options.table);
			template.responseHandler = getResponseHandler(options.type);
			template.edgeResponseHandler = getEdgeResponseHandler(options.type);
			template.aqsOptions = getAqsOptions(options.type);

			writeRoute(template, options.type, options.directory.startsWith('routes') ? options.directory : join('routes', options.directory));
		})
		.catch(error => {
			console.log(error);
		});
};

run();
