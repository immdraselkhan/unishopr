import { CartItem } from "@utils/auth";

export type SimpleRes = {
    data: any,
    message: string
}

export interface User {
    data: any;
    message: null;
    stack: null;
}

export type PaymentRes = {
    data: {
        _id: string,
        invoiceNo: string,
        transactionId: string,
        amount: number,
        gateway: string,
        status: string,
        paidAmount: number,
        products: {
            name: string
        }[]
    }[],
    message: null;
    stack: null;
}

export interface UpdateUserReq {
    firstName: string,
    lastName: string,
    photo: string,
    social: {
        facebook: string,
        linkedin: string,
        instagram: string,
        twitter: string
    },
    overview: string,
}

export interface UpdatePhoneOrEmailReq {
   data : {
       email: string,
       phone: string,
       countryId: string,
   }
    action: () => void
}

export interface OtpVerifyReq {
    data: {
        otp: string,
        phone: string,
        countryId: string,
    }
    action: () => void
}

export type UpdateProfilePictureReq = {
    photo: string | null;
};

export type SslPayReq = {
    firstName: string,
    lastName: string,
    address: string,
    paymentFrom: string,
    amount: number,
    redirectUrl: string,
    products: CartItem[],
}

export type SslPayRes = {
    data: {
        GatewayPageURL: string,
    },
    message: string,
    stack: object
}

export type ManualPayReq = {
    firstName: string,
    lastName: string,
    address: string,
    paymentFrom: string,
    amount: number,
    redirectUrl: string,
    products: CartItem[],
    gateway: string
    screenshot: string,
}

export interface PartnerRequestReq {
    data: {
        overview: string,
    }
}