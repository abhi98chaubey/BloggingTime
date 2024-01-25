import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../Components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
            setLoading(false);
        }
    })
    if (loading) {
        // Loading animation or placeholder content
        return (
          <div className="w-full py-8 mt-4 text-center">
            <Container>
              <div className="flex flex-wrap">
                <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">Loading...</h1>
                </div>
              </div>
            </Container>
          </div>
        );
      }
  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
</div>

  )
}

export default AllPosts