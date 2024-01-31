import React from "react";

import project from "../../assets/project.svg";
import task from "../../assets/task.svg";
import client from "../../assets/client.svg";
import teams from "../../assets/teams.svg";
import chat from "../../assets/chat.svg";
import calender from "../../assets/calender.svg";
import support from "../../assets/support.svg";
import setting from "../../assets/setting.svg";
import logout from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import signOutUser from "../../firebaseAuth/signOutUser";
import { resetUserFirestoreData } from "../../store/userFirestoreData";
const Sidebar: React.FC = () => {
	const classBtn = "flex flex-row space-x-2 hover:underline ";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();

		navigate("/");
	};
	return (
		<div className="flex flex-col w-full items-center border border-[#30363E] bg-[#0D1117] ">
			<ul className="flex flex-col space-y-8 md:pt-20 pt-10">
				<li>
					<button className={classBtn}>
						<img src={project} width={20} height={20} alt="projects" />
						<p className=" sm:block hidden">Projects</p>
					</button>
				</li>
				<li>
					<button className={classBtn}>
						<img src={task} width={20} height={20} alt="task" />
						<p className=" sm:block hidden">Task</p>
					</button>
				</li>
				<li>
					<Link to="/teams">
						<button className={classBtn}>
							<img src={teams} width={20} height={20} alt="clients" />
							<p className=" sm:block hidden">Teams</p>
						</button>
					</Link>
				</li>
				<li>
					<button className={classBtn}>
						<img src={client} width={20} height={20} alt="clients" />
						<p className=" sm:block hidden"> Clients</p>
					</button>
				</li>
				<li>
					<button className={classBtn}>
						<img src={chat} width={20} height={20} alt="chat" />
						<p className=" sm:block hidden"> Chat</p>
					</button>
				</li>
				<li>
					<button className={classBtn}>
						<img src={calender} width={20} height={20} alt="calender" />
						<p className=" sm:block hidden">Calender</p>
					</button>
				</li>
				<li>
					<button className={classBtn}>
						<img src={support} width={20} height={20} alt="support" />
						<p className=" sm:block hidden">Support</p>
					</button>
				</li>
				<li>
					<Link to="/accountSetting">
						<button className={classBtn}>
							<img src={setting} width={20} height={20} alt="setting" />
							<p className=" sm:block hidden">Settings</p>
						</button>
					</Link>
				</li>
				<li>
					<button onClick={signOutHandler} className={classBtn}>
						<img src={logout} width={20} height={20} alt="setting" />
						<p className=" sm:block hidden">Sign out</p>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
