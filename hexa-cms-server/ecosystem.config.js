module.exports = {
  apps: [
    {
      name: 'hexa-cms-api',
      script: 'app.js',
      cwd: '/var/www/hexa-cms/hexa-cms-server',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGODB_URI: 'mongodb://127.0.0.1:27017/hexa_cms',
        SESSION_SECRET: 'replace-with-a-long-random-secret',
        ADMIN_TOKEN: 'replace-with-a-private-admin-token',
      },
    },
  ],
};
