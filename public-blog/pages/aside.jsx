import {Link, useNavigate} from "react-router-dom";
function Aside(){
    const navigate = useNavigate()
     const token = localStorage?.getItem('token')
        let payload 
     if (token && token.split('.')[1]) {
       payload = JSON.parse(atob(token.split('.')[1]));
      // ... your routing or guard logic
    }
    function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
}
    return (
        <header
            className="sticky top-0 bg-[#faf9f7] border-b border-[#e5e3df] px-8 py-8 flex justify-between items-center z-10"
            >
                  <Link to="/" className="text-[#1a1a1a] font-semibold font-serif text-lg no-underline">✦ DevBlog</Link>
              
                     <span className="flex gap-4 items-center justify-center cursor-pointer">
                    <p className="text-md font-serif text-[#666] ">Posts</p>
                    <Link
                    to="/allTags" 
                    className="text-md font-serif text-[#666] ">Tags</Link>
                    {
                        payload ?
                        <>
                            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-lg font-serif">
                             {payload.username.charAt(0)}
                             </div>
                            <button
                            type="button"
                             className="bg-[red] text-white px-4 py-1 rounded-lg shadow-2xl font-serif cursor-pointer"
                            onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </> 
                         
                             : 
                        <Link
                        to="/login"
                         className="bg-[#1a1a1a] text-white px-4 py-1 rounded-lg shadow-2xl font-serif cursor-pointer"
                         >
                        Sign In
                    </Link>
                    }
                   
                </span>

            </header>
    )
      
}
export default Aside;