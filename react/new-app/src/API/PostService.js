import axios from "axios"; // библиотека для запросов на сервер

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    // отлавливать ошибки на уровне сервиса не очень хорошо, лучше обработать ее вне, но все же пока оставим
    // чтобы не добавлять параметры запроса прямо в адрес запроса, библиотека axios позволяет нам передать объект с параметрами вторым аргументом
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page
      }
    });
    return response;
  }
}