const jsonwebtoken = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const apiResponse = require("../../utils/apiResponse");
const catchAsync = require("../../utils/catchAsync");

const {UserModel} = require("../../models/beUser.model");
const {RoleModel} = require("../../models/beRole.model");
const {OAuthAccessTokenModel} = require("../../models/beOAuthAccessToken.model");
const {OAuthRefreshTokenModel} = require("../../models/beOAuthRefreshToken.model");

const generateToken = (user, exp, secret) => {
    return jsonwebtoken.sign({
        sub: user,
        platform: "backEnd",
        iat: moment().unix(),
        exp: moment(exp).unix(),
    }, secret);
};

const OAuthAccessTokenDetail = async (accessToken, user, permissions, exp) => {
    const data = new OAuthAccessTokenModel({
        _id: accessToken,
        user: user._id,
        scopes: permissions,
        revoked: false,
        expires: exp,
    });
    return await data.save();
};

const OAuthRefreshTokenDetail = async (refreshToken, accessTokenDetail, clientId, exp) => {
    const data = new OAuthRefreshTokenModel({
        _id: refreshToken,
        accessToken: accessTokenDetail._id,
        client: clientId,
        revoked: false,
        expires: exp,
    });
    return await data.save();
};

const accessTokenDetailAndRefreshTokenDetail = async (user, permissions, clientId) => {
    const exp = moment().add(parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES), "minutes");
    const accessToken = await generateToken(user, exp, process.env.JWT_ACCESS_SECRET);
    const exp2 = moment().add(parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS), "days");
    const refreshToken = await generateToken(user, exp2, process.env.JWT_REFRESH_SECRET);

    const accessTokenDetail = await OAuthAccessTokenDetail(accessToken, user, permissions, exp);
    const refreshTokenDetail = await OAuthRefreshTokenDetail(refreshToken, accessTokenDetail, clientId, exp2);

    return {accessTokenDetail, refreshTokenDetail};
}

const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({
        $or: [{email: email}, {username: email}]
    });

    if (!user) {
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {
            message: "Invalid email or username. Please register first."
        });
    } else if (!(await user.isPasswordMatch(password))) {
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {
            message: "Password not matched."
        });
    }

    const roleInfo = await RoleModel.findOne({_id: user.role._id});

    const {accessTokenDetail, refreshTokenDetail} = await accessTokenDetailAndRefreshTokenDetail(user, roleInfo && roleInfo.permissions ? roleInfo.permissions : [], req.client._id);

    return apiResponse(res, httpStatus.CREATED, {
        data: {
            access: {
                token: accessTokenDetail._id,
                expires: accessTokenDetail.expires,
            },
            refresh: {
                token: refreshTokenDetail._id,
                expires: refreshTokenDetail.expires,
            },
            user: user,
            scopes: roleInfo && roleInfo.permissions ? roleInfo.permissions : [],
        },
        message: "Login Successful"
    });
});

const logout = catchAsync(async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (accessToken) {
        const accessDetails = await OAuthAccessTokenModel.findByIdAndUpdate(accessToken, {revoked: true});
        await OAuthRefreshTokenModel.updateOne({accessToken: accessDetails._id}, {revoked: true});

        return apiResponse(res, httpStatus.ACCEPTED, {
            message: "Logout Successful"
        });
    }

    return apiResponse(res, httpStatus.UNAUTHORIZED, {
        message: "Session expired. Please login again."
    });
});

const changePassword = catchAsync(async (req, res) => {
    const {currentPassword, password, _id} = req.body;
    const user = await UserModel.findOne({_id})
    if (user._id) {
        const passMatch = await bcrypt.compare(currentPassword, user.password);
        if (passMatch) {
            const pass = await bcrypt.hash(password, 8)
            await UserModel.updateOne({_id: _id}, {$set: {password: pass}});
            return apiResponse(res, httpStatus.ACCEPTED, {message: "Password Updated"});
        }
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Current Password Not Matched"});
    }
    return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "User not Found"});
});

module.exports = { login, logout, changePassword }
