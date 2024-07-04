export type CountryType = {
    _id: string,
    name: string,
    code: string,
    latitude: number,
    longitude: number,
    flag: string,
    currencySymbol: string,
    currencyFromDollar: number,
}

export type CountriesRes = {
    data: CountryType[],
    message: string,
    stack: object
}

export type CategoryTreeRes = {
    data: {
        _id: string,
        columnItems: {
            _id: string,
            label: string,
            path: string,
            columnItemItems: {
                _id: string,
                label: string,
                path: string,
            }[]
        }[]
    }[],
    message: string,
    stack: object
}

export type CitiesType = {
    _id: string,
    name: string,
    country: {
        _id: string,
        name: string,
        code: string,
        latitude: number,
        longitude: number,
    },
    latitude: number,
    longitude: number,
}

export type CitiesRes = {
    data: CitiesType[],
    message: string,
    stack: object
}