 import axios from 'axios';
 import { useNavigate, useParams } from 'react-router-dom';
 import { useEffect } from 'react';
 import ReactQuill from 'react-quill-new';
 import 'react-quill-new/dist/quill.snow.css'; // Import default layout theme

 function Form_post({formData, setFormData, error, setError}){
  
  const {id} = useParams()


  useEffect(()=> {
    if(id && id != null){
      console.log(id)
    }
  }, [id])

  const navigate = useNavigate();
    /*event handlers*/
async function handleSubmit(e, draft) {
    e.preventDefault()
    
    try {
        const isPublished = draft === "published"
        const dataPayload = new FormData()
        dataPayload.append('title', formData.title)
        dataPayload.append('tags', formData.tags)
        dataPayload.append('content', formData.content)
        dataPayload.append('published', isPublished)
        
        if (formData.image) {
            dataPayload.append('image', formData.image)
        }

        const response = await axios.post('http://localhost:3000/api/posts/add',
            dataPayload,
            {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            }
        )

        console.log(response.data) // ← check what comes back
        navigate('/dashboard')

    } catch(error) {
        console.log(error.response?.data) // ← this will tell you what's failing
        setError(error.response?.data?.message || 'Something went wrong')
    }
}


    const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({...formData, [name]: value});
 };
 const handleImageChange = (e) => {
  const selectedFile = e.target.files[0]; // Get the actual file
     setError('');

    if (!selectedFile) return;

    // Validation: Limit to JPEG and PNG
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only JPEG and PNG files are allowed.');
      return;
    }

    // Validation: Limit size to 2MB
    const maxSize = 5 * 1024 * 1024; 
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 5MB.');
      return;
    }
  setFormData(prev => ({
    ...prev,
    image: selectedFile
  }));
};
return (
    <form 
            className="flex flex-col gap-4 p-20 w-full max-w-4xl justify-self-center ">
                <div className="flex justify-between">
                        <h1 className="text-white font-medium text-xl font-serif">New Post</h1>
                        <span className="flex gap-2">
                            <button 
                            type="button"
                          onClick={(e)=> handleSubmit(e, "draft")}
                            className=" px-6 py-2 rounded-lg shadow-2xl bg-[#1f1f1f] text-white text-md cursor-pointer border-[#2a2a2a]  hover:scale-110">
                                    <p>Save Draft</p>
                            </button>
                            <button
                           type="button"
                            onClick={(e)=> handleSubmit(e, "published")}
                            className="px-6 py-2 rounded-lg shadow-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-serif cursor-pointer hover:scale-110"
                            >
                                <p>Publish</p>
                            </button>
                        </span>
                </div>
                <label
              htmlFor="title"
              className="block text-[#666] text-sm font-medium  font-serif tracking-wide"
            >
              Title
            </label>
              
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title..."
              className="w-full font-sans border-2 bg [#111111] border-[#2a2a2a] rounded-2xl px-5 py-3.5 text-gray-100 placeholder-[#666] 
                         "
            />
            <div className="w-full grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <label
                    htmlFor="tags"
                    className="block text-[#666] text-sm font-medium  font-serif tracking-wide"
                    >
                        Tags
                    </label>
                    <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Javascript, nodejs, react"
              className="w-full font-sans border-2 bg [#111111] border-[#2a2a2a] rounded-2xl px-5 py-3.5 text-gray-100 placeholder-[#666] 
                         "
            />
                </div>
            <div className="flex flex-col gap-2">
                     <label
                         htmlFor="image"
                            className="block text-[#666] text-sm font-medium font-serif tracking-wide"
                        >
                                 Cover Image (optional)
                        </label>

                      <input
                        type="file"
                        name="image"
                        accept="image/jpeg, image/png"
                          onChange={handleImageChange}
                        className="w-full font-sans border-2 bg-[#111111] border-[#2a2a2a] rounded-2xl px-5 py-3.5 file:text-[#666]"
                     />

                 {error && (
                        <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">
                            {error}
                         </p>
                 )}
                </div>
            </div>
    <ReactQuill    
      theme="snow"
          placeholder="Write something amazing..."
         onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      content: value,
    }))
  }
      />
            </form>
)
 }
 export default Form_post
 