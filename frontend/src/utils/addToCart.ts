import { getProductDiscount } from '@utils/utilities';
import { setLocalCart } from '@utils/auth';
import { errorAlert } from './alert';

// @ts-ignore
export const addToCart = async (product, attributes, productPrice, quantity) => {
    if (product?._id) {
        if (product?.attributes?.length !== attributes.length) {
            await errorAlert({title: 'Please select attributes'})
            return
        }

        await setLocalCart({
            _id: product._id,
            productId: product._id,
            type: "shop",
            name: product.name,
            thumbnail: product.file.cover,
            quantity: quantity,
            price: getProductDiscount(product.price, product.discount).availability ? product.price.new : product.price.regular,
            total: getProductDiscount(product.price, product.discount).availability ? (productPrice.new*quantity) : (productPrice.regular*quantity),
            attributes
        })
    }
}