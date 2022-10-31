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
    const pwpattern = new RegExp("^[a-zA-Z0-9!@#$%^*+=-]+$");
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
      <div className="flex-1 w-10 h-full relative justify-center items-center top-0 right-0">
          <form className="w-auto z-0 absolute flex flex-col space-y-4 border-4 bg-white p-2 " onSubmit={() => createID()}>
            <label className="text-xl">ID
                <input className="border p-2" name="id" placeholder="ID" value={signupinputs.id} onChange={onChange} ></input>
            </label>
            {isValid.id? null:<span className={signupinputs.id.length === 0?"text-black-500":"text-red-500"}>아이디에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-xl">Nickname</span>
            <input className="border p-2" name="nickname" placeholder="Nickname" onChange={onChange} value={signupinputs.nickname}></input>
            {isValid.nickname? null:<span className={signupinputs.nickname.length === 0?"text-black-500":"text-red-500"}>닉네임에는 영문 및 숫자만 입력 가능합니다.</span>}
            <span className="text-xl">Password</span>
            <input className="border p-2" name="password" placeholder="Password" onChange={onChange} value={signupinputs.password} type={isChecked?'text':'password'}></input>
            {isValid.password? null:<span className={signupinputs.password.length === 0?"text-black-500":"text-red-500"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <span className="text-xl">Password Check</span>
            <input className="border p-2" name="passwordcheck" placeholder="Password" onChange={onChange} value={signupinputs.passwordcheck} type={isChecked?'text':'password'}></input>
            {isValid.passwordcheck? null:<span className={signupinputs.passwordcheck.length === 0?"text-black-500":"text-red-500"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            {isValid.samepassword? null:<span className={signupinputs.passwordcheck.length === 0?"text-black-500":"text-red-500"}>위의 비밀번호와 동일하여야 합니다.</span>}
            <div>
                <input className="w-5" id="pwview" type="checkbox" checked={isChecked} onChange={e=>setIsChecked(e.target.checked)}></input>
                <label htmlFor ="pwview" className="text-lg">비밀번호를 표시합니다.</label>
            </div>
            <button className="text-blue-500 text-lg hover:font-bold" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>회원가입</button>
          </form>
      </div>
    </>
  );
}
