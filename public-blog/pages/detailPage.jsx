import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function stripHtml(html) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
}

function DetailPage(){
    const navigate = useNavigate()
    const token = localStorage?.getItem('token')
    let payload 
 if (token && token.split('.')[1]) {
   payload = JSON.parse(atob(token.split('.')[1]));
  // ... your routing or guard logic
}
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchPost(){
            try{
                const response = await axios.get(`http://localhost:3000/post/${id}`)
                setPost(response.data.Post)
            }
            catch(error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [id])

    ///handle comment submission
    async function  handleComment(event){
        event.preventDefault()

        try{
            await axios.post(`http://localhost:3000/post/${id}/comment/add`, 
                {comment},
                  { headers: { 'Authorization': `${localStorage.getItem('token')}` } }
            )
            navigate('/')
        }   
        catch(error){
            console.log("error", error)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Loading...</p>
        </div>
    )

    if (!post) return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
            <p className="text-[#9ca3af] font-serif">Post not found</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#faf9f7]">

            {/* Navbar */}
            <nav className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e3df] px-8 py-4 flex justify-between items-center z-10">
                <Link to="/" className="text-[#1a1a1a] font-semibold font-serif text-lg no-underline">✦ DevBlog</Link>
                <Link to="/" className="text-[#6b7280] text-sm font-serif hover:text-[#1a1a1a] transition-colors">← Back to posts</Link>
            </nav>

            <article className="max-w-2xl mx-auto px-6 py-16">

                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {post.tags.map((singletag) => {
                        const { tag } = singletag
                        return (
                            <span
                                key={singletag.tagId}
                                className="bg-[#f3f0ff] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full"
                            >
                                #{tag.name.toLowerCase()}
                            </span>
                        )
                    })}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold font-serif text-[#1a1a1a] leading-tight mb-6">
                    {post.title}
                </h1>

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

                {/* Cover Image */}
                {post.coverImageUrl && (
                    <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-72 object-cover rounded-xl mb-12"
                    />
                )}

                {/* Article Body */}
                <div
                    className="prose prose-lg prose-gray max-w-none font-serif"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Comments Section */}
                <div className="mt-16 pt-12 border-t border-[#e5e3df]">
                    <h3 className="text-lg font-semibold font-serif text-[#1a1a1a] mb-8">
                        {post.comments?.length || 0} Comments
                    </h3>

                    {/* Comment list */}
                    <div className="flex flex-col gap-6">
                        {post.comments?.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#f3f4f6] border border-[#e5e3df] flex items-center justify-center text-[#6b7280] text-sm font-semibold flex-shrink-0">
                                    {comment.author?.username?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-[#374151] text-sm font-medium font-serif">{comment.author?.username}</p>
                                        <p className="text-[#9ca3af] text-xs">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <p className="text-[#6b7280] text-sm font-serif leading-relaxed">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Comment Form */}
                    <div className="mt-10 bg-white border border-[#e5e3df] rounded-xl p-6">
                        <p className="text-[#374151] text-sm font-medium font-serif mb-4">Leave a comment</p>
                        <textarea
                            placeholder="Write your comment..."
                            rows={4}
                            value={comment}
                            onChange={(e)=> {
                                setComment(e.target.value)
                            }}
                            className="w-full bg-[#faf9f7] border border-[#e5e3df] rounded-lg px-4 py-3 text-[#374151] text-sm font-serif placeholder-[#d1d5db] focus:outline-none focus:border-violet-400 resize-none transition-colors"
                        />
                        <div className="flex justify-between items-center mt-3">
                            {
                                payload ? 
                                 <button
                                type="button"
                                onClick={(event)=>handleComment(event)}
                                className="bg-[#1a1a1a] hover:bg-[#333] text-white px-5 py-2 rounded-lg text-sm font-serif transition-colors cursor-pointer"
                            >
                                Post comment
                            </button>:  <p className="text-[#9ca3af] text-xs font-serif">Sign in to comment</p>
                            }
                            
                           
                        </div>
                    </div>
                </div>

            </article>
        </div>
    )
}

export default DetailPage;