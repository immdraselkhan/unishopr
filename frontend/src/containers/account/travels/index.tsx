import { FC, Fragment, useState } from "react";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useTravelsQuery } from "@redux/services/travel/api";
import Modal from "@components/common/modal/modal";
import TravelInvoice from "@containers/account/travels/travel-invoice";
import {TravelRes} from "@redux/services/travel/type";
import {shortDate} from "@utils/utilities";

const Travels = () => {
	const travels = useTravelsQuery("", {refetchOnMountOrArgChange: true});
	const [travelModal, setTravelModal] = useState<{show: boolean, travel: TravelRes | null}>({ show: false, travel: null });

	return (
		<Fragment>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				<table>
					<thead className="text-sm lg:text-base">
						<tr>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
								Id
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								From
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								To
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								Capacity
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								Loaded
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								Date
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
								Status
							</th>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="text-sm lg:text-base">
						{/* @ts-ignore */}
						{travels?.data?.data?.map(travel => {
							return (
								<tr key={travel._id} className="border-b border-gray-300 last:border-b-0">
									<td className="px-4 py-5 text-start underline hover:no-underline text-body">
										{travel.travelId}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{travel.route.from.name}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{travel.route.to.name}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{travel.weight.capacity} KG
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{travel.weight.loaded} KG
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{shortDate(travel.travelDate)}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{travel.status}
									</td>
									<td className="text-end px-4 py-5 text-heading">
										<button
											className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
											onClick={() => setTravelModal({show: true, travel})}
										>
											view
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</motion.div>
			<Modal open={travelModal.show} onClose={() => setTravelModal({ show: false, travel: null })}>
				{travelModal.travel ? (<TravelInvoice travel={travelModal.travel} />) : null}
			</Modal>
		</Fragment>
	);
}

export default Travels;
