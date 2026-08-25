import { useState } from "react";
import axios from "axios";
import Sidebar from "../aside"
import Form_post from "./form_post";

function New_Post (){
    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        content: "",
        image: null,
        published: false
    })
    const [error, setError]= useState('')


    return (
        <div className="min-h-screen bg-[#0a0a0a] grid grid-cols-[220px_1fr]">
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