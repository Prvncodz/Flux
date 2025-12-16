import logo from "./assets/logo.png"
import profileIcon from  "./assets/profile.png"
import {useNavigate,useLocation} from "react-router-dom"
import {useState, useEffect} from "react"


export default function Nav(){
	const [isSignedIn,setIsSignedIn]=useState(false)
	const navigate=new useNavigate()
	const location=new useLocation()
    const {user}=location.state || {}
	
	
	useEffect(()=>{
		if(user){
			setIsSignedIn(true)
		}else{
			setIsSignedIn(false)
		}
	},[user,isSignedIn]);

	return(
	   <nav className="h-13 flex justify-between items-center bg-neutral-50 w-full">
	   	  <div className=" ml-5">
	   	  <img src={logo} className="h-8 w-full" loading="lazy" />
	   	  </div>
		  {
			isSignedIn?(
				<>
               <div className="m-2 w-12 h-9 flex justify-center items-center" onClick={()=>navigate('/userchannel')}>	
        <img src={user?.avatar.url} className="h-9 rounded-full" loading="lazy"/>
       </div>
				</>
			):(<>
			    <div className="m-2 w-auto h-9 flex justify-center items-center rounded-3xl border border-2 border-gray-200 pt-5 pb-5 pl-2 pr-2 cursor-pointer" onClick={()=>{navigate('/signin')}}>	
        <img src={profileIcon} className="h-9 rounded-full"/><span className="text-l pl-1 font-medium">Sign in</span>
       </div>
			</>)
		  }
       
		 </nav>
		);
}