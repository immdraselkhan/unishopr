const validationError = require("../utils/validationError");
const fs = require('fs');
const path = require('path');
const {UserModel} = require("../models/feUser.model");
const mongoose = require("mongoose");
const {CityModel} = require("../models/feCity.model");
const {LeadStatus, LeadModel} = require("../models/feLead.model");
const {OrderModel, OrderType, OrderStatus} = require("../models/feOrder.model");

setTimeout(async () => {
    let rawData = fs.readFileSync(path.resolve(__dirname, 'orders.json'));
    let orders = JSON.parse(rawData);

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        let user = null;
        user = await UserModel.findOne({email: order.user_email}, {firstName: true, lastName: true, photo: true});
        if (!user && order.user_phone) {
            user = await UserModel.findOne({"phone.phone": order.user_phone.slice(-10)}, {firstName: true, lastName: true, photo: true});
            if (!user) {

                const firstName = order.user_name ? order.user_name.substring(0, order.user_name.lastIndexOf(" ")) : null;
                const lastName = order.user_name ? order.user_name.split(' ').pop() : null;
                const phone = order.user_phone ? order.user_phone.slice(-10) : null
                const userContent = {
                    firstName: firstName || " ",
                    lastName: lastName || " ",
                    email: order.user_email,
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
                        continue;
                    } else if (uniqueValidation.email) {
                        console.log("This email already taken by another user.")
                        continue;
                    }
                }

                const newUser = new UserModel(userContent)

                const err = newUser.validateSync();
                if (err instanceof mongoose.Error) {
                    const valid = await validationError.requiredCheck(err.errors);
                    continue;
                }

                user = await newUser.save()
            }
        }

        if (user) {
            await UserModel.updateOne({_id: user._id}, {
                address: [{
                    country: {
                        _id: "63666de1038c9d60bfa043b5",
                        name: "Bangladesh",
                        code: "+880"
                    },
                    city: {
                        _id: "6368e7517960a77e34b19025",
                        name: "Dhaka"
                    },
                    addressLine1: order.delivery_address
                }]
            })

            let leadContent = {
                user,
                leadId: 1,
                url: order.sellerUrl,
                name: order.product_title,
                photo: "",
                currency: "BDT",
                cost: order.currentPrice,
                price: order.currentPrice,
                foreignCurrency: order.foreignCurrency ? order.foreignCurrency === "Ringgit" ? "RM" : order.foreignCurrency : null,
                foreignPrice: order.foreignPrice,
                quantity: order.quantity,
                weight: order.weight ? parseInt(order.weight)/1000 : null,
                route: {
                    to: {
                        country: {
                            name: "Bangladesh",
                            code: "+880",
                            latitude: 0,
                            longitude: 0,
                            _id: "63666de1038c9d60bfa043b5"
                        },
                        latitude: 85285,
                        longitude: 55844,
                        name: "Dhaka",
                        status: "active",
                        _id: "6368e7517960a77e34b19025"
                    }
                },
                description: order.notes,
                checkout: {
                    totalCost: order.currentPrice,
                    totalAmount: order.currentPrice,
                },
                isOrdered: false, // make it true after lead add if ordered
                status: LeadStatus.pending,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }

            const firstSplit = order.product_images?.split("}");
            if (firstSplit && firstSplit.length) leadContent.photo = firstSplit[0].slice(1).split(",")[0];

            let fromCity = null;
            if (leadContent.foreignCurrency && leadContent.foreignCurrency === "USD") fromCity = await CityModel.findOne({_id: "6368e6a97960a77e34b18ff8"});
            else if (leadContent.foreignCurrency && leadContent.foreignCurrency === "RM") fromCity = await CityModel.findOne({_id: "6369105c9265fe810c734cca"});
            else if (leadContent.foreignCurrency && leadContent.foreignCurrency === "BAHT") fromCity = await CityModel.findOne({_id: "636bd95899c9969ef16fba2a"});
            else if (leadContent.foreignCurrency && leadContent.foreignCurrency === "INR") fromCity = await CityModel.findOne({_id: "6368f2787960a77e34b1953f"});
            else if (leadContent.foreignCurrency && leadContent.foreignCurrency === "BDT") fromCity = await CityModel.findOne({_id: "6368e7517960a77e34b19025"});

            if (fromCity) leadContent.route.from = fromCity;

            if (order.status === "Rejected") leadContent.status = LeadStatus.cancelled
            else if (order.status === "On Approval") leadContent.status = LeadStatus.pending
            else if (order.status === "Delivered") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "On Refund") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "On Investigation") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Seller Delivered") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Ordered") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Refunded") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Seller Shipped") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Purchased") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "UniShopr Received") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Traveller Received") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else if (order.status === "Shopper Followup") {
                leadContent.status = LeadStatus.ordered;
                leadContent.isOrdered = true;
            } else {
                leadContent.status = LeadStatus.pending;
                leadContent.isOrdered = false;
            }

            const newLead = new LeadModel(leadContent);
            const err = newLead.validateSync();
            if (err instanceof mongoose.Error) {
                const validation = await validationError.requiredCheck(err.errors);
                console.log(validation)
            } else {
                const theLead = await newLead.save();

                if (order.invoiceId && order.status && order.status !== "Rejected" && order.status !== "On Approval") {
                    let orderContent = {
                        orderId: 1,
                        user: user,
                        products: [{
                            _id: theLead._id,
                            leadId: theLead._id,
                            type: OrderType.lead,
                            name: leadContent.name,
                            thumbnail: leadContent.photo,
                            price: leadContent.price,
                            quantity: leadContent.quantity,
                            total: leadContent.price,
                        }],
                        payment: {
                            invoiceNo: order.invoiceId,
                            amount: leadContent.price
                        },
                        type: OrderType.lead,
                        status: OrderStatus.dispatched,
                        createdAt: order.createdAt,
                        updatedAt: order.updatedAt
                    }

                    if (order.status === "Delivered") orderContent.status = OrderStatus.delivered
                    else if (order.status === "On Refund") orderContent.status = OrderStatus.delivered
                    else if (order.status === "On Investigation") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Seller Delivered") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Ordered") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Refunded") orderContent.status = OrderStatus.delivered
                    else if (order.status === "Seller Shipped") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Purchased") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "UniShopr Received") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Traveller Received") orderContent.status = OrderStatus.dispatched
                    else if (order.status === "Shopper Followup") orderContent.status = OrderStatus.dispatched
                    else orderContent.status = OrderStatus.cancelled

                    const newOrder = new OrderModel(orderContent)
                    const err = newOrder.validateSync();
                    if (err instanceof mongoose.Error) {
                        const validation = await validationError.requiredCheck(err.errors);
                        console.log(validation)
                    } else {
                        await newOrder.save();
                        console.log("order saved", i)
                    }
                }
            }
        }
    }
}, 1100);
