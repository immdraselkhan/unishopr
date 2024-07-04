import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import {Constants} from "@utils/constants";

interface Props {
	item: any;
	variant?: "rounded" | "circle";
	size?: "small" | "medium";
	effectActive?: boolean;
	href: LinkProps["href"];
}

const Card: React.FC<Props> = ({
	item,
	variant = "circle",
	size = "small",
	effectActive = false,
	href,
}) => {
	const { name, photo } = item ?? {};
	const imageSize: any =
		(size === "small" && 180) || (size === "medium" && 198);

	const placeholderImage = `/assets/placeholder/card-${size}.svg`;
	return (
		<Link
			// @ts-ignore
			target={"_blank"}
			href={href}
			className="group flex justify-center text-center flex-col"
		>
			<div
				className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto ${
					variant === "rounded" ? "rounded-md" : "rounded-full"
				}`}
			>
				<div className="flex">
					<img
						src={Constants.S3_BASE_URL(photo)}
						alt={name || "Card Image"}
						width={imageSize}
						height={imageSize}
						className={`object-cover bg-gray-300 ${
							variant === "rounded" ? "rounded-md" : "rounded-full"
						}`}
					/>
				</div>
				{effectActive === true && (
					<>
						<div
							className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
								variant === "rounded" ? "rounded-md" : "rounded-full"
							}`}
						/>
						<div className="absolute top left h-full w-full flex items-center justify-center">
							<FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
						</div>
					</>
				)}
			</div>
			<Text variant="heading" className="capitalize">
				{name}
			</Text>
		</Link>
	);
};

export default Card;
