import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useCategoryTreeQuery } from "@redux/services/utilities/api";

interface MenuProps {
	data: any;
	className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
	const categories = useCategoryTreeQuery("");

	return (
		<nav className={classNames(`headerMenu flex w-full relative`, className)}>
			<div className={`menuItem group cursor-pointer py-7`}>
				<Link
					href={"/order"}
					className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
				>
					Request
				</Link>
			</div>
			<div className={`menuItem group cursor-pointer py-7`}>
				<Link
					href={"/travel"}
					className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
				>
					Travel
				</Link>
			</div>
			<div className={`menuItem group cursor-pointer py-7`}>
				<Link
					href={"/"}
					className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
				>
					Shop
					<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
						<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
					</span>
				</Link>

				<MegaMenu columns={categories.data?.data ? categories.data.data : []} />
			</div>
		</nav>
	);
};

export default HeaderMenu;
