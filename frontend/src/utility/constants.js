import { lazy } from "react"
const HomeLayout = lazy(() => import("../components/layouts/Homelayout/HomeLayout"))
const Login = lazy(() => import("../pages/Login/Login"))
const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"))
const Books = lazy(() => import("../pages/Books/Books"))
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"))

export const paths = {
    publicRoutes: {
        login: {
            path: "/login",
            element: Login
        },
        forgot: {
            path: "/forgotpassword",
            element: Login
        },
    },
    privateRoutes: {
        home: {
            path: "/",
            element: HomeLayout,
            children: {
                Home: {
                    path: "/dashboard",
                    element: DashBoard,
                },
                Books: {
                    path: "/books",
                    element: Books,
                }
            }
        }
    },
    hybridRoutes: {
        errorPage: {
            path: "/errorPage/:errorId",
            element: ErrorPage,
        },
    }
}