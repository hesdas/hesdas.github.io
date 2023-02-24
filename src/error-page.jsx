import {
  useRouteError,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
export function CustomErrorLink(props) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [doReNavigate, setdoReNavigate] = useState(false);
  useEffect(() => {
    if (doReNavigate && props.errorStatus == 401) {
      navigate("/login", { state: location }, { replace: true });
    } else if (doReNavigate) {
      navigate("/", { replace: true });
    }
  }, [doReNavigate]);
  return (
    //如果用Link而且沒有標記forHref會遇到defualt行為在網之前路由送一次請求，這個原因待查。
    <button
      className="link ml-1 z-20 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 px-6 py-4 rounded outline-double hover:animate-bounce mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
      // target="_blank"
      onClick={() => {
        setdoReNavigate(!doReNavigate);
      }}
    >
      {props.children}
    </button>
  );
}

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  console.log(location);

  let customLoginButton;
  if (error.status == 401) {
    customLoginButton = (
      <CustomErrorLink errorStatus={error.status}>Login</CustomErrorLink>
    );
  } else {
    customLoginButton = (
      <CustomErrorLink errorStatus={error.status}>Home</CustomErrorLink>
    );
  }
  return (
    <div id="error-page" className="h-screen flex justify-center items-center">
      <div className="relative flex justify-center items-center  lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24  md:gap-28 gap-16">
        <div className="absolute top-0 left-0 m-10 flex  text-[250px] text-center text-purple-700 text-opacity-25 -z-20">
          <i>{error.status}</i>
        </div>
        <div className="lg:flex">
          <div className="  flex flex-col  justify-center items-center w-3/4">
            <h1 className=" text-gray-800 text-2xl font-bold">
              {error.data || error.message}{" "}
            </h1>
            <h1 className="my-2 text-gray-800 text-2xl ">
              Sorry about that! Please visit our hompage to get where you need
              to go.
            </h1>

            {customLoginButton}
          </div>
          <div>
            <img
              src="https://i.ibb.co/ck1SGFJ/Group.png"
              className="sm:hidden lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
