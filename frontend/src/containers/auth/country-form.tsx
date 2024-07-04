import Logo from "@components/ui/logo";
import React from "react";
import { useCountriesQuery } from "@redux/services/utilities/api";
import { Constants } from "@utils/constants";
import { setLocalStorageCountry, localCountry } from "@utils/auth";
import { RadioGroup } from "@headlessui/react";

const CountryForm: React.FC<{ action?: () => void }> = (props) => {
	const country = localCountry();
	const countries = useCountriesQuery("");

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={() => console.log("clicked")}>
					<Logo />
				</div>
			</div>
			<h5 className="text-sm font-semibold text-black">Country</h5>
			<div className="w-full px-4 py-5">
				<div className="mx-auto w-full max-w-md">
					<RadioGroup
						value={{
							_id: country?._id,
							name: country?.name,
							value: country?._id,
							icon: country?.flag,
						}}
						onChange={async (event: any) => {
							const country = countries.data?.data.find((item) => item._id === event._id.toString())
							if (country) await setLocalStorageCountry(country)
						}}>
						<RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
						<div className="space-y-2">
							{countries.data?.data.map((country) => (
								<RadioGroup.Option
									key={country.name}
									value={country}
									className={({ active, checked }) =>
										`${active
											? 'ring-2 ring-black ring-opacity-60 ring-offset-2 ring-offset-sky-300'
											: ''
										}
                    					bg-gray-300 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
									}
								>
									{() => (
										<>
											<div className="flex w-full items-center justify-between">
												<div className="flex items-center">
													<div className="text-sm">
														<RadioGroup.Label
															as="p"
															className={`font-medium text-gray-900'`}
														>
															<span className="flex truncate items-center">
																<span className="me-1.5">
																	<img width={20} src={Constants.S3_BASE_URL(country?.flag)} alt="" />
																</span>
																{country?.name}
															</span>
														</RadioGroup.Label>
													</div>
												</div>
											</div>
										</>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				</div>
			</div>
		</div>
	);
};

export default CountryForm;
