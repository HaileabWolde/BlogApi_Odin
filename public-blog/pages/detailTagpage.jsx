import Aside from "./aside"
import { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";

import axios from "axios";

function EachTagPage(){
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [eachTag, setTag] = useState(null)
    
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
function stripHtml(html) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
}
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
        <main className="max-w-2xl mx-auto px-6 py-16">
            <div className="flex flex-col gap-2">
                     <Link 
                  to="/allTags" 
                    className="text-[#6b7280] text-sm font-serif hover:text-[#1a1a1a] transition-colors">← All tags</Link>
                  <span
                key={eachTag.id}
                className="inline-block w-fit bg-[#f3f0ff] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full"
                    >
                        #{eachTag.name.toLowerCase()}
                 </span>
                 <p
                 className="text-[#6b7280] text-sm font-serif hover:text-[#1a1a1a] transition-colors"
                 >
                    {eachTag.posts.length} aritcles with {eachTag.name}
                 </p>
            </div>
            <div 
            className="flex flex-col gap-4 mt-8">
                {
                    eachTag.posts.map((eachpost)=> {
                        const{post} = eachpost
                        return (
                            <Link
                            to={`/post/${post.id}`}
                            className="flex flex-col gap-2"
                            >
                                      {/* Title */}
                <h1 className="text-xl font-bold font-serif text-[#1a1a1a] leading-tight">
                    {post.title}
                </h1>
                 <p className="text-[#6b7280] text-sm font-serif line-clamp-2 mb-4">
                                            {stripHtml(post.content).slice(0, 150)}...
                 </p>
                {/* Author + Date */}
                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[#e5e3df]">
                    <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {post.author.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-[#374151] text-sm font-medium font-serif">{post.author.username}</p>
                        <p className="text-[#9ca3af] text-xs font-serif">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {post.comments && ` · ${post.comments.length} comments`}
                        </p>
                    </div>
                </div>

                            </Link>
                        )
                    })
                }
            </div>
            
        </main>
    </div>
)
}
export default EachTagPage;