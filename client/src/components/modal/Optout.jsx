import { useState } from "react";

export default function OptoutModal() {
  const [inputs, setInputs] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onChange = ele => {
    const { value } = ele.target;

    const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");

    if (value.length > 0 && !pwpattern.test(value)) {
      setIsValid(false);
    } else {
      setInputs(value);
      setIsValid(true);
    }
  };

  //prettier-ignore
  return (
    <>
      <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50">
        <div className="flex-1 w-10 h-full relative justify-center items-center top-0 right-0">
            <form className="w-30 z-0 absolute flex flex-col space-y-4 border-4 bg-white p-2 ">
              <span className="text-xl">비밀번호 확인</span>
              <input className="border p-2" name="password" placeholder="Password" onChange={onChange} value={inputs.password} type='password'></input>
              {isValid? null:<span className={inputs.length === 0?"text-black-500":"text-red-500"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
              <button className="text-blue-500 text-lg hover:font-bold" type="submit">회원탈퇴</button>
            </form>
        </div>
      </div>
    </>
  );
}
