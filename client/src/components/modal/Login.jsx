import { useState } from "react";

export default function LoginModal() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [isValid, setIsValid] = useState({
    id: false,
    password: false,
  });

  const onChange = ele => {
    const { value, name } = ele.target;

    const idpattern = new RegExp("^[a-zA-Z0-9]+$");
    const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");

    if (name === "id") {
      if (value.length > 0 && !idpattern.test(value)) {
        setIsValid({ ...inputs, [name]: false });
      } else {
        setInputs({
          ...inputs,
          [name]: value,
        });
        setIsValid({ ...inputs, [name]: true });
      }
    } else if (name === "password") {
      if (value.length > 0 && !pwpattern.test(value)) {
        setIsValid({ ...inputs, [name]: false });
      } else {
        setInputs({
          ...inputs,
          [name]: value,
        });
        setIsValid({ ...inputs, [name]: true });
      }
    }
  };

  //prettier-ignore
  return (
    <>
      <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center">
        <div className="flex h-full justify-center items-center absolute inset-0">
            <form className="flex w-96 h-1/2 z-0 flex flex-col space-y-4 border-4 bg-white p-2">
              <span className="text-sm">ID</span>
              <input className="border p-2" name="id" onChange={onChange} value={inputs.id} type='text'></input>
              {isValid.id? null:<span className={inputs.id.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>아이디에는 영문 및 숫자만 입력 가능합니다.</span>}
              <span className="text-sm">Password</span>
              <input className="border p-2" name="password" onChange={onChange} value={inputs.password} type='password'></input>
              {isValid.password? <span className="text-white text-sm">임시방편</span>:<span className={inputs.password.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
              <div className="flex justify-center items-end">
              <button className="flex justify-center items-center rounded h-10 w-24 bg-sky-500 hover:bg-blue-500 shadow-blue-500/50 min-w-min shadow text-white text-xs" type="submit">Log in</button>
              </div>
            </form>
        </div>
      </div>  
    </>
  );
}
