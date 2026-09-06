import {Link, useNavigate} from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import {FaXmark } from "react-icons/fa6";
import { useState } from "react";
function Aside(){
    const [isOpen, setIsOpen] = useState(false);

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
                    <FaBars
                     onClick={() => setIsOpen(!isOpen)}
                    className="justify-self-end self-end cursor-pointer sm:hidden" 
                    size={24} color="#333" />
                    <nav
                    className={`flex flex-col  gap-4 absolute p-8 top-0 left-0 w-screen  z-20 bg-[#faf9f7]  shadow-2xl border-l-2 border-solid border-blue-500  ${
        isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out sm:hidden`}
                    >
                       <Link
                       to="/" 
                       className="text-md font-serif text-[#666] cursor-pointer">Posts</Link>
                        <Link to="/allTags" className="text-md font-serif text-[#666]" 
                        onClick={() => setIsOpen(false)}>Tags</Link>
                          <FaXmark
                          className="absolute right-6 top-6 cursor-pointer font-extrabold"
                          onClick={()=>setIsOpen(!isOpen)} 
                          size={24} color="#333" />
                    {payload ? (
                        <>
                          <div className="flex items-center gap-3">
                                 <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-serif">
                                      {payload.username.charAt(0)}
                                 </div>
                                 <p className="text-sm font-serif text-[#666]">{payload.username}</p>
                             </div>
                         <button
                         type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-serif cursor-pointer w-fit"
                             onClick={handleLogout}
                            >
                             Logout
                     </button>
             </>
             ) : (
                  <Link
                     to="/login"
                     className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg font-serif cursor-pointer w-fit"
                     onClick={() => setIsOpen(false)}
              >
                 Sign In
              </Link>
             )}
                    </nav>
                     <span className="hidden sm:flex gap-4 items-center justify-center cursor-pointer">
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