import React from "react";
import home from "../../assets/home.svg";
import invoice from "../../assets/invoice.svg";
import project from "../../assets/project.svg";
import task from "../../assets/task.svg";
import client from "../../assets/client.svg";
import chat from "../../assets/chat.svg";
import calender from "../../assets/calender.svg";
import support from "../../assets/support.svg";
import setting from "../../assets/setting.svg";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
	return (
		<div className="flex flex-col w-1/5  items-center shadow-lg ">
			<ul className="flex flex-col space-y-8 md:pt-20 pt-10">
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={home} width={20} height={20} alt="dashboard" />
						<p className="text-gray-400 sm:block hidden">Dashboard</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={invoice} width={20} height={20} alt="invoice" />
						<p className="text-gray-400 sm:block hidden">Invoice</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={project} width={20} height={20} alt="projects" />
						<p className="text-gray-400 sm:block hidden">Projects</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={task} width={20} height={20} alt="task" />
						<p className="text-gray-400 sm:block hidden">Task</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={client} width={20} height={20} alt="clients" />
						<p className="text-gray-400 sm:block hidden"> Clients</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={chat} width={20} height={20} alt="chat" />
						<p className="text-gray-400 sm:block hidden"> Chat</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={calender} width={20} height={20} alt="calender" />
						<p className="text-gray-400 sm:block hidden">Calender</p>
					</button>
				</li>
				<li>
					<button className="flex flex-row space-x-2 hover:underline underline-offset-4 hover:text-[#4B98F9]">
						<img src={support} width={20} height={20} alt="support" />
						<p className="text-gray-400 sm:block hidden">Support</p>
					</button>
				</li>
				<li>
					<Link to="/accountSetting">
						<button className="flex flex-row space-x-2">
							<img src={setting} width={20} height={20} alt="setting" />
							<p className="text-gray-400 sm:block hidden">Settings</p>
						</button>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
