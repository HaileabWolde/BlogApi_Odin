import { useEffect, useState } from "react"
import axios, { all } from "axios"

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
    return (
        <div className="min-h-screen bg-[#faf9f7] p-8">
            <header
            className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 border-b-2 border-[#e5e3df]"
            >
                <h1 className="font-serif font-semibold">DevBlog</h1>
                <span className="flex gap-4 items-center cursor-pointer">
                    <p className="text-md font-serif text-[#666] ">Posts</p>
                    <p className="text-md font-serif text-[#666] ">Tags</p>
                    <button
                    type="button"
                    className="bg-[#1a1a1a] text-white px-4 py-1 rounded-lg shadow-2xl font-serif"
                    >
                        Sign In
                    </button>
                </span>

            </header>
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
           className="max-w-6xl mx-auto py-8 flex flex-col"
            >
                {
                    allPost && allPost.map((post)=> {
                        const {content, coverImageUrl, createdAt, title, tags, author} = post
                        return (
                            <div
                            key={post.id} 
                           className="grid grid-cols-[1fr_280px] gap-8 py-6 border-b border-[#e5e3df]">
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
                                    
                               
                            </div>
                        )
                    })
                }
            </main>

        </div>
    )
}
export default Home