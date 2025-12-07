import logo from "./assets/logo.png"
import profileIcon from  "./assets/profile.png"
import {useState, useEvent} from "react"


export default function Nav(){
	const [isSignedIn,setIsSignedIn]=useState(false)
	
	function handleProfile(){
		
	}
	return(
	   <nav className="h-13 flex justify-between align-center bg-neutral-50 w-full">
	   	  <div className="mt-2 ml-5">
	   	  <img src={logo} className="h-8 w-full" />
	   	  </div>
       <div className="m-2 w-12 h-9 flex justify-center " onClick={handleProfile}>	
        <img src={isSignedIn?user.avatar:profileIcon} className="h-9 rounded-xl"/>
       </div>
		 </nav>
		);
}