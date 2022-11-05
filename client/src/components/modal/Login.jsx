import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginModal(props) {
  const [inputs, setInputs] = useState({
    email: "",
    pw: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    pw: false,
  });
  const idpattern = new RegExp("^[a-zA-Z0-9@.]+$");
  const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");
  const navigate = useNavigate();

  const onChange = ele => {
    const { value, name } = ele.target;

    if (name === "email") {
      if (value.length > 0 && !idpattern.test(value)) {
        setIsValid({ ...isValid, [name]: false });
      } else {
        setInputs({
          ...inputs,
          [name]: value,
        });
        setIsValid({ ...isValid, [name]: true });
      }
    } else if (name === "pw") {
      if (value.length > 0 && !pwpattern.test(value)) {
        setIsValid({ ...isValid, [name]: false });
      } else {
        setInputs({
          ...inputs,
          [name]: value,
        });
        setIsValid({ ...isValid, [name]: true });
      }
    }
  };

  const loginProcess = async data => {
    data.preventDefault();
    let info = {
      email: data.target[0].value,
      password: data.target[1].value,
    };

    //prettier-ignore
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(info),
      })
    let res = response;
    if (!res.ok) {
      await res.json().then(data => alert(data.message));
    } else {
      await res.json().then();
      dispatch(loginActions.logout());
      alert("로그인이 완료되었습니다");
      setInputs({
        email: "",
        pw: "",
      });
      setIsValid({
        email: false,
        pw: false,
      });
      // localStorage에 토큰넣기
      localStorage.clear();
      localStorage.setItem("refresh", res.headers.get("refresh"));
      localStorage.setItem("authorization", response.headers.get("authorization"));

      //여기 navigate("/"); 으로 구현하려고했으나 실패
      // return location.reload();

      // setLogin(true);
      // return location.reload();
    }
  };

  return (
    <>
      <div className="flex fixed inset-0 bg-gray-900 bg-opacity-80 h-full w-full z-40 justify-center items-center">
        <div className="flex z-50 justify-center items-center" ref={userMenu}>
          <form
            className="flex flex-col w-[28rem] h-[40rem] bg-white rounded-2xl pt-12 px-12 dark:bg-slate-800 dark:text-gray-400"
            onSubmit={loginProcess}>
            <span className="text-3xl font-medium mb-8 text-center">Login</span>
            <div className="flex flex-col mb-6">
              <span>Email</span>
              <div className="w-full relative">
                <span className="material-icons absolute h-12 mt-2 text-slate-300 text-3xl">email</span>
                <input
                  className="flex w-full h-12 pr-4 pl-10 border-b border-gray-300 focus:text-black focus:outline-none text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                  name="email"
                  onChange={onChange}
                  value={inputs.email}
                  type="text"
                  placeholder="Type your email"></input>
              </div>
              {isValid.email ? (
                <span className="h-5 w-80 mt-1"></span>
              ) : (
                <span
                  className={
                    inputs.email.length === 0 ? "text-green-600 text-sm w-80 mt-1" : "text-red-500 text-sm w-80 mt-1"
                  }>
                  닉네임 형식에 맞춰 입력 가능합니다.
                </span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <span>Password</span>
              <div className="w-full relative">
                <span className="material-icons absolute h-12 mt-2 text-slate-300 text-3xl">lock</span>
                <input
                  className="flex w-full h-12 pr-4 pl-10 border-b border-gray-300 focus:text-black focus:outline-none text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                  name="pw"
                  onChange={onChange}
                  value={inputs.pw}
                  type="password"
                  placeholder="Type your password"></input>
              </div>
              {isValid.pw ? (
                <span className="h-5 w-80 mt-1"></span>
              ) : (
                <span
                  className={
                    inputs.pw.length === 0 ? "text-green-600 text-sm w-80 mt-1" : "text-red-500 text-sm w-80 mt-1"
                  }>
                  비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.
                </span>
              )}
            </div>
            <div className="flex justify-center items-end pt-5">
              <button
                className="shadow-sky-400 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-full min-w-36 bg-blue-500 rounded text-white"
                type="submit">
                Login
              </button>
            </div>
            <div className="text-center mt-8">
              <span className="text-sm text-gray-400">Or Sign Up Using</span>
              <div className="flex justify-center mt-4 rounded-sm">
                <img src={require("../images/naver login.png")} alt="" className="w-14 h-14 my-4 mx-6"></img>
                <img src={require("../images/kakao login.png")} alt="" className="w-14 h-14 my-4 mx-6"></img>
                <img src={require("../images/google login.png")} alt="" className="w-14 h-14 my-4 mx-6"></img>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
