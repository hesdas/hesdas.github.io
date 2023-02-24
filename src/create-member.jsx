import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "flowbite-react";
import { Form, redirect } from "react-router-dom";

export async function action({ request, params }) {
  let url = `http://127.0.0.1:8000/members`;
  const formData = await request.formData();
  let formRequest = new Request(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8;",
    },
    credentials: "include",
    // Object.fromEntries(formData); 相當於以下事情
    // name: formData.get("name"), //單純就是取key值
    // username: formData.get("username"),
    // email: formData.get("email"), //單純就是取key值
    // password: formData.get("password"),
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  // return promise,用 than 或 await取resolve or reject
  let req = await fetch(formRequest);

  // 200~200 req.ok為true，之外為false
  if (!req.ok) {
    const errorResponse = await req.json(); //用json才會用utf-8,不然都會是別的格式，這可以問一下
    console.log(errorResponse.detail[0]);
    console.log(errorResponse.data);
    for (const [key, value] of Object.entries(errorResponse)) {
      console.log(`key: ${key}  value:  ${value} `);
    }
    // status 要丟，不然他會直接當作200，所以以下算是公式
    throw new Response(JSON.stringify(errorResponse.detail[0]), {
      status: req.status,
    });
  } else {
    // const successResponse = await req.json();
    // navigate(from, { replace: true });
    return redirect("/");
  }
}
export default function CreateMember() {
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen w-full items-center justify-center">
        <div className=" hidden  h-full max-h-[750px] overflow-hidden 2xl:block 2xl:w-1/2 ">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="mx-auto w-3/4"
            //max-width: 100%;
          />
        </div>
        <Form method="post" className="w-full max-w-lg" id="form-create-member">
          <h1 className="text-xl md:text-2xl font-bold leading-tight	my-4">
            Create Account
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-name"
                type="text"
                placeholder="Jane Su"
                name="name"
                required
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-username"
              >
                UserName
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-username"
                type="text"
                placeholder="Doe"
                name="username"
                required
                autoFocus={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
                name="password"
                required
                autoSave="true"
                autoFocus={true}
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="email"
                placeholder="xxxx@gmail.com"
                name="email"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  form="form-create-member"
                  value="Submit"
                  className="mt-4"
                  gradientDuoTone="purpleToBlue"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
}
