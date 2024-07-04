module.exports = {
    apps: [{
        name: "unishopr-api",
        script: "./bin/www.js",
        env: {
            NODE_ENVIRONMENT: "production",
            HOST_NAME: "localhost"
        }
    }]
}
