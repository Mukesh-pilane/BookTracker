import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider,createTheme } from '@mantine/core';

import { paths } from './utility/constants';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import queryClient from "./queryClient";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});

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
        handle: {
          pageName: e.pageName
        },
        children: [
          ...Object.values(e?.children)?.map((ele) => {
            return {
              path: ele?.path,
              element: <PrivateRoute component={ele?.element} path={ele?.path} />,
              handle: {
                pageName: e.pageName
              },
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

  // 

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default App;
