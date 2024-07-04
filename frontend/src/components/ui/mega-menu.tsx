import React, { useState } from "react";
import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";

interface MenuItem {
	_id: number | string;
	path: string;
	label: string;
	columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
	columns: {
		_id: number | string;
		columnItems: MenuItem[];
	}[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
	const [dropdown, setDropdown] = useState({
		key: "",
		show: false
	});

	return (
		<div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
			<div className="grid grid-cols-5">
				{columns?.map((column) => (
					<ul
						className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
						key={column._id}
					>
						{column?.columnItems?.map((columnItem) => (
							<React.Fragment key={columnItem._id}>
								<li
									className="mb-1.5"
									onClick={() => {
										setDropdown(
											{
												key: typeof (columnItem._id) === "string" ? columnItem._id : "",
												show: !dropdown.show
											}
										);
									}}
								>
									<Link
										href={columnItem.path}
										className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
									>
										<span className="flex justify-between items-center">
											<span>
												{columnItem.label}
											</span>
											{columnItem?.columnItemItems?.length !== 0 && <span>
												{dropdown.show && dropdown.key === columnItem._id ? <FaChevronDown className="rotate-180" /> : <FaChevronDown />}
											</span>}
										</span>
									</Link>
								</li>
								{dropdown.show && dropdown.key === columnItem._id && columnItem?.columnItemItems?.map((item: any) => (
									<li
										key={item._id}
										className={
											columnItem?.columnItemItems?.length === item.id
												? "border-b border-gray-300 pb-3.5 mb-3"
												: ""
										}
									>
										<Link
											href={item.path}
											className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
										>
											{item.label}
										</Link>
									</li>
								))}
							</React.Fragment>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export default MegaMenu;
