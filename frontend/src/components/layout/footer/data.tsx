import {
	IoLogoInstagram,
	IoLogoLinkedin,
	IoLogoFacebook,
	IoLogoYoutube,
} from "react-icons/io5";

export const footer = {
	widgets: [
		{
			id: 1,
			widgetTitle: "Social",
			lists: [
				{
					id: 1,
					title: "Instagram",
					path: "https://www.instagram.com/unishopr_com/",
					icon: <IoLogoInstagram />,
				},
				{
					id: 2,
					title: "Linkedin",
					path: "https://www.linkedin.com/company/unishopr-bangladesh/about/",
					icon: <IoLogoLinkedin />,
				},
				{
					id: 3,
					title: "Facebook",
					path: "https://www.facebook.com/unishopr/",
					icon: <IoLogoFacebook />,
				},
				{
					id: 4,
					title: "Youtube",
					path: "https://www.youtube.com/@unishoprinc.6657",
					icon: <IoLogoYoutube />,
				},
			],
		},
		{
			id: 2,
			widgetTitle: "Contact",
			lists: [
				{
					id: 1,
					title: "Contact Us",
					path: "/about/contact-us",
					icon: "",
				},
				{
					id: 2,
					title: "support@unishopr.com",
					path: "/",
					icon: "",
				},
				{
					id: 3,
					title: "unishopr.social@gmail.com",
					path: "/",
					icon: "",
				},
				{
					id: 4,
					title: "Call us: +880 1739014086 ",
					path: "/",
					icon: "",
				},
			],
		},
		{
			id: 3,
			widgetTitle: "About",
			lists: [
				{
					id: 1,
					title: "About Us",
					path: "/about/about-us",
					icon: "",
				},
				{
					id: 2,
					title: "Unishopr For Business",
					path: "/about/business",
					icon: "",
				},
			],
		},
		// {
		// 	id: 4,
		// 	widgetTitle: "Customer Care",
		// 	lists: [
		// 		{
		// 			id: 1,
		// 			title: "FAQ & Helps",
		// 			path: "/about/faq",
		// 			icon: "",
		// 		},
		// 		{
		// 			id: 2,
		// 			title: "Shipping & Delivery",
		// 			path: "/",
		// 			icon: "",
		// 		},
		// 		{
		// 			id: 3,
		// 			title: "Return & Exchanges",
		// 			path: "/",
		// 			icon: "",
		// 		},
		// 		{
		// 			id: 4,
		// 			title: "Terms & conditions",
		// 			path: "/about/terms",
		// 			icon: "",
		// 		},
		// 	],
		// },
		{
			id: 5,
			widgetTitle: "Our Policies",
			lists: [
				{
					id: 1,
					title: "Order policy",
					path: "/about/order-policy",
					icon: "",
				},
				{
					id: 2,
					title: "Traveling Policy",
					path: "/about/traveling-policy",
					icon: "",
				},
				{
					id: 3,
					title: "Purchase Policy",
					path: "/about/purchase-policy",
					icon: "",
				},
			],
		},
	],
	payment: [
		{
			id: 1,
			path: "/",
			image: "/assets/images/payment/mastercard.svg",
			name: "payment-master-card",
			width: 34,
			height: 20,
		},
		{
			id: 2,
			path: "/",
			image: "/assets/images/payment/visa.svg",
			name: "payment-visa",
			width: 50,
			height: 20,
		},
		{
			id: 3,
			path: "/",
			image: "/assets/images/payment/paypal.svg",
			name: "payment-paypal",
			width: 76,
			height: 20,
		},
		{
			id: 4,
			path: "/",
			image: "/assets/images/payment/jcb.svg",
			name: "payment-jcb",
			width: 26,
			height: 20,
		},
		{
			id: 5,
			path: "/",
			image: "/assets/images/payment/skrill.svg",
			name: "payment-skrill",
			width: 39,
			height: 20,
		},
	],
};
