import { useMemo } from "react";

// Отсортировываем массив постов
export const useSortedPosts = (posts, sort) => {
  return useMemo(() => sort ? [...posts].sort((a, b) => a[sort].localeCompare(b[sort])) : posts, [sort, posts]); // localeCompare - функуия используется для сравнения строк при сортировке. sort изменяет объект при вызове, по этому делаем копию [...obj]
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  // Отфильтровываем отсортированный массив постов
  return useMemo(() => sortedPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase())), [query, sortedPosts]);
};