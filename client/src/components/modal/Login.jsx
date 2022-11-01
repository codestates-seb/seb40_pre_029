import { useState } from "react";

export default function LoginModal(setLogin) {
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
    } else {
      alert("로그인이 완료되었습니다");
      setInputs({
        email: "",
        pw: "",
      });
      setIsValid({
        email: false,
        pw: false,
      });
      setLogin(true);
    }
  };

  //prettier-ignore
  return (
    <>
      <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center">
        <div className="flex h-full justify-center items-center absolute inset-0">
            <form className="flex w-96 h-1/2 z-0 flex flex-col space-y-4 border-4 bg-white p-2" onSubmit={loginProcess}>
              <span className="text-sm">Email</span>
              <input className="border p-2" name="email" onChange={onChange} value={inputs.email} type='text'></input>
              {isValid.email? null:<span className={inputs.email.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>닉네임 형식에 맞춰 입력 가능합니다.</span>}
              <span className="text-sm">Password</span>
              <input className="border p-2" name="pw" onChange={onChange} value={inputs.pw} type='password'></input>
              {isValid.pw? <span className="text-white text-sm">임시방편</span>:<span className={inputs.pw.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
              <div className="flex justify-center items-end">
              <button className="flex justify-center items-center rounded h-10 w-24 bg-sky-500 hover:bg-blue-500 shadow-blue-500/50 min-w-min shadow text-white text-xs" type="submit">Log in</button>
              </div>
            </form>
        </div>
      </div>  
    </>
  );
}
