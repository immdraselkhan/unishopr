const { LeadModel, LeadStatus} = require("../models/feLead.model");
const { LeadTimelineModel, LeadTimelineStatus, LeadTimelineType} = require("../models/feLeadTimeline.model");
const {TravelModel, TravelStatus} = require("../models/feTravel.model");
const {OrderModel} = require("../models/feOrder.model");
const sms = require("./sms");
const { sendNotification } = require("./notification");

const updateCostAndValue = async (leadId) => {
    const lead = await LeadModel.findOne({ _id: leadId }, { checkout: true, price: true, cost: true, quantity: true });

    let cost = 0, value = 0;
    if (lead?.price && lead?.quantity) value += lead.price * lead.quantity;
    if (lead?.cost && lead?.quantity) cost += lead.cost * lead.quantity;

    if (lead?.checkout?.attributes?.length) {
        lead.checkout.attributes.forEach((attr) => {
            cost += attr.cost;
            value += attr.value;
        })
    }

    if (lead?.checkout?.additional?.length) {
        lead.checkout.additional.forEach((addi) => addi.attributes.forEach((attr) => {
            cost += attr.cost;
            value += attr.value;
        }))
    }

    await LeadModel.updateOne({ _id: leadId }, { "checkout.totalAmount": value, "checkout.totalCost": cost, "checkout.totalProfit": value - cost })
    return { amount: value, cost, profit: value - cost };
}

const addToTimeline = async (_id, type = null) => {
    if (type) {
        const timeline = await LeadTimelineModel.findOne({ type: type, status: { $ne: LeadTimelineStatus.deleted } }, { title: true, description: true }).sort({ createdAt: -1 });
        
        if (timeline) await LeadModel.updateOne({ _id }, { $push: { "updates": timeline } });
    }
}

const leadToTravel = async (travelId, leadId) => {
    const lead = await LeadModel.findOne({ _id: leadId }).populate("user._id", "phone").lean();
    const travel = await TravelModel.findOne({ _id: travelId, status: TravelStatus.upcoming })

    if (lead && travel) {
        await TravelModel.updateOne({ _id: travelId }, {
            "weight.loaded": (travel.weight.loaded + (lead.weight * lead.quantity)).toFixed(2),
            "weight.remaining": (travel.weight.capacity - (travel.weight.loaded + (lead.weight * lead.quantity))).toFixed(2),
            $push: { leads: lead }
        })

        await LeadModel.updateOne({ _id: leadId }, { travel })

        await addToTimeline(leadId, LeadTimelineType.travelerAssigned)

        const phone = `${lead.user._id.phone.country.code}${lead.user._id.phone.phone}`
        const smsMessage = `আপনার দেয়া অর্ডারে ট্রাভেলার যুক্ত করা হয়েছে। ` + "\n" + `https://unishopr.com/account/orders/pending?leadId=${lead.leadId}`

        await sms.sendSms(phone, smsMessage)

        const leadInfo = await LeadModel.findOne({ _id: leadId }).populate("user._id", "phone").lean();

        const notification = {
            userId: leadInfo.user._id._id,
            title: "Traveler Assigned",
            description: `We've assigned a traveler for your order. Please pay the amount through checkout. https://unishopr.com/account/orders/pending?leadId=${leadInfo.leadId}`,
            photo: leadInfo.photo,
            dataId: leadInfo.leadId,
        };
        await sendNotification(notification)
    }
}

module.exports = { updateCostAndValue, addToTimeline, leadToTravel }
