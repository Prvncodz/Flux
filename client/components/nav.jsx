import logo from "./assets/logo.png"
import profileIcon from  "./assets/profile.png"
import SignIn from "./signin.jsx"
import SignUp from "./signup.jsx"

import {useState, useEffect} from "react"


export default function Nav(){
	const [isSignedIn,setIsSignedIn]=useState(false)
	
	function handleProfile(){
		return;
	}
	return(
	   <nav className="h-13 flex justify-between items-center bg-neutral-50 w-full">
	   	  <div className=" ml-5">
	   	  <img src={logo} className="h-8 w-full" loading="lazy" />
	   	  </div>
		  {
			isSignedIn?(
				<>
               <div className="m-2 w-12 h-9 flex justify-center rounded-2xl outline-solid outline-2 " onClick={handleProfile}>	
        <img src={isSignedIn?user.avatar:profileIcon} className="h-9 rounded-xl"/>
       </div>
				</>
			):(<>
			    <div className="m-2 w-auto h-9 flex justify-center items-center rounded-3xl border border-2 border-gray-200 pt-5 pb-5 pl-2 pr-2 cursor-pointer" onClick={handleProfile}>	
        <img src={profileIcon} className="h-9 rounded-xl"/><span className="text-l pl-1 font-medium">Sign in</span>
       </div>
			</>)
		  }
       
		 </nav>
		);
}