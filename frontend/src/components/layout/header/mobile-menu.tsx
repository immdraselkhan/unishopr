import {FC, useState} from "react";
import Link from "@components/ui/link";
import Scrollbar from "@components/common/scrollbar";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "@components/ui/logo";
import {
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoFacebook,
	IoLogoYoutube,
	IoClose,
} from "react-icons/io5";
import { motion } from "framer-motion";
import {zoomOutIn} from "@utils/motion/zoom-out-in";
import {useCategoryTreeMobileQuery} from "@redux/services/utilities/api";
import {useLogOutMutation} from "@redux/services/auth/api";
import {useRouter} from "next/router";

const social = [
	{
		id: 0,
		link: "https://www.facebook.com/redqinc/",
		icon: <IoLogoFacebook />,
		className: "facebook",
		title: "text-facebook",
	},
	{
		id: 1,
		link: "https://twitter.com/redqinc",
		icon: <IoLogoTwitter />,
		className: "twitter",
		title: "text-twitter",
	},
	{
		id: 2,
		link: "https://www.youtube.com/@unishoprinc.6657",
		icon: <IoLogoYoutube />,
		className: "youtube",
		title: "text-youtube",
	},
	{
		id: 3,
		link: "https://www.instagram.com/redqinc/",
		icon: <IoLogoInstagram />,
		className: "instagram",
		title: "text-instagram",
	},
];

const MobileMenu: FC<{onClose: () => void, profile: boolean}> = ({onClose, profile}) => {
	const router = useRouter();
	const categories = useCategoryTreeMobileQuery("", {skip: profile});
	const [logOut] = useLogOutMutation()

	const signOut = (e: any) => {
		e.preventDefault();
		logOut({action: () => router.push("/")})
	}

	const [activeMenus, setActiveMenus] = useState<any>([]);
	const handleArrowClick = (menuName: string) => {
		let newActiveMenus = [...activeMenus];

		if (newActiveMenus.includes(menuName)) {
			var index = newActiveMenus.indexOf(menuName);
			if (index > -1) {
				newActiveMenus.splice(index, 1);
			}
		} else {
			newActiveMenus.push(menuName);
		}

		setActiveMenus(newActiveMenus);
	};

	const ListMenu = ({
		dept,
		data,
		hasSubMenu,
		menuName,
		menuIndex,
		className = "",
	}: any) =>
		data.label && (
			<li className={`mb-0.5 ${className}`}>
				<div className="flex items-center justify-between relative">
					<Link
						href={data.path}
						className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
					>
						<span className="block w-full" onClick={onClose}>
							{data.label}
						</span>
					</Link>
					{hasSubMenu && (
						<div
							className="cursor-pointer w-full h-full text-lg flex items-center justify-end absolute start-0 top-0 pe-5"
							onClick={() => handleArrowClick(menuName)}
						>
							<IoIosArrowDown
								className={`transition duration-200 ease-in-out transform text-heading ${
									activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
								}`}
							/>
						</div>
					)}
				</div>
				{hasSubMenu && (
					<SubMenu
						dept={dept}
						data={data.subMenu}
						toggle={activeMenus.includes(menuName)}
						menuIndex={menuIndex}
					/>
				)}
			</li>
		);

	const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
		if (!toggle) {
			return null;
		}

		dept = dept + 1;

		return (
			<ul className="pt-0.5">
				{data?.map((menu: any, index: number) => {
					const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

					return (
						<ListMenu
							dept={dept}
							data={menu}
							hasSubMenu={menu.subMenu}
							menuName={menuName}
							key={menuName}
							menuIndex={index}
							className={dept > 1 && "ps-4"}
						/>
					);
				})}
			</ul>
		);
	};

	return (
		<motion.div
			initial="from"
			animate="to"
			exit="from"
			variants={zoomOutIn()}
		>
			<div className="flex flex-col justify-between w-full h-full">
				<div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
					<Logo />

					<button
						className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
						onClick={onClose}
						aria-label="close"
					>
						<IoClose className="text-black mt-1 md:mt-0.5" />
					</button>
				</div>

				<Scrollbar className="menu-scrollbar flex-grow mb-auto">
					<div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
						{profile ? (
							<ul className="mobileMenu">
								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/account/profile"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
											<span className="block w-full" onClick={onClose}>
												Profile
											</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/account/orders"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
											<span className="block w-full" onClick={onClose}>
												Orders
											</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/account/travels"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
											<span className="block w-full" onClick={onClose}>
												Travels
											</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/account/payments"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
											<span className="block w-full" onClick={onClose}>
												Payments
											</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
											onClick={signOut}
										>
											<span className="block w-full" onClick={onClose}>
												Logout
											</span>
										</Link>
									</div>
								</li>
							</ul>
						) : (
							<ul className="mobileMenu">
								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
										<span className="block w-full" onClick={onClose}>
											Home
										</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/order"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
										<span className="block w-full" onClick={onClose}>
											Order
										</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/travel"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
										<span className="block w-full" onClick={onClose}>
											Travel
										</span>
										</Link>
									</div>
								</li>

								<li className={`mb-0.5`}>
									<div className="flex items-center justify-between relative">
										<Link
											href={"/products"}
											className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
										>
										<span className="block w-full" onClick={onClose}>
											Shop
										</span>
										</Link>
										<div
											className="cursor-pointer w-full h-full text-lg flex items-center justify-end absolute start-0 top-0 pe-5"
											onClick={() => handleArrowClick("shop")}
										>
											<IoIosArrowDown
												className={`transition duration-200 ease-in-out transform text-heading ${
													activeMenus.includes("shop") ? "-rotate-180" : "rotate-0"
												}`}
											/>
										</div>
									</div>
									{categories.data?.data.length && (
										<SubMenu
											dept={1}
											data={categories.data.data}
											toggle={activeMenus.includes("shop")}
											menuIndex={1}
										/>
									)}
								</li>
							</ul>
						)}
					</div>
				</Scrollbar>

				<div className="flex items-center justify-center bg-white border-t border-gray-100 px-7 flex-shrink-0 space-s-1">
					{social?.map((item, index) => (
						<a
							href={item.link}
							className={`text-heading p-5 opacity-60 first:-ms-4 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
							target="_blank"
							key={index}
						>
							<span className="sr-only">{item.title}</span>
							{item.icon}
						</a>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default MobileMenu;
