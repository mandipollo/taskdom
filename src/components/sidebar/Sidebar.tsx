import React, { useState } from "react";
import dashboard from "../../assets/dashboard.svg";
import project from "../../assets/project.svg";
import task from "../../assets/task.svg";

import teams from "../../assets/teams.svg";
import chat from "../../assets/chat.svg";
import setting from "../../assets/setting.svg";
import logout from "../../assets/logout.svg";

import collapse from "../../assets/collapse-all-svgrepo-com.svg";

import { Link } from "react-router-dom";
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

	const classBtn = "flex flex-row space-x-2 hover:underline ";
	const classP = `${open ? "hidden" : "block"}`;

	// sign out
	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();
		navigate("/");
	};

	return (
		<div className="flex flex-col w-full items-center border border-[#30363E] bg-[#0D1117] px-4">
			<ul className="flex flex-col space-y-6 pt-10">
				<li>
					<button
						onClick={handlerToggle}
						id="menu-btn"
						type="button"
						className={menu}
					>
						<img src={collapse} width={20} height={20} alt="collapse" />
					</button>
				</li>
				<li>
					<Link to="userDashboard">
						<button className={classBtn}>
							<img src={dashboard} width={20} height={20} alt="dashboard" />
							<p className={classP}>Dashboard</p>
						</button>
					</Link>
				</li>
				<li className="space-y-2">
					<Link to="projects">
						<button className={classBtn}>
							<img src={project} width={20} height={20} alt="projects" />
							<p className={classP}>Projects</p>
						</button>
					</Link>
				</li>

				<li>
					<button className={classBtn}>
						<img src={task} width={20} height={20} alt="task" />
						<p className={classP}>Personal Task</p>
					</button>
				</li>
				<li>
					<Link to="/teams">
						<button className={classBtn}>
							<img src={teams} width={20} height={20} alt="clients" />
							<p className={classP}>Teams</p>
						</button>
					</Link>
				</li>
				<li>
					<Link to="/chats">
						<button className={classBtn}>
							<img src={chat} width={20} height={20} alt="chat" />
							<p className={classP}> Chat</p>
						</button>
					</Link>
				</li>

				<li>
					<Link to="/accountSetting">
						<button className={classBtn}>
							<img src={setting} width={20} height={20} alt="setting" />
							<p className={classP}>Settings</p>
						</button>
					</Link>
				</li>
				<li>
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
