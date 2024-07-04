import {Fragment, useState} from "react";
import Container from "@components/ui/container";
import StickyBox from "react-sticky-box";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import ActiveLink from "@components/ui/active-link";
import ListBox from "@components/ui/list-box";
import Modal from "@components/common/modal/modal";
import {useRouter} from "next/router";
import {useProductsQuery} from "@redux/services/landing/api";
import {getProductDiscount} from "@utils/utilities";
import {Constants} from "@utils/constants";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import {Product} from "@redux/services/landing/type";
import ProductBox from "@containers/products/product-box";

const Products = () => {
    const router = useRouter();
    const {slug} = router.query;
    const [filterSortType, setFilterSortType]  = useState("");
    const [state, setState] = useState({
        page: 1,
        sort: "createdAtDesc",
        perPage: 9

    });
    const [showDiscount, setShowDiscount] = useState(true);
    const [productModal, setProductModal] = useState<{show: boolean, product: Product | null}>({show: false, product: null})

    const getFilterSortParams = (sortType:string) => {
        setFilterSortType(sortType);
        if (sortType === "priceHighToLow") setState({...state, sort: "priceDesc" })
        else if (sortType === "priceLowToHigh") setState({...state, sort: "priceAsc" })
        else if (sortType === "default") setState({...state, sort: "createdAtDesc" })
    };

    const products = useProductsQuery({
        sort: state.sort,
        page: state.page,
        perPage: state.perPage,
        categoryId: slug && slug.length ? slug[0] : "",
        subCategoryId: slug && slug.length > 1 ? slug[1] : "",
        childCategoryId: slug && slug.length > 2 ? slug[2] : "",
    }, {refetchOnMountOrArgChange: true})

    return(
        <Fragment>
            {/*<div*/}
            {/*    className={`flex justify-center relative bg-borderBottom transition duration-200 ease-in ${*/}
            {/*        !showDiscount ? "h-0.5" : "py-4"*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <Container className={!showDiscount ? "opacity-0 invisible" : "w-full"}>*/}
            {/*        <div className="relative text-center text-heading text-xs md:text-sm leading-6 md:leading-7 px-8">*/}
            {/*            {"text-discount"} &nbsp;*/}
            {/*            <a className="underline" href="#">*/}
            {/*                {"text-details"}*/}
            {/*            </a>*/}
            {/*            <button*/}
            {/*                className="absolute h-full end-0 top-0 flex text-lg md:text-2xl items-center justify-center text-gray-500 opacity-50 focus:outline-none transition-opacity hover:opacity-100"*/}
            {/*                onClick={() => setShowDiscount(false)}*/}
            {/*                aria-label="close"*/}
            {/*            >*/}
            {/*                <IoClose className="text-black" />*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </Container>*/}
            {/*</div>*/}

            <Container>
                <div className="flex justify-between items-center mb-7 mt-7">
                    <div className="hidden lg:block">
                        <StickyBox offsetTop={50} offsetBottom={20}>
                            <BreadcrumbItems separator="/">
                                <ActiveLink
                                    href={"/"}
                                    activeClassName="font-semibold text-heading"
                                >
                                    <a>Home</a>
                                </ActiveLink>
                                <ActiveLink
                                    href={"/"}
                                    activeClassName="font-semibold text-heading"
                                >
                                    <a className="capitalize">products</a>
                                </ActiveLink>
                            </BreadcrumbItems>
                        </StickyBox>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2">
                            {products?.data?.data.total} Items
                        </div>
                        <ListBox
                            getFilterSortParams={getFilterSortParams}
                            options={[
                                { name: "sorting Options", value: "options" },
                                { name: "New Arrived", value: "default" },
                                { name: "High To Low", value: "priceHighToLow" },
                                { name: "Low To High", value: "priceLowToHigh" },

                            ]}
                        />
                    </div>
                </div>

                <Fragment>
                    <div
                        className={`grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8`}
                    >
                        {products.isLoading ? <ProductFeedLoader limit={20} uniqueKey="search-product" /> : null}
                        {products.data?.data.products.map((product, pi) => (
                            <div
                                key={pi}
                                className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product"
                                onClick={() => setProductModal({show: true, product: product})}
                                role="button"
                                title={product?.name}
                            >
                                <div className="flex mb-3 md:mb-3.5">
                                    <img
                                        src={Constants.S3_BASE_URL(product.file.cover)}
                                        width={340}
                                        height={440}
                                        // loading={false}
                                        // quality={100}
                                        alt={product.name}
                                        className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                    />
                                </div>
                                <div className="w-full overflow-hidden md:px-2.5 xl:px-4">
                                    <h2 className="text-heading font-semibold truncate mb-1 text-sm md:text-base md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
                                        {product?.name}
                                    </h2>
                                    <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
                                        {product?.description.short}
                                    </p>
                                    <div
                                        className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5`}
                                    >
                                        {getProductDiscount(product.price, product.discount).availability ? (
                                            <>
                                                <span className="inline-block"> ৳ {product?.price.new}</span>
                                                <del className="sm:text-base font-normal text-gray-800">
                                                    ৳ {product?.price.regular}
                                                </del>
                                            </>
                                        ) :
                                            <span className="inline-block"> ৳ {product?.price.regular}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/*<div className="text-center pt-8 xl:pt-14">*/}
                    {/*    {hasNextPage && (*/}
                    {/*        <Button*/}
                    {/*            loading={loadingMore}*/}
                    {/*            disabled={loadingMore}*/}
                    {/*            onClick={() => fetchNextPage()}*/}
                    {/*            variant="slim"*/}
                    {/*        >*/}
                    {/*            {t("button-load-more")}*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </Fragment>
            </Container>

            <Modal
                open={productModal.show}
                onClose={() => setProductModal({show: false, product: null})}
            >
                <ProductBox product={productModal.product} />
            </Modal>
        </Fragment>
    )
}
export default Products;