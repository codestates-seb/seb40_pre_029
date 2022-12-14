import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyModal() {
  const [input, setInputs] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const onChange = async ele => {
    const { value } = ele.target;
    //prettier-ignore
    const pwpattern=new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$");

    setInputs(value);

    if (pwpattern.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const verify = async data => {
    data.preventDefault();
    let info = {
      password: data.target.value,
    };

    const response = await fetch("/api/auth/verify", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      await response.json().then(alert("접근에 실패하였습니다"));
    } else {
      alert("수정을 원하는 정보를 입력해주세요");
      setInputs("");
      setIsValid(false);
      navigate("/myprofile");
    }
  };

  //prettier-ignore
  return (
    <>
     <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center dark:bg-slate-800 dark:text-gray-400" >
      <div className="flex h-full justify-center items-center absolute inset-0 dark:bg-slate-800 dark:text-gray-400">
          <form className="flex flex-col lg:w-[30rem] h-60rem z-0 space-y-4 border-4 bg-white p-2 justify-around items-center rounded-md" onSubmit={verify}>
            <span className="h-5 mb-1">Password</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm dark:bg-slate-800 dark:text-gray-400" name="pw" onChange={onChange} value={input}  type='password'></input>
            {isValid? <span className="h-5 w-96 mb-1"></span>:<span className={input.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <div className="flex justify-center items-end">
              <button className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-40 min-w-36 bg-blue-500 rounded text-white" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>확인</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
