import Sidebar from "./aside"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios  from "axios";
function CommentPage(){
    const navigate = useNavigate()
    const[loading, setLoading] = useState(true)
    const [allcomment, setAllComment] = useState(null)
    console.log(allcomment)
    useEffect(()=>{ 
        async function fetchallComment(){
            try{
                     const response = await axios.get('http://localhost:3000/allcoments',{
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })
                     setAllComment(response.data.allComment)
            }
            catch(error){
                console.log("errror", error)
            }
            finally{
                setLoading(false)
            }
           
        } fetchallComment()
    }, [])
      if (loading) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Loading...</p>
        </div>
    )
async function handleDelete(event, id){
    event.preventDefault();
    try{
         await axios.delete(`http://localhost:3000/comment/delete/${id}`)
         navigate('/comments')
    }
    catch(error){
        console.log("error", error)
    }
   
}
return (
    <div
    className="min-h-screen bg-[#0a0a0a] grid grid-cols-[320px_1fr]"
    >
        <Sidebar/>
        {
    allcomment ? (
            <main className="px-8 py-16 flex flex-col gap-2">
                 {/* render the comments here */}
                  <h1 className="text-white text-lg font-serif">Comments</h1>
                   <p className="text-[#555] text-sm mt-1 font-semibold">Manage reader comments across all posts</p>
                    <div
                    className="border-2 bg-[#111111] border-[#2a2a2a]  p-6 text-gray-100 placeholder-[#666] rounded-lg flex flex-col gap-2"
                    >
              
                         <p className="text-[#555] text-xs font-medium tracking-widest">TOTAL POSTS</p>
                        <p className="text-white text-3xl font-semibold">{loading ? '—' : allcomment.length}</p>
              </div>
                 {/* map over allcomment, etc. */}
                 <div
                 className="flex flex-col gap-4 p-2"
                 >
                    {
                        allcomment.map((comment)=> {
                            const{username} = comment.author
                            const {createdAt, text, id} = comment
                            const {title} = comment.post
                            return (
                                <div
                                className="flex justify-between items-center border-2 bg-[#111111] border-[#2a2a2a]  p-6 text-gray-100 placeholder-[#666] rounded-lg"
                                >
                                    <div
                                    className="flex flex-col gap-2"
                                    >   
                                        <div className="flex items-center gap-2.5 ">
                                        <div className="w-7 h-7 rounded-full bg-[#1f1f1f]  flex items-center justify-center text-white text-lg font-lg font-serif">
                                             {username.charAt(0)}
                                        </div>
                                         <div>
                                              <p className="text-[#ccc] text-xs font-medium">{username.toUpperCase()}</p>
                                                <span
                                                className="text-[#555] text-sm mt-1 font-semibold flex gap-2"
                                                >
                                                    {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    <p className="text-green-400">On {title}</p>
                                                </span>
                                        </div>
                                       
                                     </div>
                                      <p className="text-[#ccc] text-sm mt-1 font-semibold ">
                                        {text}
                                     </p>
                                    </div>
                                    <button
                                    type="delete"
                                    onClick={(event)=>handleDelete(event, id)}
                                    className="bg-red-800 px-4 py-2 font-serif rounded-lg cursor-pointer"
                                    >
                                        Delete

                                    </button>
                                    
                                    
                                 </div>   
                            )
                        })
                    }
                 </div>
                </main>
         ) : (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
      <p className="text-white text-lg font-serif">Comment not found</p>
    </div>
    )
    }
        
    </div>
)
}
export default CommentPage;