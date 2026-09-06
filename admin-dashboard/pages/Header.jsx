import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
function Header({isOpen, setIsOpen}){
    //token fetching
      const token = localStorage.getItem('token')
      const decoded = JSON.parse(atob(token.split('.')[1])) 

    return (
        <header
    className=" sm:hidden bg-[#111111] border-b border-[#2a2a2a] p-8 flex justify-between items-center"
    >
       <Link to="/" className="text-[white] font-semibold font-serif text-lg no-underline">✦ DevBlog</Link>
        <div
        className="flex items-center gap-4"
        >
          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-lg font-lg font-serif">
              {decoded.username.charAt(0)}
            </div>
            <FaBars
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer sm:hidden" 
                size={24} color="white" />
            
        </div>
      </header> 
    )
}
export default Header;