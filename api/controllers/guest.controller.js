const httpStatus = require("http-status");

const catchAsync = require("../utils/catchAsync");
const apiResponse = require("../utils/apiResponse");
const {LeadModel, LeadStatus} = require("../models/feLead.model");
const {TravelModel, TravelStatus} = require("../models/feTravel.model");
const {sendEmail} = require("../utils/email");
const {leadToTravel} = require("../utils/leads");

const baseUrl = catchAsync(async (req, res) => {
    return apiResponse(res, httpStatus.OK, "welcome to home page.");
});

const assignTraveler = catchAsync(async (req, res) => {
    const leads = await LeadModel.find({status: LeadStatus.checkout, "travel.travelId": null}).lean();
    let message = "";

    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        const travel = await TravelModel.findOne({
            status: TravelStatus.upcoming,
            "weight.remaining": {$gte: lead.weight},
            "route.from._id": lead.route.from._id,
            "route.to._id": lead.route.to._id,
        })

        if (!travel) message += `Couldn't find any traveler for lead ID: ${lead.leadId}, ` + "\n";

        if (travel) await leadToTravel(travel._id, lead._id)
    }

    if (message) await sendEmail({
        to: "mohiminul121212@gmail.com",
        subject: "Couldn't assign traveler",
        text: message
    })

    return apiResponse(res, httpStatus.OK, "welcome to home page.");
});

module.exports = {
    baseUrl,
    assignTraveler
}
