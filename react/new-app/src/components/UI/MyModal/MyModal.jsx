import React from "react";
import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {
  const rootClasses = [cl.myModal];
  const childrenElemClasses = [cl.myModal__content];

  if (visible) {
    rootClasses.push(cl.active);
    childrenElemClasses.push(cl.active);
  }

  return (
    // {/*Так мы сможем извлечь и передать из переменной компоненту сразу несколько классовых стилей*/}
    <div className={rootClasses.join(' ')} onClick={()=> setVisible(false)}>
    {/*С помощью stopPropagation мы предотвратили всплытие события у дочернего жлемента. И теперь нажатие на дочку не вызовит события навешанного родителю.*/}
      <div className={childrenElemClasses.join(' ')} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal;