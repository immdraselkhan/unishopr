export type AddLeadReq = {
    data: {
        leadId: string,
        url: string,
        name: string,
        photo: string,
        price: number,
        quantity: number,
        weight: number,
        isBoxNeeded: boolean,
        description: string,
        route: {
            fromCityId: string,
            toCityId: string
        },
        checkout: {
            shipmentCost: number,
            travelerCharge: number,
            deliveryCharge: number,
            unishoprCharge: number,
            totalAmount: number
        },
    },
    action?: (leadId: string) => void,
}

export type AddLeadRes = {
    data: {
        _id: string,
        url: string,
    },
    message: string
}

export type CouponRes = {
    data: {
        _id: string,
        discount: {
            type: string,
            value: number,
            from: string,
            to: string,
        }
    },
    message: string
}

export type CouponReq = {
    data: {code: string},
    action: (coupon: any) => void
}

export type LeadRes = {
    name: string,
    photo: string,
    price: number,
    currency: string,
    quantity: number,
    weight: number,
    isBoxNeeded: boolean,
    description: string,
    status: string,
    _id: string,
    checkout: {
        totalAmount: number,
        attributes: {
            name: string,
            value: number
        }[],
        additional: {
            title: string,
            isPaid: boolean,
            attributes: {
                name: string,
                value: number
            }[]
        }[]
    },
    user: {
        firstName: string,
        lastName: string,
        photo?: string,
        _id: {
            _id: string,
            email: string
        },
    },
    url: string,
    leadId: string,
    route: {
        from: {
            name?: string,
            latitude?: number,
            longitude?: number,
            country: {
                name?: String,
                code?: String,
                latitude?: number,
                longitude?: number,
                flag?: string,
                currencySymbol?: string,
                currencyFromDollar?: string,
            },
        },
        to: {
            name?: string,
            latitude?: number,
            longitude?: number,
            country: {
                name?: string,
                code?: string,
                latitude?: number,
                longitude?: number,
                flag?: string,
                currencySymbol?: string,
                currencyFromDollar?: string,
            },
        },
    },
    updates: {
        title: string,
        description: string,
        createdAt: string,
        createdBy: {
            firstName: string,
            lastName: string,
            photo: string
        }
    }[],
    travel: {
        description: string,
        travelDate: string,
        travelId: string,
        route: {
            from: {
                name: string,
            },
            to: {
                name: string,
            },
        },
        user: {
            firstName: string,
            lastName: string,
            photo?: string,
            _id: {
                _id: string,
                services: {
                    traveler: {
                        overview: string
                    }
                }
            },
        },
    },
    payment?: {
        gateway: string,
        invoiceNo: string,
        platform: string,
        transactionId: string,
        createdAt: string,
        updatedAt: string,
    }
    createdAt: string,
    updatedAt: string
}

export type LeadsRes = {
    data: LeadRes[],
    message?: string,
    stack?: string,
}

export type OrdersReq = {
    status: string
}

export type OrderRes = {
    _id: string,
    orderId: string,
    type: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    user: {
        _id: {
            _id: string,
            email: string
        },
        firstName: string,
        lastName: string,
    },
    payment: {
        _id: string,
        currency: string,
        amount: number,
        deductedAmount: number,
        gateway: string,
        invoiceId: string,
        invoiceNo: string,
        others: any,
        paidAmount: number,
        platform: string,
        status: string,
        transactionId: string,
        createdAt: string,
        type: string,
    },
    products: {
        _id: string,
        leadId: {
            _id: string,
            url: string,
            user: {
                _id: string,
                firstName: string,
                lastName: string,
                photo: string
            },
            travel: {
                _id: string,
                travelId: string,
                travelDate: string,
                description: string,
                user: {
                    _id: string,
                    firstName: string,
                    lastName: string,
                    photo: string
                },
                route: {
                    from: {
                        name: string,
                        country: {
                            name: string,
                        }
                    },
                    to: {
                        name: string,
                        country: {
                            name: string,
                        }
                    }
                }
            },
            route: {
                from: {
                    name: string,
                    country: {
                        name: string,
                    }
                },
                to: {
                    name: string,
                    country: {
                        name: string,
                    }
                }
            },
            updates: {
                title: string,
                description: string,
                createdAt: string
            }[]
        },
        name: string,
        price: number,
        productId: string,
        quantity: number,
        thumbnail: string,
        total: number,
        type: string,
        extra: {
            name: string,
            value: number
        }[],
        additional: {
            name: string,
            value: number
        }[],
        attributes: {
            attribute: string,
            option: string,
            price: number
        }[]
    }[]
}

export type OrdersRes = {
    data: OrderRes[],
    message?: string,
    stack?: string,
}

export type SimpleRes = {
    data: any,
    message: string
}

export type UpdateLeadReq = {
    data: {
        leadId: string,
        status: string,
    },
    action: () => void
}
