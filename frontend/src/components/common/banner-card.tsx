import Link from "@components/ui/link";
import Image from "next/image";
import type { FC } from "react";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";
import {Constants} from "@utils/constants";

interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	classNameInner?: string;
	href: LinkProps["href"];
}


const BannerCard: FC<BannerProps> = ({
	banner,
	className,
	variant = "rounded",
	effectActive = false,
	classNameInner,
	href,
}) => {
	const { width } = useWindowSize();
	const { name, photo} = banner;
	return (
		<div className={cn("mx-auto", className)}>
			<Link
				// @ts-ignore
				target={"_blank"}
				href={href}
				className={cn(
					"h-full group flex justify-center relative overflow-hidden",
					classNameInner
				)}
			>
				<img
					src={Constants.S3_BASE_URL(photo)}
					width={width<480? 450 : 1190}
					height={width<480? 150: 450}
					alt={name??""}
					className={cn("bg-gray-300 object-cover w-full", {
						"rounded-md": variant === "rounded",
					})}
				/>
				{effectActive && (
					<div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
				)}
			</Link>
		</div>
	);
};

export default BannerCard;
