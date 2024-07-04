const mongoose = require("mongoose");
const httpStatus = require("http-status");

const token = require("../../utils/token");
const catchAsync = require("../../utils/catchAsync");
const apiResponse = require("../../utils/apiResponse");
const validationError = require("../../utils/validationError");

const { TravelModel, TravelStatus } = require("../../models/feTravel.model");
const { CityModel, CityStatus } = require("../../models/feCity.model");
const {UserModel, UserServicesStatus} = require("../../models/feUser.model");

const getTravels = catchAsync(async (req, res) => {
    const userId = await token.getAccessTokenFeUserId(req);
    if (!userId) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const travels = await TravelModel.find({ "user._id": userId, status: { $ne: TravelStatus.completed } }).populate("leads._id", "updates").sort({ createdAt: -1 });
    return apiResponse(res, httpStatus.OK, { data: travels });
});

const addTravel = catchAsync(async (req, res) => {
    const user = await token.getFeUserInfoByAccessToken(req);
    if (!user) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid user." })

    const {
        weight,
        route,
        travelDate
    } = req.body;

    const body = {};
    if (weight) Object.assign(body, { weight: { capacity: weight } })
    if (travelDate) Object.assign(body, { travelDate })

    if (route.fromCityId && route.toCityId) {
        const fromCity = await CityModel.findOne({ _id: route.fromCityId }).populate("country._id").lean();
        if (!fromCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid From City" })

        const toCity = await CityModel.findOne({ _id: route.toCityId }).populate("country._id").lean();
        if (!toCity) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "Invalid To City" });

        if (fromCity && toCity) Object.assign(body, { route: { from: { ...fromCity, country: fromCity.country._id }, to: { ...toCity, country: toCity.country._id } } })
    }

    const isDuplicate = await TravelModel.findOne({
        "user._id": user._id,
        "travelDate": {
            $lte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T23:59:59.0Z`),
            $gte: new Date(`${new Date(travelDate).toLocaleDateString('fr-CA')}T00:00:00.0Z`)
        },
        status: { $ne: TravelStatus.completed }
    })
    if (isDuplicate) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, { message: "More than one travel is not allowed on the same day" })

    const newTravel = new TravelModel({ ...body, user, travelId: "tv_1" });
    const err = newTravel.validateSync();
    if (err instanceof mongoose.Error) {
        const validation = await validationError.requiredCheck(err.errors);
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message: "Validation Required" }, validation);
    }

    const save = await newTravel.save();
    const userInfo = await UserModel.findOne({_id: user._id}, {services: true});
    if (save && userInfo?.services?.traveler && !userInfo.services.traveler.isTraveler) await UserModel.updateOne({_id: user._id}, {"services.traveler.isTraveler": true, "services.traveler.status": UserServicesStatus.approved})

    return apiResponse(res, httpStatus.CREATED, { data: save, message: "Travel Created" });
});

module.exports = { getTravels, addTravel };
