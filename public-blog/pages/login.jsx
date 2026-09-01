import { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Login() {
  //const [count, setCount] = useState(0)
  const [isregister, setRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confrimpassword: ''
  })
const [error, setError] = useState('')
const navigate = useNavigate()

async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    let response;

    if (isregister) {
      // Optional but recommended: check passwords match
      if (formData.password !== formData.confrimpassword) {
        setError("Passwords do not match");
        return;
      }

      response = await axios.post("http://localhost:3000/signup", formData);

      // Clear the whole form after successful signup
      setFormData({
        username: "",
        password: "",
        confrimpassword: "",
      });

      setRegister(false); // switch back to login mode
      // navigate("/login"); // only if you really need it
      return;
    } else {
      // Login – only send username + password
      response = await axios.post("http://localhost:3000/login", {
        username: formData.username,
        password: formData.password,
      });
    }

    const { token } = response.data;

    // Decode token (optional safety check)
    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      setError("Token expired");
      return;
    }

    // Success
    localStorage.setItem("token", token);

    // Clear form after successful login too
    setFormData({
      username: "",
      password: "",
      confrimpassword: "",
    });

    navigate('/')
  } catch (err) {
    const message =
      err.response?.data?.msg ||
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";

    setError(message);
    console.error(err);
  }
}
  
const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };

 const handleregister = ()=>{
    setRegister((prev)=> !prev)
 }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf9f7]">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5 w-full max-w-md mx-4">
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
          {
            isregister && 
            <div
            
            >
                <label
              htmlFor="confrimpassword"
              className="block text-sm font-medium mb-2 text-gray-700 font-serif tracking-wide"
              >Confrim Password</label>
                <input
              id="confrimpassword"
              name="confrimpassword"
              type="password"
              value={formData.confrimpassword}
              onChange={handleInputChange}
              placeholder="Confrim Your Password"
              className="w-full border-2 border-[#54ACDB]/80 rounded-2xl px-5 py-3.5 text-gray-800 placeholder-gray-400 
                         bg-white/50 focus:outline-none focus:border-[#54ACDB] focus:ring-4 focus:ring-[#54ACDB]/15 
                         transition-all duration-200"
            />

            </div>
          }

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                       transition-all duration-200 py-3.5 rounded-2xl font-semibold text-lg text-white 
                       shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 
                       hover:-translate-y-0.5 active:translate-y-0"
          >
          
            {
                isregister ? <p>Register</p>: <p>SIGN IN</p>
            }
         
           
          </button>
          {isregister ? (
                <p className="text-center text-sm text-gray-600 mt-5">
                         Already have an account?{" "}
                 <span
                onClick={handleregister}
                 className="text-[#54ACDB] font-medium cursor-pointer hover:text-[#3d8fbe] hover:underline underline-offset-2 transition-colors duration-200"
                >
                 Sign in here
                    </span>
                </p>
            ) : (
             <p className="text-center text-sm text-gray-600 mt-5">
                Don't have an account?{" "}
                <span
                 onClick={handleregister}
                 className="text-[#54ACDB] font-medium cursor-pointer hover:text-[#3d8fbe] hover:underline underline-offset-2 transition-colors duration-200"
                >
                     Register here
                 </span>
                </p>
                )}
        </form>
      </div>
    </div>
  )
}

export default Login