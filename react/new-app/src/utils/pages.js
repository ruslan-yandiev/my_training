export const getPageCount = (totalCount, limit) => {
    // вычислим количество постов на одной странице и округлим в большую сторону.
    return Math.ceil(totalCount / limit);
}

export function getPagesArray(totalPages) {
  const result = [];

  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }

  return result;
}