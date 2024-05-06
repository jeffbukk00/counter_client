import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useUserContext from "@/contexts/user/hooks/useUserContext";

import MainPage from "@/pages/after-login/MainPage";
import BucketsPage from "@/pages/after-login/BucketsPage";
import CountersPage from "@/pages/after-login/CountersPage";
import AfterLoginNotFoundPage from "@/pages/after-login/AfterLoginNotFoundPage";

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
const AfterLoginApp = () => {
  const { isLoading } = useUserContext();

  if (isLoading) return <p>유저 데이터를 불러오는 중...</p>;
  return <RouterProvider router={afterLoginAppRouter} />;
};

export default AfterLoginApp;
