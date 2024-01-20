import Sidebar from "./Sidebar";

const UserDashboard: React.FC = () => {
	return (
		<div className="flex flex-row  h-full">
			<Sidebar />
			<div className="flex w-4/5"></div>
		</div>
	);
};

export default UserDashboard;
