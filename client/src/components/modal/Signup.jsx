import { useEffect, useState } from "react";

export default function SignupModal() {
  const [signupinputs, setSignupInputs] = useState({
    email: "",
    nickname: "",
    pw: "",
    pwc: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    nickname: false,
    pw: false,
    pwc: false,
    samepassword: false,
  });
  const [isChecked, setIsChecked] = useState(false);

  //prettier-ignore
  const onChange = async ele => {
    const { value, name } = ele.target;
    //prettier-ignore
    const emailpattern=new RegExp("^[a-zA-Z0-9@.]+$");
    const pwpattern=new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$");
    const nicknamepattern=new RegExp("^[a-zA-Z0-9가-힣]+$");
    

    setSignupInputs({
      ...signupinputs,
      [name]: value,
    });


    //name에는 email, nickname, pw, pwc

    if(name === "email") {
        if(value.length > 0 && emailpattern.test(value)) {
            setIsValid({ ...isValid, [name]: true });
        } else {
            
            setIsValid({ ...isValid, [name]: false });
        }
    } else if (name === "nickname") {
        if(value.length > 0 && nicknamepattern.test(value)) {
            setIsValid({ ...isValid, [name]: true });
        } else {
            setIsValid({ ...isValid, [name]: false });
        }
    } else if (name === "pw") {
        if(pwpattern.test(value)) { 
          setIsValid({ ...isValid, [name]: true });

        } else {
            setIsValid({ ...isValid, [name]: false });
        }
    } else if (name === "pwc") {
      if(pwpattern.test(value)) { 
          setIsValid({ ...isValid, [name]: true });
        } else {
          setIsValid({ ...isValid, [name]: false });
        }
    }
  };

  const createID = async data => {
    data.preventDefault();
    let info = {
      email: data.target[0].value,
      password: data.target[2].value,
      displayName: data.target[1].value,
    };

    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (!response.ok) {
      await response.json().then(data => alert(data.message));
    } else {
      alert("회원가입이 완료되었습니다");
      setSignupInputs({
        email: "",
        nickname: "",
        pw: "",
        pwc: "",
      });
      setIsValid({
        email: false,
        nickname: false,
        pw: false,
        pwc: false,
        samepassword: false,
      });
      return location.reload();
    }
  };

  useEffect(() => {
    if (signupinputs.pw !== signupinputs.pwc) return setIsValid({ ...isValid, samepassword: false });

    return setIsValid({ ...isValid, samepassword: true });
  }, [signupinputs]);

  //prettier-ignore
  return (
    <>
     <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center" >
      <div className="flex h-full justify-center items-center absolute inset-0">
          <form className="flex flex-col lg:w-[30rem] lg:h-[40rem] z-0 space-y-4 border-4 bg-white p-2 justify-around items-center rounded-md" onSubmit={createID}>
            <div className="flex flex-col">
            <span className="text-3xl text-center font-bold p-4 mb-4">Sign In</span>
            <span className="h-5 mb-1">Email</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="email" value={signupinputs.email} onChange={onChange} ></input>
            {isValid.email? <span className="h-5 w-96 mb-1"></span>:<span className={signupinputs.email.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>이메일 형식으로만 입력 가능합니다.</span>}
            <span className="h-5 mb-1">Nickname</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="nickname" onChange={onChange} value={signupinputs.nickname} ></input>
            {isValid.nickname? <span className="h-5 w-96 mb-1"></span>:<span className={signupinputs.nickname.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>닉네임에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="h-5 mb-1">Password</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="pw" onChange={onChange} value={signupinputs.pw}  type={isChecked?'text':'password'}></input>
            {isValid.pw? <span className="h-5 w-96 mb-1"></span>:<span className={signupinputs.pw.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <span className="h-5 mb-1">Password Check</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm" name="pwc" onChange={onChange} value={signupinputs.pwc}  type={isChecked?'text':'password'}></input>
            {isValid.pwc? <span className="h-5 w-96 mb-1"></span>:<span className={signupinputs.pwc.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>비밀번호를 다시 한 번 입력해주십시오.</span>}
            {isValid.samepassword? <span className="h-5 w-96 mb-1"></span>:<span className={signupinputs.pwc.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>위의 비밀번호와 동일하여야 합니다.</span>}
            <div>
              <input className="w-5" id="pwview" type="checkbox" checked={isChecked} onChange={e=>setIsChecked(e.target.checked)}></input>
              <label htmlFor ="pwview" className="text-sm">비밀번호를 표시합니다.</label>
            </div>
            </div>
            <div className="flex justify-center items-end">
              <button className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-40 min-w-36 bg-blue-500 rounded text-white" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
