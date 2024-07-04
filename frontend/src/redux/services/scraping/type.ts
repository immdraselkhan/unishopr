export type ScrapperRes = {
    data: {
        title: string,
        image: string
    },
    message: string,
    stack: string
}

export type ScrapperReq = {
    url: string,
    action: (data: any) => void
}