import React, { useState, useEffect } from "react";

/**
 * Using `fetch` api fetch posts listed at
 * "https://jsonplaceholder.typicode.com/posts/"
 *
 * While the request is in progress, display
 * the text "Loading"
 *
 * Once the posts are fetched, display the
 * title and body
 */

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "GET",
      mode: "cors"
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
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
