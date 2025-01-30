import { lazy } from "react"
const HomeLayout = lazy(() => import("../components/layouts/Homelayout/HomeLayout"))
const Login = lazy(() => import("../pages/Login/Login"))
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"))
const Home = lazy(() => import("../pages/Home/Home"))
const Register = lazy(() => import("../pages/Register/Register"))
const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"))
const Books = lazy(() => import("../pages/Books/Books"))

export const paths = {
    publicRoutes: {
        home: {
            path: "/home",
            element: Home,
        },
        login: {
            path: "/login",
            element: Login
        },
        register: {
            path: "/register",
            element: Register
        },
        forgot: {
            path: "/forgotpassword",
            element: ForgotPassword
        },
    },
    privateRoutes: {
        home: {
            path: "/",
            element: HomeLayout,
            pageName: "Dashboard",
            children: {
                Home: {
                    path: "/dashboard",
                    element: DashBoard,
                    pageName: "Dashboard"
                },
                Books: {
                    path: "/books",
                    element: Books,
                    pageName: "Books"
                }
            }
        }
    }
}