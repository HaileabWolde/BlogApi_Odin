import { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import Aside from "./aside"
function Home(){
  
    const [loading, setLoading] = useState(true)
    const [allPost, setPost] = useState(null)
    useEffect(()=>{
       async function fetchAllPosts() {
        try {
            const response = await axios.get('http://localhost:3000/posts/allPost')
            console.log(response.data)   
            setPost(response.data.allPost)    
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false) // ← runs whether success or error
        }
    }
    fetchAllPosts()
    }, [])
    function stripHtml(html) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
}
    return (
        <div className="relative min-h-screen bg-[#faf9f7]">
            <Aside/>
            <div
            className="flex flex-col items-center text-center gap-4 p-8 border-b-2 border-[#e5e3df]"
            >

              <p className="text-md font-serif text-[#666] ">A Blog FOR ETHIOPIAN DEVELOPERS</p>
              <h1 className="text-3xl font-bold font-serif text-[#1a1a1a]">
                Wirting about Web Development,
                <br></br>
                         tools, and the journey
              </h1>

               <p className="text-sm font-serif text-[#666] ">
                Practical articles on Node.js, React, PostgreSQL and everything in between.
                <br></br> 
                Written from Addis Ababa.
               </p>
            </div>
            <main
           className="max-w-7xl mx-auto py-8 flex flex-col"
            >
                {
                    allPost && allPost.map((post)=> {
                        const {content, coverImageUrl, createdAt, title, tags, author} = post
                        return (
                            <Link
                            to={`/post/${post.id}`}
                            key={post.id} 
                           className="flex flex-wrap px-4 gap-16 sm:grid sm:grid-cols-[1fr_280px] sm:gap-8 py-6 border-b border-[#e5e3df]">
                                <div
                                className="flex flex-col gap-4 justify-center"
                                >
                                         <span
                                    className="flex gap-4"
                                    >
                                        {
                                            tags.map((singletag)=> {
                                                const {tag} = singletag
                                                return (
                                                    <p
                                                 key={singletag.tagId}
                                                    className="text-sm font-serif text-[#7c3aed]"
                                                    >
                                                        {tag.name.toLowerCase()                         
                                                            .split(' ')                            
                                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
                                                        .join(' ')  }
                                                    </p>
                                                )
                                            })
                                        }
                                    </span>
                                    <h1 className="text-xl font-bold font-serif text-[#1a1a1a]">{title}</h1>
                                    <p className="text-[#6b7280] text-sm font-serif line-clamp-2">
                                            {stripHtml(content).slice(0, 150)}...
                                            </p>
                                    <div className="flex gap-4 items-center">
                                             <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-lg font-serif">
                                            {author.username.charAt(0)}
                                              </div>
                                              <p
                                              className="text-md font-serif text-[#666]"
                                              >
                                                {author.username}
                                              </p>
                                             
                                              <p
                                              className="text-md font-serif text-[#666]"
                                              >
                                                 {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric',  year: 'numeric'})}
                                              </p>
                                    </div>
                                    
                                </div>
                                
                                     {coverImageUrl ? (
                                            <img 
                                         src={coverImageUrl}
                                        alt={title}
                                         className="w-full h-48 object-cover rounded-xl"
                                             />
                                    ) : null}
                                    
                               
                            </Link>
                        )
                    })
                }
            </main>

        </div>
    )
}
export default Home