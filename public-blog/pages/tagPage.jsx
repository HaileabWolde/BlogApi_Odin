import Aside from "./aside";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TagPage(){
    const [tags, setTags] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function fetchalltags(){
            try{
                 const response = await axios.get("http://localhost:3000/tags/alltags")
                 setTags(response.data.alltags)
            }
           catch(error){
            console.log("error", error)
           }
           finally{
            setLoading(false)
           }
        } fetchalltags()
    }, [])
     if (loading) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Loading...</p>
        </div>
    )

    if (!tags) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Tags not found</p>
        </div>
    )

    return (
        <div  className="min-h-screen bg-[#faf9f7]">
            <Aside/>
            <main 
            className="max-w-2xl mx-auto px-6 py-16">
                  <h1 className="text-3xl font-semibold font-serif text-[#1a1a1a] leading-tight mb-6">
                   Browse By Tag
                </h1>
                <p
                className="text-[#6b7280] text-sm font-serif line-clamp-2"
                >
                    Find articles on topics you care about
                </p>
                <div className="grid grid-cols-3 gap-4 items-center mt-4">
                        {
                            tags.map((tag)=> {
                                return (
                                    <Link
                                    to={`/tag/${tag.id}`} 
                                    className="bg-white p-8 flex flex-col items-center justify-center rounded-lg shadow-2xl">
                                              <span
                                            key={tag.id}
                                                 className="bg-[#f3f0ff] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full"
                                               >
                                                 #{tag.name.toLowerCase()}
                                             </span>
                                             <p
                                             className="text-lg font-serif text-[#666] line-clamp-2"
                                             >
                                                {tag.posts.length}
                                             </p>
                                      </Link>  
                                )
                            })
                        }
                </div>
            </main>
            
        </div>
    )
}
export default TagPage;