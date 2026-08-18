import { useState } from "react"
function Login() {
  //const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

  }

  
const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf9f7]">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5 w-full max-w-md mx-4">
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
            onClick={handleSubmit}
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