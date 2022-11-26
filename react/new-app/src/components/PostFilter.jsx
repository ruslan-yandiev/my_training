import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

function PostFilter({filter, setFilter}) {
    return (
      <div>
        <MyInput value={filter.query} onChange={event => setFilter({...filter, query: event.target.value})} type='text' placeholder='Поиск...'/>

        <MySelect
          value={filter.sort}
          // {/*тут select возвращает не опцию, а выбранный алгоритм сортировки*/}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>
    )
}

export default PostFilter;