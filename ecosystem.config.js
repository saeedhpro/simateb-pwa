module.exports = {
  apps: [
    {
      name: 'SimatebPWA',
      exec_name: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}



