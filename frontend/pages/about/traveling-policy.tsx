import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import Accordion from "@components/common/accordion";
import { travelingPolicy } from "@settings/privacy-settings";

export default function TravelPolicy() {
    return (
        <>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover">
                <div className="absolute top-0 start-0 bg-white w-full h-full  transition-opacity duration-500 group-hover:opacity-80" />
                <div className="w-full flex items-center justify-center relative z-10 py-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            explore
                        </span>
                        Traveling Policy
                    </h2>
                </div>
            </div>
            <Container>
                <div className="py-16 lg:py-20 px-0 md:px-20 max-w-5xl mx-auto space-y-4">
                    <Accordion items={travelingPolicy} translatorNS="traveling" />
                </div>
                <Subscription />
            </Container>
        </>
    );
}

TravelPolicy.Layout = Layout;
