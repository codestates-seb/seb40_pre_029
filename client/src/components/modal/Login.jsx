import { useState } from "react";
import PropTypes from "prop-types";

export default function LoginModal() {
  LoginModal.propTypes = {
    setLogin: PropTypes.func,
  };
  const [inputs, setInputs] = useState({
    email: "",
    pw: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    pw: false,
  });

  const onChange = ele => {
    const { value, name } = ele.target;

    const idpattern = new RegExp("^[a-zA-Z0-9@.]+$");
    const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");

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

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      await response.json().then(data => alert(data.message));

      // .then(data => alert(data.message));
    } else {
      await response;
      alert("로그인이 완료되었습니다");
      setInputs({
        email: "",
        pw: "",
      });
      setIsValid({
        email: false,
        pw: false,
      });
      // setLogin(true);
      return location.reload();
    }
  };

  //prettier-ignore
  return (
    <>
      <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center">
        <div className="flex h-full justify-center items-center absolute inset-0">          
          <form className="flex flex-col w-96 lg:h-[32rem] z-0 space-y-4 border-4 bg-white p-2 justify-around items-center rounded-md" onSubmit={loginProcess}  >
            <div className="flex flex-col">
              <span className="text-3xl text-center font-bold p-4 mb-4">Login</span>
              <span className="h-5 mb-1">Email</span>
              <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="email" onChange={onChange} value={inputs.email} type='text' placeholder="Type your email"></input>
              {isValid.email? <span className="h-5 w-80 mb-1"></span>:<span className={inputs.email.length === 0?"text-black-500 text-sm h-5 w-80 mb-1":"text-red-500 h-5 text-sm w-80 mb-1"}>닉네임 형식에 맞춰 입력 가능합니다.</span>}
              <span className="h-5 mb-1">Password</span>
              <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="pw" onChange={onChange} value={inputs.pw} type='password' placeholder="Type your password"></input>
              {isValid.pw? <span className="h-5 w-80 mb-1"></span>:<span className={inputs.pw.length === 0?"text-black-500 text-sm h-5 w-80":"text-red-500 text-sm h-5 w-80"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
            </div>
            <div className="flex justify-center items-end pt-5">              
              <button className="shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-40 min-w-36 bg-blue-500 rounded text-white" type="submit">Login</button>              
            </div>
            <div className="text-xs">Or Sign Up Using</div>
            <div className="flex">
              <img src={require("../images/naver login.png")} alt="" className="w-10 h-10 mb-4 mx-2"></img>
              <img src={require("../images/kakao login.png")} alt="" className="w-10 h-10 mb-4 mx-2"></img>
              <img src={require("../images/google login.png")} alt="" className="w-10 h-10 mb-4 mx-2"></img>
            </div>
          </form>
        </div>
      </div>  
    </>
  );
}
