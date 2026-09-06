import { useState } from "react";
import Sidebar from "../aside"
import Form_post from "./form_post";
import Header from "../Header";
import Mobile_Responsvie from "../mobileResponsive";
function New_Post (){
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        content: "",
        image: null,
        published: false,
        existingImageUrl: null
    })
    const [error, setError]= useState('')


    return (
        <div className="min-h-screen bg-[#0a0a0a] grid grid-cols-1 sm:grid-cols-[320px_1fr]">
            <Header
             isOpen={isOpen}
   setIsOpen={setIsOpen}
            />
            <Mobile_Responsvie
              isOpen={isOpen}
   setIsOpen={setIsOpen}
            />
            <Sidebar/>
            <Form_post
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
            />
           
        </div>
    )
}
export default  New_Post 