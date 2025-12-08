import defaultPfp from "./assets/dpfp.jpg"
import defaultBanner from "./assets/dbanner.jpg"
import editIcon from "./assets/editimage.png"
import {useState,useEvent,useRef} from 'react'
import SubmitButton from "./submitButton.jsx"
import axios from "axios"

export default function SignUp(){
	const [coverImagePreview,setCoverImagePreview]=useState(null)
	const [avatarPreview,setAvatarPreview]=useState(null)
	const [DisplayAvatarRequired,setDisplayAvatarRequired]=useState(false)
	const fileRefci=useRef(null)
	const fileRefav=useRef(null)

	
	async function handleFormSubmission(e){
		e.preventDefault()
		const formData=new FormData(e.target)
	 const avatar=formData.get("avatar");
	 if(!avatar || avatar.size==0){
	 	setDisplayAvatarRequired(true)
	 	return
	 }
	  try{
		const res= await axios.post("http://localhost:8000/api/v1/user/register",formData,{
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
		if(res.ok){
		console.log("successfully registered user");
		}else{
   console.log("registration failed")
		}
	  }catch(err){
	  	console.error("Error :",err.message)
	  	e.target.reset();
	  }
	  e.target.reset();
	  setCoverImagePreview(null)
	  setAvatarPreview(null)
	}
	function handleCoverImage(e){
		const file=e.target.files[0]
		if(file){
		setCoverImagePreview(URL.createObjectURL(file))
		}
	}
	
	function handleAvatar(e){
		const file=e.target.files[0]
		if(file){
		setDisplayAvatarRequired(false)
		setAvatarPreview(URL.createObjectURL(file))
		}
	}
	
	return(
		<div id="signup-bg" className="h-screen w-screen flex flex-col justify-center
		items-center bg-gray-200">
			<div id="signup-card" className="h-auto w-87 bg-gray-100 flex flex-col
			justify-center overflow-hidden rounded-xl">
				<h1 className="mt-5 text-3xl font-bold text-blue-400 relative" >Sign Up</h1>
				
				
				<form className="p-7" onSubmit={handleFormSubmission}>
			 <div className="wrapper relative transition-all ease">
			 	<div className="relative z-1">
			 	<img src={coverImagePreview?coverImagePreview:defaultBanner}
			 	onClick={()=>{
			 	 	fileRefci.current.click();
			 	 }} 
			 	className="h-33
			 	w-full rounded-lg relative cursor-pointer"/>
			 	
			 		<div onClick={()=>{
			 	 	fileRefci.current.click();
			 	 }}>
			 		
			 <div className="absolute z-2 bg-black/50 h-33 w-full rounded-lg
			 cursor-pointer top-0"></div>	
			 <img src={editIcon} className="absolute h-15 w-15 z-3 -top-2 right-0"/>
			 	</div>
			 	<input type="file" ref={fileRefci} className="hidden" name="coverImage"
			 	accept="image/*" onChange={handleCoverImage}/>
			 
			 </div>
			 
			 <div className="relative">
			 	<img src={avatarPreview?avatarPreview:defaultPfp}
			 	onClick={()=>{
			 	 	fileRefav.current.click();
			 	 }} 
			 	className={`h-15
			 	w-15 rounded-full absolute -left-1 -bottom-3 cursor-pointer
			  z-1
			 	${DisplayAvatarRequired?'border-2 border-red-400':''}`}  />
			 	<div onClick={()=>{
			 	 	fileRefav.current.click();
			 	 }}>
			 		
			 <div className="absolute z-2 bg-black/50 h-15 w-15 rounded-full -left-1
			 -bottom-3  cursor-pointer"></div>	
			 <img src={editIcon} className="absolute h-12 w-13 -bottom-1 left-0 z-3"/>
			 	</div>
			 
			 	{ DisplayAvatarRequired?(<div className="bg-gray-100 rounded-sm h-5 w-auto
			 	ml-2 mt-2 text-red-400">Avatar is required to register</div>):(<p></p>)}
			 	<input type="file" ref={fileRefav} className="hidden" name="avatar"
			 	accept="image/*" onChange={handleAvatar}/>
			 	</div>
			 </div>
			 
			<div className="form-inputs mt-10 mb-5  h-auto w-full relative
			text-left">
			<label className="text-md font-medium text-gray-700">Fullname<input name="fullName"
			type="text" className="bg-gray-100
		 w-full  mt-1 mb-4 rounded-md p-1 border border-gray-200 shadow-xs" required /></label>
			<label className="text-md font-medium text-gray-700">Username<input name="userName"
			type="text" className="bg-gray-100 w-full  mb-4 rounded-md p-1 border
			border-gray-200 shadow-xs mt-1" required/></label>
			<label className="text-md font-medium text-gray-700">Email<input name="email" type="email"
			className="bg-gray-100 w-full mb-4 rounded-md p-1 border border-gray-200
			shadow-xs mt-1" required/></label>
			<label className="text-md font-medium text-gray-700">Password<input name="password"
			type="password" className="bg-gray-100 w-full mb-4 rounded-md p-1 border
			border-gray-200 shadow-xs mt-1 " required/></label> 
		</div>
     <SubmitButton/>
			<p className="mt-3">Already have an account?<a href="#"> Sign in</a></p>

				</form>
			</div>
		</div>
		);
}