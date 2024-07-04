import Copyright from "./copyright";
import { footer } from "./data";
import Container from "@components/ui/container";
const { widgets, payment } = footer;
import Link from "next/link";
import { useCategoryTreeQuery } from "@redux/services/utilities/api";


const Footer: React.FC = () => {
    const categories = useCategoryTreeQuery("");

    return (
        <footer className="border-b-4 border-heading mt-4 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
            <Container>
                <div className="flex justify-around flex-wrap">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1">
                        {widgets?.map((widget) => (
                            <div className="pb-3 md:pb-0">
                                <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                                    {widget.widgetTitle}
                                </h4>
                                <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                                    {widget.lists.map((list) => (
                                        <li
                                            key={`widget-list--key${list.id}`}
                                            className="flex items-baseline"
                                        >
                                            {list.icon && (
                                                <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                                                    {list.icon}
                                                </span>
                                            )}
                                            <Link href={list.path ? list.path : "#!"}>
                                                <a className="transition-colors duration-200 hover:text-black">
                                                    {list.title}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="pb-3 md:pb-0">
                            <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
                                Top Categories
                            </h4>
                            <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
                                {
                                    categories.data?.data[0]?.columnItems?.map(categoryItem => (
                                        <li>
                                            <Link href={categoryItem.path ? categoryItem.path : "#!"}>
                                                <a className="transition-colors duration-200 hover:text-black">
                                                    {categoryItem.label}
                                                </a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="pb-3 md:pb-0">
                        <img
                            src="/assets/images/sslcommerz.png"
                            width={450}
                            // height={440}
                            // loading={false}
                            // quality={100}
                            alt={"bkash"}
                            className="object-cover rounded-s-md rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                        />
                        <span className="flex items-center">
                            <span className="pe-1 font-semibold">Powered By </span>
                            <img
                                src="/assets/images/sslcommerz_logo.png"
                                width={150}
                                // height={440}
                                // loading={false}
                                // quality={100}
                                alt={"bkash"}
                                className="object-cover rounded-s-md rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                            />
                        </span>
                    </div>
                </div>
            </Container>
            <Copyright payment={payment} />
        </footer>
    )
};

export default Footer;
