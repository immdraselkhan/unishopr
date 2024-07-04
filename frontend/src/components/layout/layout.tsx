import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
// import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useLogOutMutation, useRenewMutation } from "@redux/services/auth/api";
import { Constants } from "@utils/constants";
import Preloader from "@components/ui/preloader";
import { Carts, localCountry, setLocalCart, setLocalStorageCountry, userInfo } from "@utils/auth";
import { useLeadsQuery } from "@redux/services/order/api";
import { useCountriesQuery } from "@redux/services/utilities/api";
import { Facebook1 } from "@components/Facebook";
import Head from 'next/head';
import thumbnailImage from '@public/assets/images/og-image.jpg'

const Layout: FC = ({ children }) => {
	const user = userInfo();
	const country = localCountry();
	const countries = useCountriesQuery("");
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const [loader, setLoader] = useState(false)
	const [render, setRender] = useState(false)

	const leads = useLeadsQuery({ status: "checkout" }, { skip: !user?._id });
	const additionalLeads = useLeadsQuery({ status: "additional" }, { skip: !user?._id });
	const [logOut] = useLogOutMutation();
	const [renew] = useRenewMutation();
	useEffect(() => validateAuth(), [])

	useEffect(() => {
		if (country && countries?.data?.data?.length) {
			const liveCountry = countries.data.data.find((item) => item._id === country._id);
			if (liveCountry?.currencyFromDollar && liveCountry.currencyFromDollar !== country.currencyFromDollar) {
				const fetchData = async () => await setLocalStorageCountry(liveCountry);
				fetchData().then(r => { });
			}
		}
	}, [country, countries.data])

	const validateAuth = () => {
		const access = localStorage.getItem(Constants.ACCESS_TOKEN)
		const refresh = localStorage.getItem(Constants.REFRESH_TOKEN)

		if (access && refresh) {
			const accessToken: { expires: string, token: string } = JSON.parse(access)
			const refreshToken: { expires: string, token: string } = JSON.parse(refresh)

			if (new Date(accessToken.expires) < new Date()) {
				if (new Date(refreshToken.expires) < new Date()) {
					logOut({ action: () => setRender(true) })
				} else {
					setLoader(true)
					renew({
						body: { access: accessToken.token, refresh: refreshToken.token },
						logout: () => logOut({ action: () => setRender(true) }),
						render: () => setRender(true)
					})
				}
			} else setRender(true)
		} else setRender(true)
	}

	useEffect(() => {
		const cart = [];

		const fetchData = async () => {
			if (leads.data) {
				for (let i = 0; i < leads.data.data.length; i++) {
					const lead = leads.data.data[i];
					await setLocalCart({
						leadId: lead._id,
						_id: lead._id,
						type: "lead",
						name: lead.name,
						price: lead.price,
						thumbnail: lead.photo,
						quantity: lead.quantity,
						total: lead.checkout.totalAmount,
						extra: lead.checkout.attributes
					})
				}
			}
		};
		fetchData().then(r => { });
	}, [leads.data])

	useEffect(() => {
		const cart = [];

		const fetchData = async () => {
			if (additionalLeads.data) {
				for (let i = 0; i < additionalLeads.data.data.length; i++) {
					const lead = additionalLeads.data.data[i];
					const additional = [] as { name: string, value: number }[];
					lead.checkout.additional.forEach((data) => (!data.isPaid) ? data.attributes.forEach((attr) => additional.push({ name: attr.name, value: attr.value })) : null)
					if (additional.length) await setLocalCart({
						leadId: lead._id,
						_id: lead._id,
						type: "lead",
						name: lead.name,
						price: 0,
						thumbnail: lead.photo,
						quantity: lead.quantity,
						total: additional.reduce((n, { value }) => n + value, 0),
						additional
					})
				}
			}
		};
		fetchData().then(r => { });
	}, [additionalLeads.data])

	const [cart, setCart] = useState<Carts>([])
	const [total, setTotal] = useState({ subTotal: 0, grandTotal: 0 });

	const localCartChanged = () => {
		console.log("localCartChanged")
		const localCart: any = typeof window !== "undefined" ? localStorage.getItem(Constants.LOCAL_CART) : null;
		const cart = JSON.parse(localCart);

		if (localCart && cart) {
			let total = 0;
			cart.forEach((data: { total: number }) => total += data.total)
			setTotal({ subTotal: total, grandTotal: total })
			setCart(cart)
		}
	}

	useEffect(() => {
		localCartChanged()
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			{render ? (
				<Fragment>
					<Preloader loading={loader} />
					<Header cart={cart} total={total} />
					<main
						className="relative flex-grow"
						style={{
							minHeight: "-webkit-fill-available",
							WebkitOverflowScrolling: "touch",
						}}
					>
						{children}
					</main>
					<Footer />
					{/* <Facebook1 /> */}
					<MobileNavigation cart={cart} total={total} />
					{/*<Search />*/}
					<CookieBar
						title={"This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."}
						hide={acceptedCookies}
						action={
							<Button onClick={() => onAcceptCookies()} variant="slim">
								Accept Cookies
							</Button>
						}
					/>
				</Fragment>
			) : 'Loading...'}

			<div className="hidden" id="hidden-set-loader-true" onClick={() => setLoader(true)} />
			<div className="hidden" id="hidden-set-loader-false" onClick={() => setLoader(false)} />
			<div className="hidden" id="hidden-cart-div" onClick={localCartChanged} />
		</div>
	);
};

export default Layout;