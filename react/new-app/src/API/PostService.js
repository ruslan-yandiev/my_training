import axios from "axios"; // библиотека для запросов на сервер

export default class PostService {
  static async getAll() {
    // отлавливать ошибки на уровне сервиса не очень хорошо, лучше обработать ее вне, но все же пока оставим
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    } catch(error) {
      console.log(error);
    }
  }
}