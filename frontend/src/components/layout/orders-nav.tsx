import Link from "next/link";
import { useRouter } from "next/router";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {IoCartOutline} from "react-icons/io5";
import {BsCartCheck} from "react-icons/bs";
import {MdOutlineCancel} from "react-icons/md";
import {GiCommercialAirplane} from "react-icons/gi";

const ordersMenu = [
	{
		slug: "/account/orders/pending",
		name: "Requests",
		icon: <IoCartOutline className="w-5 h-5" />,
	},
	{
		slug: "/account/orders",
		name: "Orders",
		icon: <IoPaperPlaneOutline className="w-5 h-5"/>,
	},
	{
		slug: "/account/orders/in-transit",
		name: "In transit",
		icon: <GiCommercialAirplane className="w-5 h-5"/>,
	},
	{
		slug: "/account/orders/received",
		name: "Received",
		icon: <BsCartCheck className="w-5 h-5"/>,
	},
	{
		slug: "/account/orders/cancelled",
		name: "Cancelled",
		icon: <MdOutlineCancel className="w-5 h-5"/>,
	},
];

export default function OrdersNav() {
	const { pathname} = useRouter();
	const newPathname = pathname.split("/").slice(2, 4);
	const mainPath = `/${newPathname[1]}`;

	return (
		<nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
			{ordersMenu.map((item) => {
				const menuPathname = item.slug.split("/").slice(2, 4);
				const menuPath = `/${menuPathname[1]}`;

				return (
					<Link key={item.slug} href={item.slug}>
						<a
							className={
								mainPath === menuPath
									? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
									: "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
							}
						>
							{item.icon}
							<span className="ps-2 ">{item.name}</span>
						</a>
					</Link>
				);
			})}
		</nav>
	);
}
