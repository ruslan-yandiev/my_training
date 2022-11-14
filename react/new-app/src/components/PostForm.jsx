import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ updateData }) => {
  const [post, setPost] = useState({ title: "", body: "" });
  // const bodyInputRef = useRef(); // с помощью этого хука мы можем получить доступ к DOM элементу и уже у этого DOM элемента забрать value

  function addNewPost(event) {
    event.preventDefault();

    updateData(post); //! мы не изменяем состояние напрямую а используем для этого хук. Важная концепция !!!!!!!!!!!!!
    setPost({ title: "", body: "" });
    // console.log(bodyInputRef.current.value);
  }

  return (
    <form>
      {/*//!Управляемые компоненты*/}
      <MyInput value={post.title} type="text" placeholder="Название поста" onChange={(event) => setPost({ ...post, title: event.target.value })} />
      <MyInput value={post.body} type="text" placeholder="Описание поста" onChange={(event) => setPost({ ...post, body: event.target.value })} />

      {/*//!Не управляемые компоненты*/}
      {/*<MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" />*/}
      {/*<input ref={bodyInputRef} type="text" />*/}
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
};

export default PostForm;
