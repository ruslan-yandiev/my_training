import {useEffect, useRef} from "react";

export function useObserver(ref, canLoad, isLoading, callback) {
    const observer = useRef(); // поместим наш Intersection Observe

    useEffect(() => {
        // Intersection Observer

        if (isLoading) return;
        if (observer.current) observer.current.disconnect(); // если обсервер уже создан то отключить наблюдение за всеми элементами за которыми он наблюдает в текущий момент;

        // колбек будет отрабатывать каждый раз когда в поле зрения будет попадаться наблюдаемый нами едемент lastElement
        var cb = function(entries, observer) {

            // условие проверим в зоне видимости ли наш элемент или нет, и если в зоне то выполнить действие
            // то есть теперь колбек отработает только на появление в зоне видимости элемента, но не на исчезновение
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current); // укажем за каким элементом будем наблюдать посредством обзервера
    }, [isLoading]);
}