module.exports = {
	apps: [
		{
			name: 'SimatebPWA',
			port: '5001',
			exec_mode: 'cluster',
			instances: 'max',
			script: './server/index.mjs'
		}
	]
}
