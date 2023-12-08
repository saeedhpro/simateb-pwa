module.exports = {
	apps: [
		{
			name: 'SimatebPWA',
			port: '5001',
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs'
		}
	]
}
