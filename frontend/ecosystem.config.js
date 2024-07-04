module.exports = {
  apps: [
    {
      name: "frontend",
      script: "yarn start",
      autorestart: true,
      env: {
        NODE_ENVIRONMENT: "production",
        HOST_NAME: "localhost",
      },
    },
  ],
};
