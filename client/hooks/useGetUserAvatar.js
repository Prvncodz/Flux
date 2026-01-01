import { useEffect,useState } from "react";

 export  funtion useGetUserAvatar(userId)=>{
      
      const [url,setUrl]=useState(null)
     if(!userId ){
    return null
     }
      useEffect(()=>{
  
        try {
  
         const res = await axios.get(`user/c/${userId}`)
          if(res.status===200){  
          console.log("res data :",res.data.data.avatar.url)
          setUrl()
      }
        } catch (error) {
           console.log(error)
           console.log("backend message :",error?.response?.data?.message)
            return null
        }
},[])
}
