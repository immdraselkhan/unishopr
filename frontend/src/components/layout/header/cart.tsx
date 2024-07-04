import Scrollbar from "@components/common/scrollbar";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
// import CartItem from "./cart-item";
import Link from "@components/ui/link";
import cn from "classnames";
import EmptyCart from "@components/ui/empty-cart";
import {FC} from "react";
import {zoomOutIn} from "@utils/motion/zoom-out-in";
import {Carts, localCountry, removeLocalCart} from "@utils/auth";
import {Constants} from "@utils/constants";

const Cart: FC<{
	cart: Carts,
	total: number,
	onClose: () => void
}> = ({onClose, cart, total}) => {
	const country = localCountry();

	return (
		<motion.div
			initial="from"
			animate="to"
			exit="from"
			variants={zoomOutIn()}
		>
			<div className="flex flex-col w-full h-full justify-between">
				<div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
					<h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
						Shopping Cart
					</h2>
					<button
						className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
						onClick={onClose}
						aria-label="close"
					>
						<IoClose className="text-black mt-1 md:mt-0.5" />
					</button>
				</div>
				{cart.length ? (
					<Scrollbar className="cart-scrollbar w-full flex-grow">
						<div className="w-full px-5 md:px-7">
							{cart.map((loopData, li) => (
								<motion.div
									key={li}
									layout
									initial="from"
									animate="to"
									exit="from"
									variants={fadeInOut(0.25)}
									className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
									title={"title"}
								>
									<div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
										{loopData.type === "lead" && <img src={loopData?.thumbnail ? loopData.thumbnail : "/assets/placeholder/order-product.svg"} alt=""/>}
										{loopData.type === "shop" && <img src={loopData?.thumbnail ? Constants.S3_BASE_URL(loopData.thumbnail) : "/assets/placeholder/order-product.svg"} alt=""/>}
										<div
											className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
											onClick={() => removeLocalCart({_id: loopData._id})}
											role="button"
										>
											<IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
										</div>
									</div>

									<div className="w-full overflow-hidden">
										<div className="flex">
											<span className="truncate text-sm text-heading mb-1.5 -mt-1">
												{loopData.name}
											</span>
											<span className="text-xs mb-2 ms-auto">
												{country?.currencySymbol}&nbsp;{loopData.price}&nbsp;x{loopData.quantity}
											</span>
										</div>

										{loopData.extra?.map((extraData, ei) => (
											<div className="flex" key={ei}>
												<h6 className="text-xs ps-3 font-regular">
													+ {extraData.name}
												</h6>
												<div className="flex ms-auto text-xs ps-2 flex-shrink-0">
													{country?.currencySymbol}&nbsp;{extraData.value}
												</div>
											</div>
										))}

										{loopData.additional?.map((additionalData, ai) => (
											<div className="flex" key={ai}>
												<h6 className="text-xs ps-3 font-regular">
													+ {additionalData.name}
												</h6>
												<div className="flex ms-auto text-xs ps-2 flex-shrink-0">
													{country?.currencySymbol}&nbsp;{additionalData.value}
												</div>
											</div>
										))}

										{loopData.attributes?.map((attribute, ai) => (
											<div className="flex" key={ai}>
												<h6 className="text-xs ps-3 font-regular">
													+ {attribute.option}
												</h6>
												<div className="flex ms-auto text-xs ps-2 flex-shrink-0">
													{country?.currencySymbol}&nbsp;{attribute.price}
												</div>
											</div>
										))}

										<div className="flex items-end justify-between mt-2.5">
											<span className="truncate md:text-base text-sm text-heading mb-1.5 -mt-1 font-semibold">
												Total
											</span>
											<span className="text-sm md:text-base text-heading mb-2 ms-auto font-semibold">
												{country?.currencySymbol}&nbsp;{loopData.total}
											</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</Scrollbar>
				) : (
					<motion.div
						layout
						initial="from"
						animate="to"
						exit="from"
						variants={fadeInOut(0.25)}
						className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
					>
						<EmptyCart />
						<h3 className="text-lg text-heading font-bold pt-8">
							Empty cart
						</h3>
					</motion.div>
				)}

				<div
					className="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7"
					onClick={onClose}
				>
					<Link
						href={cart.length ? "/account/checkout ": "/"}
						className={cn(
							"w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
							{
								"cursor-not-allowed bg-gray-400 hover:bg-gray-400": !cart.length,
							}
						)}
					>
					<span className="w-full pe-5 -mt-0.5 py-0.5">
						Check Out
					</span>
						<span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
						<span className="border-s border-white pe-5 py-0.5" />
							{country?.currencySymbol}&nbsp;{total}
					</span>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

export default Cart;
