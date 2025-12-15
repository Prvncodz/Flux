import {useState,useEvent,useRef} from 'react'
import profileIcon from  "./assets/profile.png"

export default function Profile(){
    const [isSignedIn,setisSignedIn]=useState(false);

    return(
        <>
        <div className="container h-auto w-70 bg-gray-100">
            { isSignedIn?(
              <>
              </>
            ):(
            <>
             <div className="img-container h-30 w-full flex justify-center items-center ">
               <img src={isSignedIn?user.avatar:profileIcon} className="h-15 w-15  rounded-xl"/>
             </div>
             <p><a href='#'>Sign in</a> to your account</p>
            </>
            )}
        </div>
   
        </>
    );
}