import { useState } from "react";

export default function SignupModal() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupinputs, setSignupInputs] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordcheck: "",
  });
  const [isValid, setIsValid] = useState({
    id: false,
    nickname: false,
    password: false,
    passwordcheck: false,
    samepassword: false,
  });
  const [isChecked, setIsChecked] = useState(false);

  const openModalHandler = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  //prettier-ignore
  const onChange = (ele) => {
    const { value, name } = ele.target;
    console.log(value);
    console.log(signupinputs);
    const idpattern=new RegExp("^[a-zA-Z0-9]+$");
    const pwpattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    //출처: https://tjddnjs625.tistory.com/28 [seong.on2e:티스토리] 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
    const nicknamepattern=new RegExp("^[a-zA-Z0-9]+$");
    
    
    

    if(name === "id") {
        if(value.length > 0 && !idpattern.test(value)) {
            setIsValid({...isValid, [name]: false});
        } else {
            setIsValid({...isValid, [name]: true});
            setSignupInputs({
                ...signupinputs,
                [name]: value,
            });
        }
    } else if(name === "nickname") {
        if(value.length > 0 && !nicknamepattern.test(value)) {
            setIsValid({...isValid, [name]: false});
        } else { 
            setIsValid({...isValid, [name]: true});
            setSignupInputs({
                ...signupinputs,
                [name]: value,
            });
        }
    } else if(name === "password" || name === "passwordcheck" ) {
        setSignupInputs({
            ...signupinputs,
            [name]: value,
        });

        if(value.length > 0 && !pwpattern.test(value)) {
            setIsValid({...isValid, [name]: false});
        } else {
            setIsValid({...isValid, [name]: true}); 

        }

        if(signupinputs.password === signupinputs.passwordcheck) {
            setIsValid({...isValid, 'samepassword': true});
        } else {
            setIsValid({...isValid, 'samepassword': false});
        }
    }
  };

  //prettier-ignore
  return (
    <>
      <div className="flex-1 w-10 h-full relative justify-center items-center top-0 right-0">
        <button
          className="bg-indigo-300 box-border h-10 w-32 text-lg"
          onClick={openModalHandler}
        >Sign up</button>
        {isSignupOpen ? (
          <form className="w-auto z-0 absolute flex flex-col space-y-4 border-4 bg-white p-2 ">
            <span className="text-xl">ID</span>
            <input className="border p-2" name="id" placeholder="ID" onChange={onChange} value={signupinputs.id}></input>
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
        ) : null}
      </div>
    </>
  );
}
