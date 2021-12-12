const otherDbOptions = require('./config/otherDbOptions').default;

module.exports = {
		env: process.env.NODE_ENV || 'development',
		interface: 'express',
		disableSwagger: false,
		http: {
			host: process.env.HTTP_HOST || 'localhost',
			port: process.env.HTTP_PORT || 7000,
			basePath: process.env.HTTP_BASE_PATH
		},
		db: {
			dialect: process.env.DB_DIALECT,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			otherDbOptions
		},
		useTypeorm: true,
		useAqsTypeorm: true,
		locale: process.env.LOCALE || 'en',
		paths: {
			customRouter: 'src/interface/express/customRouter',
			actionInputHandlers: 'src/interface/utils/handlers/actionInputHandlers',
			responseHandlers: 'src/interface/utils/handlers/responseHandlers',
			registerHandlers: 'src/interface/express/middlewares/registerHandlers',
			edgeResponseHandlers: 'src/interface/express/edgeResponseHandlers',
			actionFalseConditionHandlers: 'src/interface/express/falseConditionHandlers',
			errorHandlers: 'src/interface/express/middlewares/errorHandlers'
		}
};
