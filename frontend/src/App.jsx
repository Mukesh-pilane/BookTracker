import {
  createBrowserRouter,
  Navigate,
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
    ...Object.values(paths.hybridRoutes).map(route => ({
      path: route.path,
      element: <route.element />,
    })),
    ...Object.values(paths?.privateRoutes)?.map((e) => {
      return {
        path: e?.path,
        element: <PrivateRoute component={e?.element} />,
        children: [
          ...Object.values(e?.children)?.map((ele) => {
            return {
              path: ele?.path,
              element: <PrivateRoute component={ele?.element} path={ele?.path} />,
            }
          })
        ]
      }
    }),
    {
      path: "*",
      element: <Navigate to={'/errorPage/404'} />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
