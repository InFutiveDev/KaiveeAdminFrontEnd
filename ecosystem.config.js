module.exports = {
  apps : [
    {
      name      : 'ADMIN_FRONTEND',
      script    : 'npm',
      args      : 'run start',
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ]
};
