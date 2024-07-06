import React, { useState } from "react";
import dashboard from "../../assets/dashboard.svg";
import project from "../../assets/project.svg";

import teams from "../../assets/teams.svg";

import setting from "../../assets/setting.svg";
import logout from "../../assets/logout.svg";

import collapse from "../../assets/collapse-all-svgrepo-com.svg";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import signOutUser from "../../firebaseAuth/signOutUser";
import { resetUserFirestoreData } from "../../store/userFirestoreData";

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
						<img src={collapse} width={20} height={20} alt="collapse" />
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
							<img src={dashboard} width={20} height={20} alt="dashboard" />
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
							<img src={project} width={20} height={20} alt="projects" />
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
							<img src={teams} width={20} height={20} alt="clients" />
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
							<img src={setting} width={20} height={20} alt="setting" />
							<p className={classP}>Settings</p>
						</button>
					</NavLink>
				</li>
				<li className="flex">
					<button onClick={signOutHandler} className={classBtn}>
						<img src={logout} width={20} height={20} alt="setting" />
						<p className={classP}>Sign out</p>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
