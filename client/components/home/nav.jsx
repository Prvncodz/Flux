import logo from "../assets/logo.png"
import profileIcon from "../assets/profile.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../../api/axios.js"



export default function Nav({user}) {
	
	const [isSignedIn, setIsSignedIn] = useState(false)
	const navigate = new useNavigate()	
	const [isActive, setIsActive] = useState(false);
	const [ChannelName, setChannelName] = useState("")
	const [username, setUsername] = useState("")

    if(Object.keys(user).length!==0){
   console.log("user object passed to nav component:",user)
	}


	async function handleSignout() {
		try {
			const res = await axios.post("/user/logout")

			if (res.status == 200) {
				setIsActive(false);
				setIsSignedIn(false)
			}
		} catch (error) {
			console.error(error.message)
		}
	}

       useEffect(()=>{
       if (Object.keys(user).length!==0) {
			setIsSignedIn(true)
			setChannelName(user.fullName)
			setUsername(user.userName)
		} else {
			setIsSignedIn(false)
		}

	   },[user])
		

	return (
		<nav className="h-13 flex justify-between items-center bg-neutral-50 w-full">
			<div className=" ml-5">
				<img src={logo} className="h-8 w-full" loading="lazy" />
			</div>
			{
				isSignedIn ? (
					<>
						<div className="m-2 w-12 h-9 flex justify-center items-center" onClick={() => { setIsActive(true) }}>
							<img src={user.avatar.url} className="h-9 rounded-full" loading="lazy" />
						</div>
						{isActive && <>
							<div className="popup absolute top-10 right-0 bg-gray-100 border border-1 border-gray-300 h-auto w-50 flex flex-col justify-center items-center">
								<div>
									<img src={user?.avatar.url} className="h-9 rounded-full" loading="lazy" />
									<span className="text-gray-500 font-md text-md">{ChannelName}</span>
									<span className="text-gray-400 font-md text-sm">{username}</span>
								</div>
								<div onClick={handleSignout}><span className="icon">#</span> Sign Out</div>
							</div>
						</>}
					</>
				) : (<>
					<div className="m-2 w-auto h-9 flex justify-center items-center rounded-3xl border border-2 border-gray-200 pt-5 pb-5 pl-2 pr-2 cursor-pointer" onClick={() => { navigate('/signin') }}>
						<img src={profileIcon} className="h-9 rounded-full" /><span className="text-l pl-1 font-medium">Sign in</span>
					</div>
				</>)
			}

		</nav>
	);
}