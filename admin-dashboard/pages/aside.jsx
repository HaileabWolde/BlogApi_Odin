import { NavLink } from "react-router-dom";
function Sidebar (){
  const token = localStorage.getItem('token')
  const decoded = JSON.parse(atob(token.split('.')[1]))
   
  // These must be defined inside the component
  const baseClasses =
    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors";
  const inactiveClasses = "text-[#666] hover:text-white hover:bg-[#1a1a1a]";
  const activeClasses = "bg-[#1f1f1f] text-white";
    return (
          <aside className="bg-[#111111] border-r border-[#2a2a2a] flex flex-col p-3">
        <div className="px-3 py-2 mb-6">
          <p className="text-white font-medium text-sm">My blog</p>
          <p className="text-[#555] text-xs mt-1">Admin dashboard</p>
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
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 text-sm w-full hover:bg-[#1a1a1a] transition-colors">
            Log out
          </button>
        </div>
      </aside>
    )
}
export default  Sidebar