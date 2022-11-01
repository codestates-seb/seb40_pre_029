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
      <div className="flex w-72 h-full justify-center items-center ">
          <form className="w-96 h-3/5 z-0 absolute flex flex-col space-y-3 border-4 bg-white p-2 " onSubmit={createID}>
            <span className="text-sm">Email</span>
            <input className="border p-2" name="id" value={signupinputs.email} onChange={onChange} ></input>
            {isValid.email? null:<span className={signupinputs.email.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>이메일 형식으로만 입력 가능합니다.</span>}
            <span className="text-sm">Nickname</span>
            <input className="border p-2" name="nickname" onChange={onChange} value={signupinputs.nickname}></input>
            {isValid.nickname? null:<span className={signupinputs.nickname.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>닉네임에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-sm">Password</span>
            <input className="border p-2" name="pw" onChange={onChange} value={signupinputs.pw} type={isChecked?'text':'password'}></input>
            {isValid.pw? null:<span className={signupinputs.pw.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <span className="text-sm">Password Check</span>
            <input className="border p-2" name="pwc" onChange={onChange} value={signupinputs.pwc} type={isChecked?'text':'password'}></input>
            {isValid.pwc? null:<span className={signupinputs.pwc.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            {isValid.samepassword? null:<span className={signupinputs.pwc.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>위의 비밀번호와 동일하여야 합니다.</span>}
            <div>
              <input className="w-5" id="pwview" type="checkbox" checked={isChecked} onChange={e=>setIsChecked(e.target.checked)}></input>
              <label htmlFor ="pwview" className="text-sm">비밀번호를 표시합니다.</label>
            </div>
            <div className="flex justify-center relative">
              <button className="flex justify-center items-center rounded h-10 w-24 bg-sky-500 hover:bg-blue-500 shadow-blue-500/50 min-w-min shadow text-white text-xs" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
