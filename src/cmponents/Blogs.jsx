import { useContext } from "react"
import { AppContext } from "../ContextAPI/AppContext"
import BlogsDetails from "./BlogsDetails"
function Blogs() {
    const {posts, loading} = useContext(AppContext);
  return (
    <div>
        {loading ? (<div>Loaging</div>)
        : (
            posts.length===0 ? (
                <div>
                    <p>No bloggs found</p>
                </div>)
                :(
                   posts.map((post)=>(
                    <BlogsDetails key={post.id} post={post}/>
                   )) 
                )
            )
        }
    </div>
  )
}

export default Blogs