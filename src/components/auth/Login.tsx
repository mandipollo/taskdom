import React from "react";
import loginLogo from "../../assets/loginLogo.svg";
import { Link } from "react-router-dom";
import facebookLogo from "../../assets/facebook.svg";
import instagramLogo from "../../assets/instagram.svg";

const Login: React.FC = () => {
	return (
		<div className="flex h-full  flex-col bg-gray-200">
			<div className="flex justify-center items-center h-2/4 flex-col space-y-2">
				<img src={loginLogo} height={40} width={40}></img>
				<p className="text-lg md:text-sm ">iDon'tKnowUI</p>
			</div>
			<div className="flex flex-col h-2/4 justify-center items-center flex-1">
				<div className="flex relative flex-col justify-center items-center h-2/4  md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg  ">
					<div className="flex  flex-col w-full h-full justify-center items-center space-y-4 flex-1 ">
						<input
							className="border-gray-300  outline-none border-b  text-center w-3/4 "
							placeholder="Enter your email"
							type="email"
						></input>
						<div className="flex justify-center-items-center space-x-4">
							<img
								src={facebookLogo}
								alt="facebook logo"
								width={30}
								height={30}
							/>
							<img
								src={instagramLogo}
								alt="instagram logo"
								width={30}
								height={30}
							/>
						</div>
					</div>
					<button className="absolute -bottom-5 rounded-2xl bg-black text-white py-2 px-12">
						NEXT
					</button>
				</div>

				<div className="flex h-2/4 w-3/4 justify-center items-center  ">
					<Link to="/signup">
						<button className="font-semibold font-montserrat tracking-wider">
							SIGN UP
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
