import { useEffect, useState } from "react";

export default function SignupModal({ userMenu }) {
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
      displayName: data.target[1].value,
      password: data.target[2].value,
    };
    console.log(info);

    const response = await fetch("/api/auth/register", {
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

  return (
    <>
      <div className="flex fixed inset-0 bg-gray-900 bg-opacity-80 h-full w-full z-40 justify-center items-center">
        <div className="flex z-50 justify-center items-center" ref={userMenu}>
          <form
            className="flex flex-col w-[28rem] h-fit bg-white rounded-2xl p-12 dark:bg-slate-800 dark:text-gray-400"
            onSubmit={createID}>
            <span className="text-3xl font-medium mb-8 text-center">Sign In</span>
            <div className="flex flex-col mb-6">
              <span>Email</span>
              <div className="w-full relative">
                <span className="material-icons absolute h-12 mt-2 text-slate-300 text-3xl">email</span>
                <input
                  className="flex w-full h-12 pr-4 pl-10 border-b border-gray-300 focus:text-black focus:outline-none text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                  name="email"
                  value={signupinputs.email}
                  onChange={onChange}></input>
              </div>
              {isValid.email ? (
                <span className="h-5 w-80 mt-0.5"></span>
              ) : (
                <span
                  className={
                    signupinputs.email.length === 0
                      ? "text-green-600 text-sm w-80 mt-0.5"
                      : "text-red-500 text-sm w-80 mt-0.5"
                  }>
                  이메일 형식으로만 입력 가능합니다.
                </span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <span>Nickname</span>
              <div className="w-full relative">
                <span className="material-icons absolute h-12 mt-2 text-slate-300 text-3xl">person</span>
                <input
                  className="flex w-full h-12 pr-4 pl-10 border-b border-gray-300 focus:text-black focus:outline-none text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                  name="nickname"
                  onChange={onChange}
                  value={signupinputs.nickname}></input>
              </div>
              {isValid.nickname ? (
                <span className="h-5 w-96 mt-0.5"></span>
              ) : (
                <span
                  className={
                    signupinputs.nickname.length === 0
                      ? "text-green-600 text-sm w-80 mt-0.5 h-5"
                      : "text-red-500 text-sm w-80 mt-0.5 h-5"
                  }>
                  닉네임에는 영문 및 숫자만 입력 가능합니다.
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
                  value={signupinputs.pw}
                  type={isChecked ? "text" : "password"}></input>
              </div>
              {isValid.pw ? (
                <span className="h-5 w-96 mt-0.5"></span>
              ) : (
                <span
                  className={
                    signupinputs.pw.length === 0
                      ? "text-green-600 text-sm w-80 mt-0.5 h-5"
                      : "text-red-500 text-sm w-80 mt-0.5 h-5"
                  }>
                  영문, 숫자, 특수문자가 모두 포함되어야 합니다.
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <span>Password Check</span>
              <div className="w-full relative">
                <span className="material-icons absolute h-12 mt-2 text-slate-300 text-3xl">checked</span>
                <input
                  className="flex w-full h-12 pr-4 pl-10 border-b border-gray-300 focus:text-black focus:outline-none text-gray-500 dark:bg-slate-800 dark:text-gray-400"
                  name="pwc"
                  onChange={onChange}
                  value={signupinputs.pwc}
                  type={isChecked ? "text" : "password"}></input>
              </div>
              {isValid.pwc ? (
                <span className="h-5 w-96 mt-0.5"></span>
              ) : (
                <span
                  className={
                    signupinputs.pwc.length === 0
                      ? "text-green-600 text-sm w-80 mt-0.5 h-5"
                      : "text-red-500 text-sm w-80 mt-0.5 h-5"
                  }>
                  비밀번호를 다시 한 번 입력해주십시오.
                </span>
              )}
              {isValid.samepassword ? (
                <span className="h-5 w-96 mb-1"></span>
              ) : (
                <span
                  className={
                    signupinputs.pwc.length === 0
                      ? "text-black-500 text-sm h-5 w-96 mb-1"
                      : "text-red-500 h-5 text-sm w-96 mb-1"
                  }>
                  위의 비밀번호와 동일하여야 합니다.
                </span>
              )}
            </div>
            <div className="flex items-center mb-6">
              <input
                className="w-5 h-5 mr-1.5"
                id="pwview"
                type="checkbox"
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}></input>
              <label htmlFor="pwview" className="text-sm text-gray-500">
                비밀번호를 표시합니다.
              </label>
            </div>
            <div className="flex justify-center items-end">
              <button
                className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-full min-w-36 bg-blue-500 rounded text-white"
                type="submit"
                disabled={Object.values(isValid).filter(el => el === false).length === 0 ? false : true}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
