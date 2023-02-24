import React from "react";
import ReactDOM from "react-dom/client";
import {
  Form,
  redirect,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { TextInput, Label } from "flowbite-react";
export async function loader({ request, params }) {
  let url = `http://127.0.0.1:8000/members/me`;
  let getMemberInfo = new Request(url, {
    method: "get",
    credentials: "include",
  });
  // return promise,用 than 或 await取resolve or reject
  let req = await fetch(getMemberInfo);
  console.log(getMemberInfo);
  // 200~200 req.ok為true，之外為false
  if (!req.ok) {
    const errorResponse = await req.json(); //用json才會用utf-8,不然都會是別的格式，這可以問一下
    console.log(errorResponse.data);
    for (const [key, value] of Object.entries(errorResponse)) {
      console.log(`key: ${key}  value:  ${value} `);
    }
    // status 要丟，不然他會直接當作200，所以以下算是公式
    throw new Response(JSON.stringify(errorResponse.detail), {
      status: req.status,
    });
  } else {
    const successResponse = await req.json();

    return successResponse;
  }
}

export default function memberInfo() {
  const memberInfo = useLoaderData();
  let lists = [];
  for (let i in memberInfo) {
    lists.push(
      <li key={i}>
        {i}:{memberInfo[i]}
      </li>
    );
  }
  return (
    <Form method="post" id="contact-form" className="flex flex-col   g">
      <div className="w-[50vw] grid gap-6 mb-6 md:grid-cols-12 items-center">
        <div className="col-span-6">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.name}
            name="name"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.username}
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="roles_permissions"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role permissions
          </label>
          <input
            type="text"
            id="roles_permissions"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.roles_permissions}
            disabled
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Create Time
          </label>
          <input
            type="time"
            id="time"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.time}
            disabled
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="follower_count"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Follower Count
          </label>
          <input
            type="number"
            id="follower_count"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.follower_count}
            disabled
          />
        </div>

        <div className="mb-6 col-span-10">
          <label
            htmlFor="email"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={memberInfo.email}
          />
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 w-2/3">
        {/* <fieldset> */}
        <div className="w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Change Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />
        </div>

        {/* </fieldset> */}
      </div>
      <div>
        <button
          type="submit"
          form="contact-form"
          value="Submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
      </div>
    </Form>
  );
}
