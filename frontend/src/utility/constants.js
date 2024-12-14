import { lazy } from "react"
const HomeLayout = lazy(() => import("../components/layouts/Homelayout/HomeLayout"))
const Login = lazy(() => import("../pages/Login/Login"))
const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"))

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
            children: [
                {
                    Home: {
                        path: "",
                        element: DashBoard,
                    }
                },

            ]
        }
    }
}