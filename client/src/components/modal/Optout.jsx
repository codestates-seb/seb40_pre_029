import { useState } from "react";

export default function OptoutModal() {
  const [input, setInputs] = useState("");
  const [isValid, setIsValid] = useState(false);

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

  const optOut = async data => {
    data.preventDefault();
    let info = {
      password: data.target.value,
    };

    const response = await fetch("/optout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      await response.json().then(data => alert(data.message));
    } else {
      alert("회원탈퇴가 완료되었습니다.");
      setInputs("");
      setIsValid(false);
      return location.reload();
    }
  };

  //prettier-ignore
  return (
    <>
<<<<<<< HEAD
     <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center" >
      <div className="flex h-full justify-center items-center absolute inset-0">
          <form className="flex flex-col lg:w-[30rem] lg:h-[40rem] z-0 space-y-4 border-4 bg-white p-2 justify-around items-center rounded-md" onSubmit={optOut}>
            <span className="h-5 mb-1">Password</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="pw" onChange={onChange} value={input}  type='password'></input>
            {isValid? <span className="h-5 w-96 mb-1"></span>:<span className={input.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <div className="flex justify-center items-end">
              <button className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-40 min-w-36 bg-blue-500 rounded text-white" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>Optout</button>
            </div>
          </form>
=======
      <div className="flex fixed inset-0 bg-gray-900 bg-opacity-80 h-full w-full z-50">
        <div className="flex-1 w-10 h-full relative justify-center items-center top-0 right-0">
            <form className="w-[28rem] h-[40rem] z-0 absolute flex flex-col space-y-4 border-4 bg-white p-2 ">
              <span className="text-xl">비밀번호 확인</span>
              <input className="border p-2" name="password" placeholder="Password" onChange={onChange} value={inputs.password} type='password'></input>
              {isValid? null:<span className={inputs.length === 0?"text-black-500":"text-red-500"}>비밀번호에는 영문,숫자,특수문자만 입력 가능합니다.</span>}
              <button className="text-blue-500 text-lg hover:font-bold" type="submit">회원탈퇴</button>
            </form>
>>>>>>> b5f46b2d4ad82a664712c13144c8de623feb4297
        </div>
      </div>
    </>
  );
}
