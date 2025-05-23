module.exports = {
  apps: [
    {
      name: 'gestion-inventarios',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/home/bitnami/app',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
        KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
        KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
        KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
        KINDE_SITE_URL: process.env.KINDE_SITE_URL,
        KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
        KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL
      }
    }
  ]
}