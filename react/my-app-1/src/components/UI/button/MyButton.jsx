import React from "react";
import classes from "./MyButton.module.css"; // один из способов работы со стилями


const MyButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
        // специальный пропс children чтобы объяснить риакту в какое место добавлять вложеные элементы (надпись кнопки: Создать пост)
    );
}

export default MyButton;