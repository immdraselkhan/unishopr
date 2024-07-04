import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";

function makeTitleToDOMId(title: string) {
    return title.toLowerCase().split(" ").join("_");
}

export default function TermsPage() {
    return (
        <>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover">
                <div className="absolute top-0 start-0 bg-white w-full h-full  transition-opacity duration-500 group-hover:opacity-80" />
                <div className="w-full flex items-center justify-center relative z-10 py-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            explore
                        </span>
                        Terms of Service
                    </h2>
                </div>
            </div>
            <div className="my-8 lg:my-10 xl:my-12 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-2/3">
                <div className="flex flex-col md:flex-row">
                    <div className="mb-10">
                        {/* <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                            Purpose
                        </h2> */}
                        <div className="text-heading text-sm leading-7 lg:text-base lg:leading-loose">
                            Once you have confirmed a request by advancing the entire amount, you cannot cancel the request. Before making the payment, the deal is not confirmed and you can cancel the deal.
                        </div>
                    </div>
                </div>
            </div>
            <Subscription />
        </>
    );
}

TermsPage.Layout = Layout;