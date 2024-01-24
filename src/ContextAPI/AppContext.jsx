import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../baseUrl"

export const AppContext = createContext();

export default function AppContextProvider({children}){
const [posts,setPosts]=useState([]);
const [loading,setLoading]=useState(false);
const [page, setPage]=useState(1);
const [totalPages, setTotalPages]=useState(null);
const navigate=useNavigate();

//fetch blog data
const fetchBlogPosts=async (page=1, tag=null,category)=>{
    setLoading(true);
    let url=`${baseUrl}?page=${page}`;
    if(tag){
        url+=`&tag=${tag}`;
    }
    if(category){
        url+=`&category=${category}`;
    }
    try{
        const res= await fetch(url);
        const data=await res.json();
        if(!data.posts || data.posts.length===0){
            throw new Error("Something going to wrong");
        }
            console.log("api",data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }catch(error){
             setPage(1);
             setPosts([]);
             setTotalPages(null);
        }
    setLoading(false);
};

//handle next and prevois page

const handlePageChange=(page)=>{
    navigate({search:`?page=${page}`});
    setPage(page);
};

const value ={
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
};

return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}