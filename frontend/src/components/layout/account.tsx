import Container from "@components/ui/container";
import { FC, Fragment, ReactNode } from "react";

const AccountLayout: FC<{ children: ReactNode, nav?: ReactNode, title: string }> = ({ children, nav, title }) => {
    return (
        <Fragment>
            <div className="flex justify-center relative bg-no-repeat bg-center bg-cover">
                <div className="absolute top-0 start-0 bg-white w-full h-full  transition-opacity duration-500 group-hover:opacity-80" />
                <div className="w-full flex items-center justify-center relative z-10 py-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
                        <span className="font-satisfy block font-normal mb-3">
                            explore
                        </span>
                        {title}
                    </h2>
                </div>
            </div>
            <Container>
                <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex  md:flex-row w-full">
                    <div className="flex justify-center flex-col md:flex-row w-full">
                        {nav}
                        <div className="overflow-auto md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">
                            <div className="mx-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Fragment>
    );
};

export default AccountLayout;
