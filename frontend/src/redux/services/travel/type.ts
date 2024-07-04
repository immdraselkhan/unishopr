export type AddTravelReq = {
    data: {},
    action: (leadId: string) => void;
};

export type AddTravelRes = {
    data: {
        _id: string,
        url: string,
    },
    message: string
}

export type TravelRes = {
    _id: string,
    travelId: string,
    travelDate: string,
    description: string,
    status: string,
    route: {
        from: {
            _id: string,
            name: string,
            latitude: string,
            longitude: string,
            country: {
                _id: string,
                name: string,
                code: string,
                flag: string,
                latitude: number,
                langitude: number,
            },
        },
        to: {
            _id: string,
            name: string,
            latitude: string,
            longitude: string,
            country: {
                _id: string,
                name: string,
                code: string,
                flag: string,
                latitude: number,
                langitude: number,
            },
        },
        status: string,
        travelId: string,
        travelDate: string,
    },
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        photo: string,
    },
    weight: {
        capacity: number,
        loaded: number,
        remaining: number,
    },
    leads: {
        _id: {
            _id: string,
            updates: {
                _id: string,
                title: string,
                description: string,
                createdAt: string,
                updatedAt: string,
                createdBy: any
            }[]
        },
        description: string,
        isBoxNeeded: boolean,
        leadId: string,
        name: string,
        photo: string,
        price: number,
        quantity: number,
        url: string,
        weight: number,
        checkout: {
            attributes: {
                _id: string,
                name: string,
                value: number,
                createdAt: string,
                updatedAt: string,
            }[],
            totalAmount: number
        },
        user: {
            _id: string,
            firstName: string,
            lastName: string,
            photo: string,
        },
        route: {
            from: {
                _id: string,
                name: string,
                latitude: string,
                longitude: string,
                country: {
                    _id: string,
                    name: string,
                    code: string,
                    flag: string,
                    latitude: number,
                    langitude: number,
                },
            },
            to: {
                _id: string,
                name: string,
                latitude: string,
                longitude: string,
                country: {
                    _id: string,
                    name: string,
                    code: string,
                    flag: string,
                    latitude: number,
                    langitude: number,
                },
            },
            status: string,
            travelId: string,
            travelDate: string,
        },
    }[]
}

export type TravelsRes = {
    data: TravelRes[],
    message: string
}