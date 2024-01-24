import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post}) => {
  return (
    <div className='mt-[50px]'>
      <NavLink to={`/blog/${post.id}`} >
      <span className="block text-2xl font-bold underline">{post.title}</span>

      </NavLink>
      <p>
        By
        <span className=" font-bold"> {post.author} </span>
        on {" "}
        <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
            <span>{post.category}</span>
        </NavLink>
      </p>
      <p> Posted on {post.date} </p>
      <p> {post.content}</p>
      <div>
        {post.tags.map( (tag, index) => (
            <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                <span>{`#${tag}`}</span>
            </NavLink>
        ) )}
      </div>
    </div>
  )
}

export default BlogDetails
