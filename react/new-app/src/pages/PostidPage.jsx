import React, {useState, useEffect} from "react";
import Loader from "../components/UI/Loader/Loader";
import PostService from "../API/PostService";
import { useParams } from "react-router-dom"; // нужкен для того, чтобы выцепить динамическую часть пути из роутинга (в нашем случае :id)
import { useFetching } from "../hooks/useFetching"; // наш кастомный хук для обработки кейса (получения данных, процесса загрузки и обработки ошибки)

function PostidPage() {
  const params = useParams(); // вернет {id: '7'}
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  // получим наш пост по айдишнику с сервера
  const [fetchPostByID, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  // получим коментарии к данному посту с срвера
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    console.log(response);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostByID(params.id);
    fetchComments(params.id);
  }, [])


  return (
    <div>
      <h1 style={{fontSize: 50, color: 'green'}}>Вы открыли страницу поста ID = {params.id}</h1>
      {isLoading 
        ? <Loader/>
        : <div>{post.id}{post.title}</div>
      }

      <h1>Комментарии</h1>
      {isComLoading 
        ? <Loader/>
        : <div>
          {comments.map(comm =>
            <div style={{marginTop: 20}}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>  
            </div>
          )}
        </div>
      }

    </div>
  )


  //! реализация в лоб без части нашего функционала, без нашего кастомного хука useFetching )))
  // const params = useParams(); // вернет {id: '7'}
  // const [isLoading, setIsLoading] = useState(false);
  // const [post, setPost] = useState({});

  // async function foo() {
  //   setIsLoading(true);
  //   const response = await PostService.getById(params.id);
  //   setPost(response.data);
  //   setIsLoading(false);
  // }

  // // понадобился нам чтобы произвести анимацию процесса загрузки и прервать ее после подгрузки данных
  // useEffect(() => {
  //   foo();
  // }, []);

  // return (
  //   <div>
  //     <h1 style={{fontSize: 50, color: 'green'}}>Вы открыли страницу поста ID = {params.id}</h1>
  //     {isLoading 
  //       ? <Loader/>
  //       : <div>{post.id}{post.title}{post.body}</div>
  //     }
  //   </div>
  // )
}

export default PostidPage;