export type ProductsReq = {
    page: number,
    perPage: number,
    sort: string,
    categoryId: string,
    subCategoryId: string,
    childCategoryId: string
}

export type LeadProduct = {
    name : string,
    url: string,
    price: number,
    description: string,
    photo: string,
}

export type Product = {
    _id: string,
    name: string,
    productId: string,
    sku: string,
    publisher: { _id: string, name: string },
    writer: { _id: string, name: string },
    category: { _id: string, name: string },
    subCategory: { _id: string, name: string },
    tags: { _id: string, name: string }[],
    price: { cost: number, new: number, regular: number, tax: number },
    url: string,
    discount: { from: string, to: string, type: string, value: number },
    stock: { alertQty: number, isAlert: boolean, quantity: number },
    file: { cover: string, featured: string, video: string, gallery: { _id: string, file: string }[] },
    description: { long: string, short: string },
    attributes: {
        _id: string,
        title: string,
        options: {
            _id: string,
            title: string,
            price: number
        }[]
    }[]
}

export type ProductsRes = {
    data: {
        products: Product[],
        hasMore: boolean
        page: number
        showing: number,
        total: number
    },
    message: string,
    stack: object
}

export type ProductRes = {
    data: {
        _id: string,
        name: string,
        productId: string,
        sku: string,
        weight: number,
        publisher: { _id: string, name: string },
        writer: { _id: string, name: string },
        category: { _id: string, name: string },
        subCategory: { _id: string, name: string },
        tags: { _id: string, name: string }[],
        price: { cost: number, new: number, regular: number, tax: number },
        url: string,
        discount: { from: string, to: string, type: string, value: number },
        stock: { alertQty: number, isAlert: boolean, quantity: number },
        file: { cover: string, featured: string, video: string, gallery: { _id: string, file: string }[] },
        description: { long: string, short: string },
        attributes: {
            _id: string,
            title: string,
            image: string,
            isMultiple: boolean,
            maxSelection: number,
            isRequired: boolean,
            position: number,
            options: {
                _id: string,
                title: string,
                price: number,
                position: number,
                image: string,
            }[],
        }[]
    },
    message: string,
    stack: object
}

export type newArrivalRes = {
    data: Product[],
    message: string,
    stack: object
}

export type RecentOrderRes = {
    data : {
        name: string,
        url: string,
        price: number,
        description: string,
        photo: string,
    }[],
    message: string,
    stack: object
}

export type bannersRes = {
    data: {
        name: string,
        url: string,
        photo: string,
        position: string,
        description: string
        status: boolean
    }[],
    message: string,
    stack: object
}

export type brandsRes = {
    data: {
        name: string,
        url: string,
        photo: string,
        description: string
        status: boolean
    }[],
    message: string,
    stack: object
}

export type NotificationsRes = {
    data: NotificationsType[],
    message: string,
    stack: object
}

export type NotificationsType = {
    _id: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        photo: string,
    },
    title: string,
    description: string,
    dataId: string,
    photo: string,
    status: string,
}

export type SimpleRes = {
    data: any,
    message: string
}

export type UpdateNotificationsReq = {
    data: {
        userId: string,
    },
}