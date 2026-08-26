import { useEffect, useState } from "react"
import axios from "axios"

function Home(){

    const [loading, setLoading] = useState(true)
    useEffect(()=>{
       async function fetchAllPosts() {
        try {
            const response = await axios.get('http://localhost:3000/posts/allPost')
            console.log(response.data)       
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

        </div>
    )
}
export default Home