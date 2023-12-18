import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Bookmark = () => {
  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const likedPostsByCurrentUser = user?.likedPosts || [] as string[];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/bookmarked", {"withCredentials" : true});
        console.log(res.data);  // comment 
        setPosts(res.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  

  console.log("Bookmarked Posts:", posts); // comment 

  return (
    <div>
    {posts.map(({_id, userId, title, body, tags, likes, createdAt, updatedAt }: {  
    _id: string; userId: string; title: string; body: string; tags: string[]; likes: number; createdAt: string; updatedAt: string; }) => (
      <PostCard
      key={_id}
      _id={_id}
      userId={userId}
      title={title}
      body={body}
      tags={tags}
      likes={likes}
      isLiked = {likedPostsByCurrentUser.includes(_id) ? true : false}
      isSaved = {true} 
      createdAt={createdAt} updatedAt={updatedAt}    />
  ))}
  </div>

  )
}

export default Bookmark