import About from "../pages/About";
import Error from "../pages/Error";
import PostidPage from "../pages/PostidPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";

/*для того, чтобы маршрут был динамическим нужно указать :id динамическую часть пути. в рятой версии пришлось бы в обоих комопнентах Route добавить пропс exact*/
export const privateRoutes = [
    {path: '/about', component: About},
    {path: '/posts', component: Posts},
    {path: '/posts/:id', component: PostidPage},
    {path: '/error', component: Error}
];

export const publicRoutes = [
    {path: '/login', component: Login},
];