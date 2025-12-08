import {useState,useEvent,useRef} from 'react'
import axios from "axios"
import SubmitButton from "./submitButton.jsx"
export default function SignIn(){
	
	
	async function handleFormSubmission(e){
		e.preventDefault()
	const	formData=new FormData(e.target)
	const jsonData=object.fromEntries(formData)
	
	  try{
		const res= await
		axios.post("http://localhost:8000/api/v1/user/login",jsonData,{
			headers:{
				'Content-Type':'application/json'
			}
		})
		
		if(res.ok){
		alert("successfully logged in user");
		e.target.reset();
		}else{
    alert("user not found")
    e.target.reset();
		}
	  }catch(err){
	  	alert("error while submitting form")
	  	e.target.reset();
	  }
	  e.target.reset();
	}
	
	
	return(
		<div id="signin-bg" className="h-screen w-screen flex flex-col justify-center
		items-center bg-gray-200">
			<div id="signin-card" className="h-auto w-87 bg-gray-100 flex flex-col
			justify-center overflow-hidden rounded-xl">
				<h1 className="mt-5 text-3xl font-bold text-blue-400 relative" >Sign In</h1>
				
				
				<form className="p-7" onSubmit={handleFormSubmission}>

			<div className="form-inputs mt-4 mb-5  h-auto w-full relative
			text-left">
			<label className="text-md font-medium text-gray-700">Username or Email
			address<input name="userName"
			type="text" className="bg-gray-100 w-full  mb-4 rounded-md p-1 border
			border-gray-200 shadow-xs mt-1" required/></label>
			<label className="text-md font-medium text-gray-700">Password<input name="password"
			type="password" className="bg-gray-100 w-full mb-4 rounded-md p-1 border
			border-gray-200 shadow-xs mt-1 " required/></label> 
		</div>
      <SubmitButton/>
			<p className="mt-2">Don't have an account?<a href="#"> Sign up</a></p>

				</form>
			</div>
		</div>
		);
}