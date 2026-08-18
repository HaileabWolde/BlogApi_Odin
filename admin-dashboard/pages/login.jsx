import { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Login() {
  //const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
const [error, setError] = useState('')
const navigate = useNavigate()

async function  handleSubmit (e) {
   e.preventDefault()
    setError('')

   try{
      const response = await axios.post('http://localhost:3000/login', formData)
    
      const {token , role } = response.data
      if (role !== 'AUTHOR' && role !== 'ADMIN') {
                // Valid user but not an author
                setError('You are not authorized to access this dashboard')
                return
            }

            // Success — save token and redirect
            localStorage.setItem('token', token)
            navigate('/dashboard')

   }
   catch(err){
   const message =
      err.response?.data?.msg ||
      err.response?.data?.message ||
      err.message ||
      'Something went wrong'

    setError(message)
    console.error(err) // useful while debugging
   }
   
  }

  
const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf9f7]">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5 w-full max-w-md mx-4">
        <h1 className="text-[red] text-xl font-serif font-semibold mb-6">Admin login</h1>
        {error && (
                    <p className="text-red-400 text-sm mb-4 bg-red-400/10 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-700 font-serif tracking-wide"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter username"
              className="w-full border-2 border-[#54ACDB]/80 rounded-2xl px-5 py-3.5 text-gray-800 placeholder-gray-400 
                         bg-white/50 focus:outline-none focus:border-[#54ACDB] focus:ring-4 focus:ring-[#54ACDB]/15 
                         transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-700 font-serif tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full border-2 border-[#54ACDB]/80 rounded-2xl px-5 py-3.5 text-gray-800 placeholder-gray-400 
                         bg-white/50 focus:outline-none focus:border-[#54ACDB] focus:ring-4 focus:ring-[#54ACDB]/15 
                         transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                       transition-all duration-200 py-3.5 rounded-2xl font-semibold text-lg text-white 
                       shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login