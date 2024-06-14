import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "@/pages/after-login/MainPage";
import BucketsPage from "@/pages/after-login/BucketsPage";
import CountersPage from "@/pages/after-login/CountersPage";
import AfterLoginNotFoundPage from "@/pages/after-login/AfterLoginNotFoundPage";

// 로그인 성공 이후의 라우터.
const afterLoginAppRouter = createBrowserRouter([
  {
    errorElement: <AfterLoginNotFoundPage />,
    children: [
      {
        path: "/main",
        element: <MainPage />,
        children: [
          { path: "/main/buckets", element: <BucketsPage /> },
          { path: "/main/:bucketId/counters", element: <CountersPage /> },
        ],
      },
    ],
  },
]);

// 로그인 성공 이후의 라우터를 제공.
const AfterLoginApp = () => {
  return <RouterProvider router={afterLoginAppRouter} />;
};

export default AfterLoginApp;
