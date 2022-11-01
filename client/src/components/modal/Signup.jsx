import { useState } from "react";

export default function SignupModal() {
  const [signupinputs, setSignupInputs] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordcheck: "",
  });
  const [isValid, setIsValid] = useState({
    id: false,
    nickname: false,
    password: true,
    passwordcheck: true,
    samepassword: true,
  });
  const [isChecked, setIsChecked] = useState(false);

  //prettier-ignore
  const onChange = ele => {
    const { value, name } = ele.target;
    const idpattern=new RegExp("^[a-zA-Z0-9]+$");
    // const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");
    const nicknamepattern=new RegExp("^[a-zA-Z0-9]+$");
    
    setSignupInputs({
        ...signupinputs,
        [name]: value,
    });
    
    if(name === "id") {
        if(value.length > 0 && idpattern.test(value)) {
            setIsValid({...isValid, [name]: true});
        } else {
            setIsValid({...isValid, [name]: false});
        }
    } else if(name === "nickname") {
        if(value.length > 0 && nicknamepattern.test(value)) {
            setIsValid({...isValid, [name]: true});
        } else { 
            setIsValid({...isValid, [name]: false});
        }
    } else if(name === "password" || name === "passwordcheck" ) {
        // if(value.length > 0 && pwpattern.test(value)) {
        //     setIsValid({...isValid, [name]: true});
        // } else {
        //     setIsValid({...isValid, [name]: false}); 
        // }

        // if(signupinputs.password === signupinputs.passwordcheck) {
        //     setIsValid({...isValid, 'samepassword': true});
        // } else {
        //     setIsValid({...isValid, 'samepassword': false});
        // }
    }
  };

  const createID = async data => {
    const response = await fetch("http://localhost:7080/register/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  //prettier-ignore
  return (
    <>
     <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center" >
      <div className="flex w-72 h-full justify-center items-center ">
          <form className="w-96 h-3/5 z-0 absolute flex flex-col space-y-3 border-4 bg-white p-2 " onSubmit={() => createID()}>
            <span className="text-sm">ID</span>
            <input className="border p-2" name="id" value={signupinputs.id} onChange={onChange} ></input>
            {isValid.id? null:<span className={signupinputs.id.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>아이디에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-sm">Nickname</span>
            <input className="border p-2" name="nickname" onChange={onChange} value={signupinputs.nickname}></input>
            {isValid.nickname? null:<span className={signupinputs.nickname.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>닉네임에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-sm">Password</span>
            <input className="border p-2" name="password" onChange={onChange} value={signupinputs.password} type={isChecked?'text':'password'}></input>
            {isValid.password? null:<span className={signupinputs.password.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <span className="text-sm">Password Check</span>
            <input className="border p-2" name="passwordcheck" onChange={onChange} value={signupinputs.passwordcheck} type={isChecked?'text':'password'}></input>
            {isValid.passwordcheck? null:<span className={signupinputs.passwordcheck.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            {isValid.samepassword? null:<span className={signupinputs.passwordcheck.length === 0?"text-black-500 text-sm":"text-red-500 text-sm"}>위의 비밀번호와 동일하여야 합니다.</span>}
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
