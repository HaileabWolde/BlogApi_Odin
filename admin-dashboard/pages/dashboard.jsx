import axios from "axios"
import Sidebar from "./aside"
import { useState, useEffect } from "react"

function Dashboard() {

  const [posts, setPosts] = useState(0)
  const [drafts, setDrafts] = useState(0)
  const [published, setPublished] = useState(0)

const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchAllPosts() {
        try {
            const response = await axios.get('http://localhost:3000/posts/all', {
                headers: { 'Authorization': `${localStorage.getItem('token')}` }
            })
            setPosts(response.data.allPost)
            setPublished(response.data.publishedPost.length)
            setDrafts(response.data.draftPost.length)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false) // ← runs whether success or error
        }
    }
    fetchAllPosts()
}, [])
  return (
    <div className="min-h-screen bg-[#0a0a0a] grid grid-cols-[320px_1fr]">
      
    <Sidebar/>

      <div className="px-8 py-8 flex flex-col gap-8 w-full">
          <div className="flex justify-between items-center">
              <div className="">
                  <p className="text-white text-lg font-serif">Posts</p>
                  <p className="text-[#555] text-sm mt-1 font-semibold">Manage and Publish Your Articles</p>

              </div>
              <button
              className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium cursor-pointer transition-colors"
              >
                  New Post
              </button>
          </div>
          <div className="grid grid-cols-3  gap-4 ">
              <div
              className="border-2 bg-[#111111] border-[#2a2a2a]  p-6 text-gray-100 placeholder-[#666] rounded-lg flex flex-col gap-2"
              >
              
              <p className="text-[#555] text-xs font-medium tracking-widest">TOTAL POSTS</p>
              <p className="text-white text-3xl font-semibold">{loading ? '—' : posts.length}</p>
              </div>
              <div
                className="border-2 bg-[#111111] border-[#2a2a2a]  p-6 text-gray-100 placeholder-[#666] rounded-lg flex flex-col gap-2"
              >
                  <p className="font-serif">PUBLISHED</p>
                <p className="text-green-400 text-3xl font-semibold">{loading ? '—' : published}</p>

              </div>
              <div
               className="border-2 bg-[#111111] border-[#2a2a2a]  p-6 text-gray-100 placeholder-[#666] rounded-lg flex flex-col gap-2"
              >
                <p className="font-serif">DRAFTS</p>
                <p className="text-[#888] text-3xl font-semibold">{loading ? '—' : drafts}</p>
              </div>
          </div>
          <div
          className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden"
          >
            <table
            className="w-full"
            >
                <thead >
                        <tr className="border-b border-[#1e1e1e] w-full justify-between">
                              <th className="px-5 py-3 text-[#555] text-xs  uppercase tracking-widest font-black">Title</th>
                              <th className=" px-5 py-3 text-[#555] text-xs font-black uppercase tracking-widest">Date</th>
                                   <th className=" px-5 py-3 text-[#555] text-xs  uppercase tracking-widest font-black">Status</th>
                               <th className=" px-5 py-3 text-[#555] text-xs  uppercase tracking-widest font-black">Actions</th>
                       </tr>
                </thead>
                
                  {
                    loading ? '-' : 
                    
                    <tbody>
                           {posts.map(post => (
                    <tr key={post.id} className="border-b border-[#161616] last:border-0 hover:bg-[#161616] transition-colors">
                            <td className="px-5 py-4 text-[#eee] text-sm font-medium">{post.title}</td>
                            <td className="px-5 py-4 text-[#444] text-xs">
                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-5 py-4 w-32">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block w-full ${
                                    post.published 
                                ? 'bg-green-950 text-green-400' 
                                : 'bg-[#1c1c1c] text-[#555] '
                                  }`}>
                                     {post.published ? 'Published' : 'Draft'}
                                   </span>
                          </td>
                        <td className="px-5 py-4">
                              <div className="flex gap-3">
                                   <button className="text-[#555] hover:text-white text-xs transition-colors">Edit</button>
                                   <button className="text-[#555] hover:text-red-400 text-xs transition-colors">Delete</button>
                                 <button className={`text-xs transition-colors ${
                                        post.published 
                                        ? 'text-[#555] hover:text-yellow-400' 
                                       : 'text-violet-500 hover:text-violet-400'
                                     }`}>
                                        {post.published ? 'Unpublish' : 'Publish'}
                                   </button>
                             </div>
                    </td>
                </tr>
            ))}
                      </tbody>
                     
                  }
          
      
            </table>
          </div>
      </div>
    </div>
  )
}
export default Dashboard