export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const shortDate = (date: string) => {
    return (new Date(date)).toLocaleString('en-BD', {year: 'numeric', month: 'short', day: 'numeric'})
}

export const shortDateWithTime = (date: string) => {
    if (!date) return 'N/A'
    return (new Date(date)).toLocaleString('en-BD', {dateStyle: 'medium'}) + ' ' + (new Date(date)).toLocaleString('en-BD', {timeStyle: 'short'})
}

export const minuteToHours = (minute: number) => {
    if (!minute) return 'N/A'
    return (minute / 60).toFixed(1) + ' hr'
}

export const dateDifference = (date1: string, date2: string) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    // @ts-ignore
    const diffTime = Math.abs(firstDate - secondDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const nFormatter = (num: number, digits: number) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

interface Discount { from: string, to: string, type: string, value: number }
interface Price { new: number, regular: number }

export const getProductDiscount = (price: Price, discount: Discount) => {
    const data = {price: `${price.regular} BDT`, availability: false, discount: `0`, regularDiscount: 0, newDiscount: 0};
    // @to-do from to calculation

    if (discount.value > 0) {
        if (discount.type === 'flat') {
            data.availability = true;
            data.price = `${price.new} BDT`;
            data.regularDiscount = price.regular - discount.value;
            data.newDiscount = price.new - discount.value;
            data.discount = `${discount.value}৳`;
        }

        if (discount.type === 'percentage') {
            data.availability = true;
            data.price = `${price.new} BDT`;
            data.regularDiscount = Number((price.regular * (1 - (discount.value/100))).toFixed(0));
            data.newDiscount = Number((price.new * (1 - (discount.value/100))).toFixed(0));
            data.discount = `${discount.value}%`;
        }
    }
    return data;
};

export const isEven = (value: number) => {
    return value % 2;
};
