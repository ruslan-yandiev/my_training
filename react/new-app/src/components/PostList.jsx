import React from "react";
import { Postitem } from "./Postitem";

function PostList({ posts, title }) {
  return (
    <div>
      <h1>{title}</h1>
      {posts.map((post) => (
        <Postitem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
