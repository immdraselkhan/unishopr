import React, { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { HiOutlineSelector } from "react-icons/hi";
import { addActiveScroll } from "@utils/add-active-scroll";
import { useCountriesQuery } from "@redux/services/utilities/api";
import { Constants } from "@utils/constants";
import { setLocalStorageCountry, localCountry, userInfo, setLocalCart, Carts } from "@utils/auth";
import LoginForm from "@containers/auth/login-form";
import Modal from "@components/common/modal/modal";
import CountryForm from "@containers/auth/country-form";
import classNames from "classnames";
import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import { RiNotification3Line } from "react-icons/ri";
import MegaMenu from "@components/ui/mega-menu";
import { useLogOutMutation } from "@redux/services/auth/api";
import { useRouter } from "next/router";
import CartIcon from "@components/icons/cart-icon";
import Drawer from "@components/common/drawer/drawer";
import Cart from "@components/layout/header/cart";
import { useLeadsQuery } from "@redux/services/order/api";
import { useNotificationsQuery, useUpdateNotificationsMutation } from "@redux/services/landing/api";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC<{ total: { grandTotal: number }, cart: Carts }> = ({ total, cart }) => {
	const siteHeaderRef = useRef() as DivElementRef;
	addActiveScroll(siteHeaderRef);
	const country = localCountry();
	const countries = useCountriesQuery("");
	const [updateNotifications, updateNotificationsParams] = useUpdateNotificationsMutation();
	const [authModal, setAuthModal] = useState(false);
	const [countryModal, setCountryModal] = useState(false);
	const [cartDrawer, setCartDrawer] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	const router = useRouter();
	const { auth, redirect } = router.query;
	const user = userInfo();
	const [logOut] = useLogOutMutation()

	const notifications = useNotificationsQuery("", {skip: user._id == "" });

	function detectURLs(text:string) {
		if(!text) return;
		let url = text.match(/\bhttps?:\/\/\S+/gi)
		console.log(typeof url)
		// @ts-ignore
		return url[0];
	}

	// useEffect(() => {
	// 	if (auth && auth === 'signIn') setAuthModal(!authModal)
	// }, [auth])

	useEffect(() => {
		if (!country) setCountryModal(true);
	}, [country])

	const signOut = (e: any) => {
		e.preventDefault();
		logOut({ action: () => router.push("/") })
	}

	// @ts-ignore
	// @ts-ignore
	return (
		<header
			id="siteHeader"
			ref={siteHeaderRef}
			className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
		>
			<div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
				<div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
					<button
						aria-label="Menu"
						className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
						onClick={() => console.log("clicked")}
					>
						<span className="menuIcon">
							<span className="bar" />
							<span className="bar" />
							<span className="bar" />
						</span>
					</button>
					<Logo />

					<HeaderMenu
						data={site_header.menu}
						className="hidden lg:flex md:ms-6 xl:ms-10"
					/>

					<div className="flex-shrink-0 ms-auto lg:me-5 xl:me-8 2xl:me-10">
						<Listbox
							value={{
								_id: country?._id,
								name: country?.name,
								value: country?._id,
								icon: country?.flag,
							}}
							onChange={async (event) => {
								const country = countries.data?.data.find((item) => item._id === event.toString())
								if (country) await setLocalStorageCountry(country)
							}}
						>
							{({ open }) => (
								<div className="relative ms-2 lg:ms-0 z-10 w-[140px] sm:w-[150px] lg:w-[130px] xl:w-[150px]">
									<Listbox.Button className="border border-gray-300 text-heading text-[13px] xl:text-sm font-semibold  relative w-full py-2 ps-3 pe-7 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer">
										{country?._id ? (
											<span className="flex truncate items-center">
												<span className="me-1.5">
													<img width={20} src={Constants.S3_BASE_URL(country?.flag)} alt="" />
												</span>
												{country?.name}
											</span>
										) : (
											<span className="flex truncate items-center">
												Select Country
											</span>
										)}
										<span className="absolute inset-y-0 end-0 flex items-center pe-1.5 pointer-events-none">
											<HiOutlineSelector
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										show={open}
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options
											static
											className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
										>
											{countries.data?.data.map(country => {
												return (
													<Listbox.Option
														key={country._id}
														className={({ active }) => `${active ? "text-amber-900 bg-gray-100" : "text-gray-900"} cursor-pointer select-none relative py-2 px-3`}
														value={country._id}
													>
														{({ selected, active }) => (
															<span className="flex items-center">
																<img width={20} src={Constants.S3_BASE_URL(country.flag)} alt="" />
																<span className={`${selected ? "font-medium" : "font-normal"} block truncate ms-1.5`}>
																	{country.name}
																</span>
																{selected ? (<span className={`${active && "text-amber-600"} absolute inset-y-0 start-0 flex items-center ps-3`} />) : null}
															</span>
														)}
													</Listbox.Option>
												)
											})}
										</Listbox.Options>
									</Transition>
								</div>
							)}
						</Listbox>
					</div>
					<div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
						<div className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform">
						<button
							className="" onClick={() => {
								setShowNotifications(!showNotifications);
							}}
							aria-label="cart-button"
						>
							<RiNotification3Line className="text-2xl" />
							<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2 xl:-top-2 -end-2 xl:-end-2 rounded-full font-bold">
								{notifications?.data?.data.filter((data: any) => data.status === 'sent').length || 0}
							</span>
						</button>
							{showNotifications && (
								<div className="absolute top-14 z-10 w-auto bg-gray-200 shadow-md pt-5 pb-3 rounded-md max-h-screen" style={{ overflowY: 'auto' }}>
									{notifications?.data?.data?.slice(0, 3).map((data: any) => (
										<div className="px-5">
											{data.status === "sent" ?
												<div className="bg-white p-4 mb-2 rounded-md font-bold">
													<p className="font-sans text-sm text-blue-500 text-left">{data.title}</p>
													<Link href={detectURLs(data.description)?? ""}
													  	onClick={()=>{
															updateNotifications({
																data: {
																	userId: user._id,
																}
															});
															}}
														  className="font-sans text-sm text-blue-600 text-left"
													>
														<a className="text-blue-600" href={detectURLs(data.description)} target="_blank" rel="noopener noreferrer">
															{data.description}
														</a>
													</Link>
												</div>
												: <div className="bg-white p-4 mb-2 rounded-md">
													<p className="font-sans text-base text-black text-left">{data.title}</p>
													<p className="font-sans text-sm text-gray-400 text-left ">
														<Link href={detectURLs(data.description)?? ""}
															  onClick={()=>{
																  updateNotifications({
																	  data: {
																		  userId: user._id,
																	  }
																  });
															  }}
															  className="font-sans text-sm text-gray-400 text-left"
														>
															<a className="text-blue-600" href={detectURLs(data.description)} target="_blank" rel="noopener noreferrer">
																{data.description}
															</a>
														</Link>
													</p>
												</div>}
										</div>
									))}
								</div>
							)}
						</div>

						<button
							className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
							onClick={() => {
								setCartDrawer(true);
							}}
							// 
							aria-label="cart-button"
						>
							<CartIcon />
							<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
								{cart.length}
							</span>
						</button>

						{user && user._id && user._id !== "" ? (
							<nav className={classNames(`headerMenu flex w-full relative hidden lg:flex md:ms-6 xl:ms-10`)}>
								<div className={`menuItem group cursor-pointer py-7`}>
									<Link
										href={"/"}
										className="inline-flex items-center text-sm sm:text-base text-heading px-3 xl:px-4 py-2 font-bold relative group-hover:text-black underline hover:no-underline"
									>
										{`${user.firstName} ${user.lastName}`}
										<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
											<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
										</span>
									</Link>
									<div className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
										<ul className="text-body text-sm py-5">
											<li className="relative">
												<Link
													href={"/account/profile"}
													className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
												>
													Profile
												</Link>
											</li>
											<li className="relative">
												<Link
													href={"/account/orders/pending"}
													className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
												>
													Orders
												</Link>
											</li>
											<li className="relative">
												<Link
													href={"/account/travels"}
													className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
												>
													Travels
												</Link>
											</li>
											<li className="relative">
												<Link
													href={"/account/payments"}
													className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
												>
													Payments
												</Link>
											</li>
											<li className="relative">
												<Link
													href={"/"}
													onClick={signOut}
													className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
												>
													Logout
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</nav>
						) : (
							<div className="-mt-0.5 flex-shrink-0">
								<button
									type="button"
									className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
									onClick={() => setAuthModal(true)}
								>
									Sign In
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
				<LoginForm action={() => {
					setAuthModal(false);
					if (redirect && typeof redirect === "string") router.push(redirect)
				}} />
			</Modal>

			<Modal
				open={countryModal}
			// onClose={() => setCountryModal(!countryModal)}
			>
				<CountryForm action={() => setCountryModal(false)} />
			</Modal>

			{cartDrawer ? (
				<Drawer
					open={cartDrawer}
					onClose={() => setCartDrawer(false)}
				>
					<Cart
						cart={cart}
						total={total.grandTotal}
						onClose={() => setCartDrawer(false)}
					/>
				</Drawer>
			) : null}
		</header>
	);
};

export default Header;
