import { useParams } from "react-router-dom";
function Aside(){
    const {id} = useParams()

    return (
        <header
            className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 border-b-2 border-[#e5e3df]"
            >
                <h1 className="font-serif font-semibold">DevBlog</h1>
                { id ? <span>
                    <p>Back To Posts</p>
                </span>
                :
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
                }
               

            </header>
    )
      
}
export default Aside;