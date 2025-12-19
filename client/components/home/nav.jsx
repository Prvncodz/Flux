import logo from "../assets/logo.png"
import profileIcon from "../assets/profile.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect,useLayoutEffect } from "react"
import axios from "../../api/axios.js"



export default function Nav({user,isLogged}) {
	
	
	const navigate = new useNavigate()	
	const [isActive, setIsActive] = useState(false);
	const [ChannelName, setChannelName] = useState("")
	const [username, setUsername] = useState("")
    const [avatar,setAvatar]=useState('')
    const [notLoggedOut,setNotLoggedOut]=useState(true)

    if(Object.keys(user).length!==0){
   console.log("user object passed to nav component:",user)
   console.log("is the user logged in? :",isLogged)
	}


	

	async function handleSignout() {
	try {
		const res = await axios.post("/user/logout")

		if (res.status == 200) {
			setIsActive(false)
			setNotLoggedOut(false)
		}
	} catch (error) {
		console.log(error)
	}
}

	return (
		<nav className="h-13 flex justify-between items-center bg-neutral-50 w-full">
			<div className=" ml-5">
				<img src={logo} className="h-8 w-full" loading="lazy" />
			</div>
			{
				isLogged && notLoggedOut? (
					<>
						<div className="m-2 w-12 h-9 flex justify-center relative items-center" onClick={() => { setIsActive(true) }}>
							<img src={user?.avatar?.url} className="h-9 rounded-full" loading="lazy" />
						</div>
						{isActive && <>
							<div className="popup absolute top-10 right-0 bg-gray-100 border border-1 border-gray-300 h-auto w-50">
								<div>
									<img src={user?.avatar?.url} className="h-10 mt-4 rounded-full" loading="lazy" />
									<span className="text-gray-500 font-md text-md">{user?.fullName}</span>
									<span className="text-gray-400 font-md text-sm">{user?.userName}</span>
								</div>
								<div onClick={handleSignout}><span className="icon">
									
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 12H3.62" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.85 8.64999L2.5 12L5.85 15.35" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</span> Sign Out</div>
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