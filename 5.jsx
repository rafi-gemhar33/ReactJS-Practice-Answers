import React, { useState, useEffect } from "react";

/**
 *
 * Making a GET request to "https://jsonplaceholder.typicode.com/posts/<postId>"
 * will return the details of a random post
 *
 * On load, fetch the post with post id 1 and display
 * the post title and body
 *
 * When the user clicks "Fetch new post", fetch
 * the next post (sequentially) and display it
 * below the existing list of posts
 *
 * Note: The range of values for postId is
 * 1-100 (inclusive). Disable the button when
 * postId is 100.
 */
const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  return data;
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [currId, setCurrId] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPost(1).then((post) => {
      setPosts([post]);
      setCurrId(2);
    });
  }, []);

  const handleClick = () => {
    setLoading(true);
    try {
      setLoading(true);
      fetchPost(currId).then((post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
        setCurrId((prevId) => prevId + 1);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      <button disabled={loading || currId > 100} onClick={handleClick}>
        Fetch next post
      </button>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <h1>Title {post.title}</h1>
            <span>{post.body}</span>
          </div>
        ))
      ) : (
        <p>No posts available :)</p>
      )}
    </>
  );
}
