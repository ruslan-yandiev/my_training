import React from "react";
import classes from "./MyInput.module.css";

// React.forwardRef функция обертка для возможности пеердачи ссылки при вложенности компонентов
const MyInput = React.forwardRef(function (props, ref) {
  return <input ref={ref} className={classes.MyInput} {...props} />;
});

export default MyInput;
