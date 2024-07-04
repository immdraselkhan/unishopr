import Link from "@components/ui/link";
import UserIcon from "@components/icons/user-icon";
import MenuIcon from "@components/icons/menu-icon";
import HomeIcon from "@components/icons/home-icon"
import React, { FC, Fragment, useEffect, useState } from "react";
import CartIcon from "@components/icons/cart-icon";
import { Carts, localCountry, userInfo } from "@utils/auth";
import Drawer from "@components/common/drawer/drawer";
import Cart from "@components/layout/header/cart";
import MobileMenu from "@components/layout/header/mobile-menu";
import LoginForm from "@containers/auth/login-form";
import Modal from "@components/common/modal/modal";
import { useRouter } from "next/router";
import { useNotificationsQuery, useUpdateNotificationsMutation } from "@redux/services/landing/api";
import { RiNotification3Line } from "react-icons/ri";

const BottomNavigation: FC<{ total: { grandTotal: number }, cart: Carts }> = ({ total, cart }) => {
	const router = useRouter();
	const { auth, redirect } = router.query;
	const user = userInfo();
	const country = localCountry();
	const notifications = useNotificationsQuery(user._id as string, { skip: typeof user._id !== "string" });
	const [updateNotifications, updateNotificationsParams] = useUpdateNotificationsMutation();
	const [authModal, setAuthModal] = useState(false);
	const [cartDrawer, setCartDrawer] = useState(false);
	const [navDrawer, setNavDrawer] = useState(false);
	const [profileDrawer, setProfileDrawer] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	// useEffect(() => {
	// 	if (auth && auth === 'signIn') setAuthModal(!authModal)
	// }, [auth])

	return (
		<Fragment>
			<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4">
				<button
					aria-label="Menu"
					className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
					onClick={() => setNavDrawer(true)}
				>
					<MenuIcon />
				</button>

				<Link href="/" className="flex-shrink-0">
					<HomeIcon />
				</Link>

				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
					onClick={() => {
						setShowNotifications(!showNotifications);
						updateNotifications({
							data: {
								userId: user._id,
							}
						});
					}}
					aria-label="cart-button"
				>
					<RiNotification3Line className="text-2xl" />
					<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2 xl:-top-2 -end-2 xl:-end-2 rounded-full font-bold">
						{notifications?.data?.data.filter((data: any) => data.status === 'sent').length || 0}
					</span>

					{showNotifications && (
						<div className="absolute bottom-12 z-10 w-auto bg-gray-200 shadow-md mt-2 pt-5 pb-3 rounded-md max-h-[30rem]" style={{ overflowY: 'auto' }}>
							{notifications?.data?.data?.slice(0, 5).map((data: any) => (
								<div className="px-5">
									{data.status === "sent" ?
										<div className="bg-white p-4 mb-2 rounded-md font-bold">
											<p className="font-sans text-base text-black text-left">{data.title}</p>
											<p className="font-sans text-sm text-gray-600 text-left">{data.description}</p>
										</div>
										: <div className="bg-white p-4 mb-2 rounded-md">
											<p className="font-sans text-base text-black text-left">{data.title}</p>
											<p className="font-sans text-sm text-gray-600 text-left">{data.description}</p>
										</div>}
								</div>
							))}
						</div>
					)}
				</button>

				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
					onClick={() => setCartDrawer(true)}
					aria-label="cart-button"
				>
					<CartIcon />
					<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
						{cart.length}
					</span>
				</button>

				<button
					className="flex-shrink-0"
					onClick={() => {
						if (user && user._id && user._id !== "") setProfileDrawer(true)
						else setAuthModal(true)
					}}
				>
					<UserIcon />
				</button>
			</div>

			<Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
				<LoginForm action={() => {
					setAuthModal(false);
					if (redirect && typeof redirect === "string") router.push(redirect)
				}} />
			</Modal>

			{profileDrawer ? (
				<Drawer
					open={profileDrawer}
					onClose={() => setProfileDrawer(false)}
				>
					<MobileMenu profile={true} onClose={() => setProfileDrawer(false)} />
				</Drawer>
			) : null}

			{navDrawer ? (
				<Drawer
					open={navDrawer}
					onClose={() => setNavDrawer(false)}
				>
					<MobileMenu profile={false} onClose={() => setNavDrawer(false)} />
				</Drawer>
			) : null}

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
		</Fragment>
	);
};

export default BottomNavigation;
