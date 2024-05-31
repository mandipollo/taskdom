import React, { useState } from "react";
import dashboard from "../../assets/dashboard.svg";
import project from "../../assets/project.svg";

import teams from "../../assets/teams.svg";
import chat from "../../assets/chat.svg";
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

	const classBtn =
		"flex flex-row space-x-2 hover:underline underline-offset-4 ";
	const classP = `${open ? "hidden" : "block"}`;

	const active = " text-white underline underline-offset-4";
	const pending = " text-red-400 ";
	// sign out
	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();
		navigate("/");
	};

	return (
		<div
			className={`${
				open ? "w-10" : "w-40"
			} transition-all ease-in-out duration-300 flex flex-col items-center border border-[#30363E] bg-[#0D1117] `}
		>
			<ul className="flex flex-col space-y-6 pt-10">
				<li className="flex  items-center">
					<button
						onClick={handlerToggle}
						id="menu-btn"
						type="button"
						className={menu}
					>
						<img src={collapse} width={20} height={20} alt="collapse" />
					</button>
				</li>
				<li className="flex  items-center">
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
				<li className="flex  items-center">
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

				<li className="flex  items-center">
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
				<li className="flex  items-center">
					<NavLink
						to="/chats"
						className={({ isActive, isPending }) =>
							isPending ? pending : isActive ? active : ""
						}
					>
						<button className={classBtn}>
							<img src={chat} width={20} height={20} alt="chat" />
							<p className={classP}> Chat</p>
						</button>
					</NavLink>
				</li>

				<li className="flex  items-center">
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
				<li className="flex  items-center">
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
