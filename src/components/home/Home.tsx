import React from "react";
import heroImg from "../../assets/hero-img.png";
import { Link } from "react-router-dom";
import Products from "./Products";

const Home: React.FC = () => {
	return (
		<div className="flex flex-1 flex-col bg-gradient-to-r from-pink-200 to-blue-200">
			<section className="sm:py-16 space-y-2">
				<div className="px-4 mx-auto max-w-7xl sm:px-6  lg:px-8">
					<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
						<div>
							<h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
								Collaborate remotely, with
								<div className="relative inline-flex">
									<span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
									<h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
										Taskdom.
									</h1>
								</div>
							</h1>

							<p className="mt-8 text-base text-black sm:text-xl">
								Connect, Chat, and Schedule with Ease.
							</p>

							<div className="mt-10 sm:flex sm:items-center sm:space-x-8">
								<Link
									to="/login"
									title=""
									className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
								>
									Start exploring
								</Link>
							</div>
						</div>

						<div>
							<img className="w-full" src={heroImg} alt="" />
						</div>
					</div>
				</div>
				<Products />
			</section>
		</div>
	);
};

export default Home;
