import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./sidebar";
import Login, { action as loginAction } from "./login";
import ErrorPage from "./error-page";
import CreateMember, { action as createMemberAction } from "./create-member";
import "./index.css";
import "flowbite";
import MemberInfo, { loader as memberInfoLoader } from "./member-info";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    // loader: rootLoader,
    // action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <div>Success Login</div> },
          {
            path: "/login",
            element: <Login />,
            // loader: contactLoader,
            action: loginAction,
          },
          {
            path: "/createmember",
            element: <CreateMember />,
            // loader: contactLoader,
            action: createMemberAction,
          },
          {
            path: "/member",
            element: <MemberInfo />,
            loader: memberInfoLoader,
          },
          // {
          //   path: "contacts/:contactId/edit",
          //   element: <EditContact />,
          //   loader: contactLoader,
          //   action: editAction,
          // },
          // {
          //   path: "contacts/:contactId/destroy",
          //   action: destroyAction,
          // },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
