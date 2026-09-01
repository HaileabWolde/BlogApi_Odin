import { useParams, Link } from "react-router-dom";
function Aside(){
    const {id} = useParams()

    return (
        <header
            className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e3df] px-8 py-8 flex justify-between items-center z-10"
            >
                  <Link to="/" className="text-[#1a1a1a] font-semibold font-serif text-lg no-underline">✦ DevBlog</Link>
                { id ?
                    <p className="text-sm font-serif text-[#666] cursor-pointer">Back To posts</p>
               
                :
                     <span className="flex gap-4 items-center cursor-pointer">
                    <p className="text-md font-serif text-[#666] ">Posts</p>
                    <p className="text-md font-serif text-[#666] ">Tags</p>
                    <Link
                    to="/login"
                    className="bg-[#1a1a1a] text-white px-4 py-1 rounded-lg shadow-2xl font-serif cursor-pointer"
                    >
                        Sign In
                    </Link>
                </span>
                }
               

            </header>
    )
      
}
export default Aside;