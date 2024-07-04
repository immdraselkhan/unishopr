const axios = require("axios");

const sendSms = async (number, message) => {
    // return await axios({
    //     method: 'get',
    //     url: `${process.env.SMS4BD_URL}?publickey=${process.env.SMS4BD_PUBLIC_KEY}&privatekey=${process.env.SMS4BD_PRIVATE_KEY}&sender=unishopr&receiver=${number}&message=${message}&type=8&delay=0`,
    // })
    //     .then(function (response) {
    //         console.log(response)
    //         return true
    //     })
    //     .catch(function (response) {
    //         console.log(response)
    //         return true;
    //     })

    // return await axios.get(process.env.SMS4BD_URL, {
    //     params: {
    //         publickey: process.env.SMS4BD_PUBLIC_KEY,
    //         privatekey: process.env.SMS4BD_PRIVATE_KEY,
    //         sender: "Unishopr",
    //         receiver: number,
    //         message: message,
    //         type: 8,
    //         delay: 0
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response)
    //         return true
    //     })
    //     .catch(function (response) {
    //         console.log(response)
    //         return true;
    //     })

    return await axios
        .get(process.env.QUICKBD_URL, {
            params: {
                api_key: process.env.QUICKBD_API_KEY,
                type: "text",
                method: "api",
                senderid: process.env.QUICKBD_SENDER_ID,
                contacts: number,
                msg: message,
            },
        })
        .then(function (response) {
            console.log(response);
            return true;
        })
        .catch(function (response) {
            console.log(response);
            return true;
        });

    // return await axios.get(`${process.env.QUICKBD_URL}?api_key=${process.env.QUICKBD_API_KEY}&type=unicode&method=api&senderid=${process.env.QUICKBD_SENDER_ID}&contacts=${number}&msg=${message}`)
    //     .then(function (response) {
    //         console.log(response)
    //         return true
    //     })
    //     .catch(function (response) {
    //         console.log(response)
    //         return true;
    //     })
};
// const sendSms = async (number, message) => {
//     return await axios({
//         method: 'post',
//         url: process.env.SSL_SMS_URL,
//         data: {
//             api_token: process.env.SSL_SMS_API_TOKEN,
//             sid: process.env.SSL_SMS_SID,
//             msisdn: number,
//             sms: message,
//             csms_id: process.env.SSL_SMS_CSMSID,
//         },
//         headers: {'Content-Type': 'application/json'}
//     })
//         .then(function (response) {
//             //handle success
//             console.log(response)
//             return true;
//         })
//         .catch(function (response) {
//             //handle error
//             console.log(response)
//             return true;
//         })
// }

module.exports = { sendSms };
