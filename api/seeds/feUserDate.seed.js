const fs = require('fs');
const path = require('path');
const {UserModel} = require("../models/feUser.model");

setTimeout(async () => {
    let rawData = fs.readFileSync(path.resolve(__dirname, 'users.json'));
    let users = JSON.parse(rawData);

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.createdAt && user.updatedAt) {
            await UserModel.updateOne({email: user.email}, {createdAt: user.createdAt, updatedAt: user.updatedAt})
            console.log("user updated", i)
        }
    }
}, 1100);
