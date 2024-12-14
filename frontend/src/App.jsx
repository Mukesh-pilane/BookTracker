import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { paths } from './utility/constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    ...Object.values(paths?.publicRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PublicRoute component={e?.element} />
      }
    }),
    ...Object.values(paths?.privateRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PrivateRoute component={e?.element} />,
        children: [
          ...Object.values(e?.children[0])?.map((ele) => {
            return {
              path: ele?.path,
              element: <PrivateRoute component={ele?.element} path={ele?.path} />,
            }
          })
        ]
      }
    }),
    {
      path: "/unauthorized",
      element: <div>no access !!</div>,
    },
    {
      path: "*",
      element: <div>Page not found!!</div>
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
