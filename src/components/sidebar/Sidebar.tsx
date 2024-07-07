import React, { useState } from "react";

import { CollapseSvg } from "../../assets/action/Collapse";
import DashboardSvg from "../../assets/sidebar/DashboardSvg";
import ProjectSvg from "../../assets/sidebar/ProjectSvg";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import signOutUser from "../../firebaseAuth/signOutUser";
import { resetUserFirestoreData } from "../../store/userFirestoreData";
import { TeamSvg } from "../../assets/sidebar/TeamSvg";
import SettingSvg from "../../assets/sidebar/SettingSvg";
import SignOutSvg from "../../assets/sidebar/SignOutSvg";

const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// toggle button

	const [open, setOpen] = useState<boolean>(false);

	const handlerToggle = (): void => {
		setOpen(!open);
	};

	const menu = `flex justify-center items-center button z-50 block hamburger focus:outline-none${
		open && "open"
	}`;

	const classBtn = "flex flex-row space-x-2";
	const classP = `${open ? "hidden" : "hidden sm:block "}`;

	const active =
		" dark:text-white text-black p-2  rounded-md bg-white dark:bg-[#161B22] shadow-lg  w-full h-full";
	const pending = " text-red-400 p-2 ";
	// sign out
	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();
		navigate("/");
	};

	return (
		<div
			className={`${
				open ? "w-10" : " sm:w-40 w-10"
			} transition-all ease-in-out duration-300 flex flex-col items-center dark:border dark:text-white text-black dark:border-[#30363E]  dark:bg-[#0D1117] `}
		>
			<ul className="flex flex-col space-y-6 pt-10 w-full p-2">
				<li className="flex w-full">
					<button
						onClick={handlerToggle}
						id="menu-btn"
						type="button"
						className={menu}
					>
						<CollapseSvg
							height={20}
							width={20}
							className="dark:text-white text-black"
						/>
						{/* <img src={collapse} width={20} height={20} alt="collapse" /> */}
					</button>
				</li>
				<li className="flex w-full h-full">
					<NavLink
						to="userDashboard"
						className={({ isActive, isPending }) =>
							isPending ? pending : isActive ? active : ""
						}
					>
						<button className={classBtn}>
							<DashboardSvg
								width={20}
								height={20}
								className="dark:text-white text-black"
							/>

							<p className={classP}>Dashboard</p>
						</button>
					</NavLink>
				</li>
				<li className="flex ">
					<NavLink
						to="projects"
						className={({ isActive, isPending }) =>
							isPending ? pending : isActive ? active : ""
						}
					>
						<button className={classBtn}>
							<ProjectSvg
								width={20}
								height={20}
								className="dark:text-white text-black"
							/>
							<p className={classP}>Projects</p>
						</button>
					</NavLink>
				</li>

				<li className="flex  ">
					<NavLink
						to="/teams"
						className={({ isActive, isPending }) =>
							isPending ? pending : isActive ? active : ""
						}
					>
						<button className={classBtn}>
							<TeamSvg
								width={20}
								height={20}
								className="dark:text-white text-black"
							/>

							<p className={classP}>Teams</p>
						</button>
					</NavLink>
				</li>

				<li className="flex  ">
					<NavLink
						to="/accountSetting"
						className={({ isActive, isPending }) =>
							isPending ? pending : isActive ? active : ""
						}
					>
						<button className={classBtn}>
							<SettingSvg
								width={20}
								height={20}
								className="dark:text-white text-black"
							/>

							<p className={classP}>Settings</p>
						</button>
					</NavLink>
				</li>
				<li className="flex">
					<button onClick={signOutHandler} className={classBtn}>
						<SignOutSvg
							width={20}
							height={20}
							className="dark:text-white text-black"
						/>

						<p className={classP}>Sign out</p>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
