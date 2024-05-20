import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/before-login/LandingPage";

import OauthCallbackGooglePage from "@/pages/before-login/OauthCallbackGooglePage";
import OauthCallbackNaverPage from "@/pages/before-login/OauthCallbackNaverPage";
import OauthCallbackKakaoPage from "@/pages/before-login/OauthCallbackKakaoPage";
import BeforeLoginNotFoundPage from "@/pages/before-login/BeforeLoginNoFoundPage";

const beforeLoginAppRouter = createBrowserRouter([
  {
    errorElement: <BeforeLoginNotFoundPage />,
    children: [
      {
        path: "/landing",
        element: <LandingPage />,
        children: [
          {
            path: "/landing/auth/callback/google",
            element: <OauthCallbackGooglePage />,
          },
          {
            path: "/landing/auth/callback/naver",
            element: <OauthCallbackNaverPage />,
          },
          {
            path: "/landing/auth/callback/kakao",
            element: <OauthCallbackKakaoPage />,
          },
        ],
      },
    ],
  },
]);
const BeforeLoginApp = () => {
  return <RouterProvider router={beforeLoginAppRouter} />;
};

export default BeforeLoginApp;
