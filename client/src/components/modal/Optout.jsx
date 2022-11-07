import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/store.jsx";

export default function OptoutModal(props) {
  const [input, setInputs] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authorization);
  const onChange = async ele => {
    const { value } = ele.target;
    //prettier-ignore
    const pwpattern=new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$");

    setInputs(value);

    if (pwpattern.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const optOut = async data => {
    data.preventDefault();

    const response = await fetch("/api/auth/withdraw", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({ password: input }),
    });

    if (!response.ok) {
      await response.json().then(data => {
        alert(data.message);
      });
    } else {
      alert("회원탈퇴가 완료되었습니다.");
      setInputs("");
      setIsValid(false);
      dispatch(loginActions.logout());
      localStorage.removeItem("refresh");
      localStorage.removeItem("authorization");
      navigate("/");
    }
  };

  //prettier-ignore
  return (
    <>
     <div className="flex fixed inset-0 bg-gray-600 bg-opacity-80 h-full w-full z-50 justify-center items-center dark:bg-slate-800 dark:text-gray-400" >
      <div className="flex h-full justify-center items-center absolute inset-0 dark:bg-slate-800 dark:text-gray-400" ref={props.userMenu}>
          <form className="flex flex-col lg:w-[30rem] h-80 z-0 space-y-4 border-4 bg-white p-2 justify-around items-center rounded-md" onSubmit={optOut}>
            <span className="h-5 mb-1">Password</span>
            <input className="border-b-2 p-2 mb-1 placeholder:text-sm sm:text-sm dark:bg-slate-800 dark:text-gray-400" name="pw" onChange={onChange} value={input}  type='password'></input>
            {isValid? <span className="h-5 w-96 mb-1"></span>:<span className={input.length === 0?"text-black-500 text-sm h-5 w-96 mb-1":"text-red-500 h-5 text-sm w-96 mb-1"}>비밀번호에는 영문, 숫자, 특수문자가 모두 포함되어야 합니다.</span>}
            <div className="flex justify-center items-end">
              <button className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 hover:bg-sky-500 h-12 w-40 min-w-36 bg-blue-500 rounded text-white" type="submit" disabled={Object.values(isValid).filter(el => el === false).length === 0? false:true}>Optout</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
