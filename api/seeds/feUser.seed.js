const validationError = require("../utils/validationError");
const { UserModel } = require("../models/feUser.model");
const mongoose = require("mongoose");

setTimeout(async () => {
    const users = [];

    let duplicateEmail = 0;
    let duplicatePhone = 0;
    let validationCount = 0;
    let noEmailOrPhone = 0;

    for (let i = 0; i < users.length; i++) {
        const eachUser = users[i];

        if (eachUser.email) {
            const firstName = eachUser.name ? eachUser.name.substring(0, eachUser.name.lastIndexOf(" ")) : null;
            const lastName = eachUser.name ? eachUser.name.split(' ').pop() : null;
            const phone = eachUser.phoneNo ? eachUser.phoneNo.slice(-10) : null
            const userContent = {
                firstName: firstName || " ",
                lastName: lastName || " ",
                email: eachUser.email,
                phone: {
                    phone: phone,
                    country: {
                        _id: "63666de1038c9d60bfa043b5",
                        name: "Bangladesh",
                        code: "+880",
                    }
                },
            }

            const uniqueValidation = await validationError.uniqueCheck(await UserModel.isUnique(userContent.email, userContent.phone));
            if (Object.keys(uniqueValidation).length) {
                if (uniqueValidation.phone) {
                    console.log("This phone already taken by another user.")
                    duplicatePhone += 1;
                    console.log("Duplicate Phone: ", duplicatePhone)
                    continue;
                } else if (uniqueValidation.email) {
                    duplicateEmail += 1;
                    console.log("This email already taken by another user.")
                    console.log("Duplicate Email: ", duplicateEmail)
                    continue;
                }
            }

            const newUser = new UserModel(userContent)

            const err = newUser.validateSync();
            if (err instanceof mongoose.Error) {
                const valid = await validationError.requiredCheck(err.errors);
                console.log("validation Error")
                console.log(valid)
                validationCount += 1;
                console.log("Validation Count: ", validationCount)
                continue;
            }

            const user = await newUser.save()
            console.log("stored ", i)
        } else {
            noEmailOrPhone += 1;
            console.log("No email of phone: ", noEmailOrPhone)
            console.log(eachUser)
        }
    }
}, 1100);
