const axios = require("axios")
const { NotificationModel, NotificationStatus } = require("../models/feNotification.model");

const sendNotification = async ({ userId, title, description, photo, dataId }) => {
    if (userId && title && description) {
        const data = {
            "user._id": userId,
            title: title,
            description: description,
            photo: photo,
            dataId: dataId,
            status: NotificationStatus.sent,
        };

        const notification = new NotificationModel(data);
        await notification.save();
    }
}

module.exports = { sendNotification }