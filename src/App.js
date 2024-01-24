
import './App.css';
import { useContext,useEffect } from 'react';
import { AppContext } from './ContextAPI/AppContext';
import Home from './Pages/Home';
import { Route, Routes,useSearchParams, useLocation } from 'react-router-dom';
import BlogPage from './Pages/BlogPage'


function App() {
  const {fetchBlogPosts}=useContext(AppContext);
  const [searchParams, setSearchParams]=useSearchParams();
  const location=useLocation();

  useEffect(()=>{
    const page= searchParams.get("page");
    if(location.pathname.includes("tags")){
      const tag=location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),tag);
    }else if(location.pathname.includes("categories")){
      const category=location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }
  },[location.pathname, location.search]);
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/blog/:blogId' element={<BlogPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
