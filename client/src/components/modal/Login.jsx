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

  const onChange = (ele) => {
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
      <div className="flex-1 w-10 h-full relative justify-center items-center top-0 right-0">
          <form className="w-30 z-0 absolute flex flex-col space-y-4 border-4 bg-white p-2 ">
            <span className="text-xl">ID</span>
            <input className="border p-2" name="id" placeholder="ID" onChange={onChange} value={inputs.id} type='text'></input>
            {isValid.id? null:<span className={inputs.id.length === 0?"text-black-500":"text-red-500"}>아이디에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-xl">Password</span>
            <input className="border p-2" name="password" placeholder="Password" onChange={onChange} value={inputs.password} type='password'></input>
            {isValid.password? null:<span className={inputs.password.length === 0?"text-black-500":"text-red-500"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
            <button className="text-blue-500 text-lg hover:font-bold" type="submit">로그인</button>
          </form>
      </div>
    </>
  );
}
