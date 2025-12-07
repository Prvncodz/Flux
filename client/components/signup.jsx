import defaultPfp from "./assets/dpfp.jpg"
import defaultBanner from "./assets/dbanner.jpg"
import {useState,useEvent,useRef} from 'react'
import axios from "axios"

export default function SignUp(){
	const [coverImagePreview,setCoverImagePreview]=useState(null)
	const [avatarPreview,setAvatarPreview]=useState(null)
	const fileRefci=useRef(null)
	const fileRefav=useRef(null)
	
	function handleFormSubmission(e){
		e.preventDefault()
		const formData=new FormData(e.target)
	  try{
		const res=axios.post("http://localhost:8000/api/v1/user/register",formData,{
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
		if(res.ok){
		alert("Success");
		}
	  }catch(err){
	  	alert("Error :",err.message)
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
		setAvatarPreview(URL.createObjectURL(file))
		}
	}
	
	return(
		<div id="signup-bg" className="h-screen w-screen flex justify-center items-center bg-gray-300">
			<div id="signup-card" className="h-auto w-90 bg-gray-100 flex flex-col
			justify-center overflow-hidden rounded-xl">
				<h1 className="mt-7 text-2xl font-extrabold text-blue-400">Sign Up</h1>
				
				
				<form className="p-7" onSubmit={handleFormSubmission}>
			 <div className="wrapper relative">
			 	<img src={coverImagePreview?coverImagePreview:defaultBanner}
			 	onClick={()=>{
			 	 	fileRefci.current.click();
			 	 }} 
			 	className="h-33
			 	w-full rounded-lg relative cursor-pointer"/>
			 	
			 	<input type="file" ref={fileRefci} className="hidden" name="coverImage"
			 	accept="image/*" onChange={handleCoverImage}/>
			 
			 
			 	<img src={avatarPreview?avatarPreview:defaultPfp}
			 	onClick={()=>{
			 	 	fileRefav.current.click();
			 	 }} 
			 	className="h-15
			 	w-15 rounded-full absolute -left-1 -bottom-3 cursor-pointer"/>
			 	
			 	<input type="file" ref={fileRefav} className="hidden" name="avatar"
			 	accept="image/*" onChange={handleAvatar}/>
			 </div>
			 
			<div className="form-inputs mt-10 mb-5  h-auto w-full relative
			text-left">
			<label className="text-lg font-medium">Fullname<input name="fullName"
			type="text" className="bg-gray-200
		 w-full  mt-1 mb-4 rounded-md p-1 border border-gray-300" required /></label>
			<label className="text-lg font-medium">Username<input name="userName"
			type="text" className="bg-gray-200 w-full  mb-4 rounded-md p-1 border
			border-gray-300 mt-1" required/></label>
			<label className="text-lg font-medium">Email<input name="email" type="email"
			className="bg-gray-200 w-full mb-4 rounded-md p-1 border border-gray-300 mt-1" required/></label>
			<label className="text-lg font-medium">Password<input name="password"
			type="password" className="bg-gray-200 w-full mb-4 rounded-md p-1 border
			border-gray-300 mt-1" required/></label> 
		</div>
		  <button className="bg-blue-500 hover:bg-blue-600 focus:outline-2
		  focus:outline-offset-2 focus:outline-blue-500  active:bg-blue-700 text-gray-200 p-5 w-44 h-12 ml-auto mr-auto
		 flex justify-center items-center rounded-4xl
		  font-semibold text-center text-lg "
		  type="submit">Submit</button>
			<p className="mt-3">Already have an account?<a href="#"> Sign in</a></p>

				</form>
			</div>
		</div>
		);
}