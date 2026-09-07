import { useNavigate } from "react-router-dom";
import {FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
function Mobile_Responsvie({ isOpen, setIsOpen}){
  const navigate = useNavigate();


    //token fetching
  const token = localStorage.getItem('token')
  const decoded = JSON.parse(atob(token.split('.')[1])) 
   // These must be defined inside the component
  const baseClasses =
    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors";
  const inactiveClasses = "text-[#666] hover:text-white hover:bg-[#1a1a1a]";
  const activeClasses = "bg-[#1f1f1f] text-white";

    
  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/login')
  }
return (
     <div
    className={`flex flex-col gap-4 fixed inset-y-0 left-0 w-72 z-20
  bg-[#111111] shadow-2xl border-r border-[#2a2a2a]
  px-4 py-8
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  transition-transform duration-300 ease-in-out lg:hidden`}
    >
       <FaXmark
            className="absolute right-6 top-6 cursor-pointer font-extrabold"
            onClick={()=>setIsOpen(!isOpen)} 
            size={24} color="white" />
             <p 
             to="/" 
             className="text-[white] font-semibold font-serif text-lg no-underline">Menu</p>
            <div className="border-2 bg-[#111111] border-[#2a2a2a] shadow-lg flex items-center gap-2.5 px-3 py-2 rounded-lg">
                     <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-lg font-serif">
                             {decoded.username.charAt(0)}
                     </div>
                    <div>
                          <p className="text-[#ccc] text-xs font-medium">{decoded.username.toUpperCase()}</p>
                         <p className="text-[#555] text-xs">Author</p>
                 </div>
          </div>
           <nav className="flex flex-col gap-0.5 flex-1">
          <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Posts
        </NavLink>

        <NavLink
          to="/posts/new"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          New post
        </NavLink>

        <NavLink
          to="/comments"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Comments
        </NavLink>
        </nav>

         {/* User + logout */}
        <div className="border-t border-[#2a2a2a] pt-3 mt-3">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-lg font-serif">
              {decoded.username.charAt(0)}
            </div>
            <div>
              <p className="text-[#ccc] text-xs font-medium">{decoded.username.toUpperCase()}</p>
              <p className="text-[#555] text-xs">Author</p>
            </div>
          </div>
          <button
          type="button"
          onClick={handleLogout} 
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 text-sm w-full hover:bg-[#1a1a1a] transition-colors cursor-pointer">
            Log out
          </button>
        </div>
      </div> 
)
}
export default Mobile_Responsvie