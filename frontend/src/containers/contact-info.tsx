import {FC, Fragment} from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";
import {useRouter} from "next/router";
const mapImage = "/assets/images/location/map-image.jpg";
interface Props {
    image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
    const router = useRouter();
    const {owner} = router.query;

    const data = [
        {
            id: 1,
            slug: "/",
            icon: <IoLocationSharp />,
            name: "Address",
            description: "House 62, Road 03, Block B, Niketan, Gulshan-01, Dhaka-1212, Bangladesh",
        },
        {
            id: 2,
            slug: "/",
            icon: <IoMail />,
            name: "Email",
            description: "support@unishopr.com",
        },
        {
            id: 3,
            slug: "/",
            icon: <IoCallSharp />,
            name: "Phone",
            description: "Support: +880 1739014086 (11 am to 7 pm)",
        },
    ];

    const ownerData = [
        {
            id: 1,
            slug: "/",
            icon: <IoLocationSharp />,
            name: "Address",
            description: "1/C-4, Pallabi, Mirpur 12 City: Dhaka, Postal: 1216, Country: Bangladesh",
        },
        {
            id: 2,
            slug: "/",
            icon: <IoMail />,
            name: "Email",
            description: "unishopr.purchase@gmail.com ",
        },
        {
            id: 3,
            slug: "/",
            icon: <IoCallSharp />,
            name: "Phone",
            description: "+880 1308 986 610 ",
        },
    ];

    return (
        <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
            <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
                {("Find us here")}
            </h4>
            {data?.map((item: any) => (
                <div key={`contact--key${item.id}`} className="flex pb-7">
                    <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                        {item.icon}
                    </div>
                    <div className="flex flex-col ps-3 2xl:ps-4">
                        <h5 className="text-sm font-bold text-heading">
                            {(`${item.name}`)}
                        </h5>
                        <Link href={item.slug} className="text-sm mt-0">
                            {(`${item.description}`)}
                        </Link>
                    </div>
                </div>
            ))}
            {typeof owner === "string" ? (
                <Fragment>
                    <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
                        {("Owner")}
                    </h4>
                    {ownerData.map((item: any) => (
                        <div key={`contact--key${item.id}`} className="flex pb-7">
                            <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
                                {item.icon}
                            </div>
                            <div className="flex flex-col ps-3 2xl:ps-4">
                                <h5 className="text-sm font-bold text-heading">
                                    {(`${item.name}`)}
                                </h5>
                                <Link href={item.slug} className="text-sm mt-0">
                                    {(`${item.description}`)}
                                </Link>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ) : null}
            <img src={mapImage} alt={("Map-Image")} className="rounded-md" />
        </div>
    );
};

export default ContactInfoBlock;
