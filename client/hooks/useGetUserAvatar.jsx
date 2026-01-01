import { useEffect,useState } from "react";

 export  funtion useGetUserAvatar(userId)=>{ 
      const [url,setUrl]=useState(null)
      const [loading,setLoading]=useState(false)

     if(!userId ){
    return null
     }

      useEffect(()=>{
  
        try {
         setLoading(true)
         const res = await axios.get(`user/c/${userId}`)
          if(res.status===200){  
          console.log("res data :",res.data.data.avatar.url)
          setUrl(res.data.data.avatar.url)
          setLoading(false)
      }
        } catch (error) {
           console.log(error)
           console.log("backend message :",error?.response?.data?.message)
            setLoading(false)

        }
},[])

 return loading?null : url
}
