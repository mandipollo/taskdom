import mckessonLogo from "../assets/mckesson.svg";
import jjLogo from "../assets/j&j-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
	const [tab, setTab] = useState<"project" | "task" | "communication">(
		"project"
	);

	return (
		<main className="text-[#E6EDF3] flex flex-col flex-1 p-2  h-full bg-gradient-to-tr from-black from-40%  via-[#613F5A] to-black">
			<section className="flex mt-10 flex-1 flex-col items-center gap-8 ">
				<h1 className=" text-4xl font-bold ">A smarter way to work</h1>

				<p className=" sm:text-xl font-thin ">
					With Taskdom, you can drive clarity and impact at scale by connecting
					work <br></br> and workflows to company-wide goals.
				</p>
				<Link
					to="/login"
					className="text-black w-40 text-center rounded-sm py-2 transition-all hover:scale-105 shadow-lg hover:shadow-orange-100 duration-500 bg-gradient-to-r from-yellow-400 to-orange-400"
				>
					Get Started
				</Link>

				<div className="flex-1 flex gap-4 flex-col w-full h-full  ">
					<ul className="flex justify-center gap-2">
						<li className=" border border-green-400 rounded-md p-2">
							<button onClick={() => setTab("project")}>Projects</button>
						</li>
						<li className="border border-gray-400 rounded-md p-2">
							<button onClick={() => setTab("task")}>Tasks</button>
						</li>
						<li className="border border-red-400 rounded-md p-2">
							<button onClick={() => setTab("communication")}>
								Communication
							</button>
						</li>
					</ul>

					<div className="flex m-2">
						<div
							className={` ${
								tab === "project" ? "flex" : "hidden"
							}  md:flex-row flex-col justify-center items-center  gap-2`}
						>
							<div className="flex md:w-1/2 flex-col  items-center">
								<ul className="list-disc">
									<li> Authorization Levels</li>
									<li>Real-Time Collaboration</li>
									<li>Milestone & Deadline Tracking</li>
								</ul>
							</div>
							<div className="flex md:w-1/2 justify-center items-center">
								<img
									src="https://res.cloudinary.com/dbg68gzpx/image/upload/v1719861512/projectSnapshot_ixog6j.jpg"
									alt="Project dashboard snapshot"
								/>
							</div>
						</div>
						<div
							className={` ${
								tab === "task" ? "flex" : "hidden"
							}  md:flex-row flex-col justify-center items-center  gap-2`}
						>
							<div className="flex md:w-1/2 flex-col  items-center">
								<p className="text-lg ">
									Visualize the status of each task and seamlessly collaborate
									with team members
								</p>
							</div>
							<div className="flex md:w-1/2 justify-center items-center">
								<img
									src="https://res.cloudinary.com/dbg68gzpx/image/upload/v1719861512/taskSnapshot_q7udnp.jpg"
									alt="Task dashboard snapshot"
								/>
							</div>
						</div>
						<div
							className={` ${
								tab === "communication" ? "flex" : "hidden"
							}  md:flex-row flex-col justify-center items-center  gap-2`}
						>
							<div className="flex md:w-1/2 flex-col  items-center">
								<ul className="list-disc">
									<li> Instant Messaging</li>
									<li>File Sharing</li>
									<li>Real-Time Notifications</li>
								</ul>
							</div>
							<div className="flex md:w-1/2 justify-center items-center">
								<img
									src="https://res.cloudinary.com/dbg68gzpx/image/upload/v1719861512/teamsSnapshot_x4hyxp.jpg"
									alt="Messaging snapshot"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="flex backdrop-blur bg-opacity-10 bg-white  flex-col justify-center items-center p-2 rounded-md">
				<div className="grid grid-cols-1 justify-center items-center grid-rows-1 grid-flow-col gap-4 ">
					<img
						src="https://hive.com/wp-content/uploads/2023/12/Group-6867.svg"
						alt="Starbucks logo"
					/>
					<img src={mckessonLogo} alt="mckesson logo" />
					<img
						src="https://hive.com/wp-content/uploads/2022/05/20210305111600Electronic-Arts-Logo-1.svg"
						alt="EA logo"
					/>
					<img src={jjLogo} alt="jj logo" />
					<img
						src="https://hive.com/wp-content/uploads/2022/05/Google.svg"
						alt="google logo"
					/>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
