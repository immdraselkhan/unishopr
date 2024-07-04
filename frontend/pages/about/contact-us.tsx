import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ContactForm from "@components/common/form/contact-form";
import ContactInfoBlock from "@containers/contact-info";

export default function ContactUsPage() {
    return (
        <>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover">
                <div className="absolute top-0 start-0 bg-white w-full h-full  transition-opacity duration-500 group-hover:opacity-80" />
                <div className="w-full flex items-center justify-center relative z-10 py-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            explore
                        </span>
                        Contact Us
                    </h2>
                </div>
            </div>
            <Container>
                <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
                        <ContactInfoBlock />
                    </div>
                    <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ms-7 flex-col lg:ps-7">
                        <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
                            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
                                {("Get in touch")}
                            </h4>
                        </div>
                        <ContactForm />
                    </div>
                </div>
                <Subscription />
            </Container>
        </>
    );
}

ContactUsPage.Layout = Layout;

