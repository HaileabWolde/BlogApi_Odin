import Aside from "./aside"
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

import axios from "axios";

function EachTagPage(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [eachTag, setTag] = useState(null)
    console.log(id)
    useEffect(()=> {
        async function fetchTag() {
            try{
                   const response = await axios.get(`http://localhost:3000/tag/${id}`)
                   setTag(response.data.tag)
            }
            catch(error){
                console.log("Error", error)
            }finally{
                setLoading(false)
            }
         

        } fetchTag()
    }, [])
 if (loading) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Loading...</p>
        </div>
    )

    if (!eachTag) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Tags not found</p>
        </div>
    )
return (
    <div className="min-h-screen bg-[#faf9f7]">
        <Aside/>
    </div>
)
}
export default EachTagPage;