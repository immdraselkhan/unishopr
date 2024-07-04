import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";

export default function AboutUsPage() {
    return (
        <>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover">
                <div className="absolute top-0 start-0 bg-white w-full h-full  transition-opacity duration-500 group-hover:opacity-80" />
                <div className="w-full flex items-center justify-center relative z-10 py-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            explore
                        </span>
                        About Us
                    </h2>
                </div>
            </div>
            <div className="my-8 lg:my-10 xl:my-12 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-2/3">
                <div className="flex flex-col md:flex-row">
                    <div className="mb-10">
                        <div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
                            UniShopr ensures more convenient digital service compared than the international logistics companies using sharing economy and crowd sourcing model that enables cross-border travelers to monetize their unused luggage space which in turn supports the local consumers who wish to shop from international marketplaces. In a broader perspective, this concept will ignite a significant growth of the global e-commerce industry.
                        </div>
                    </div>
                </div>
            </div>
            <Subscription />
        </>
    );
}

AboutUsPage.Layout = Layout;
