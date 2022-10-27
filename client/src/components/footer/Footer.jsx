// github 링크
import Member from "./Member.jsx";
function Banner() {
  return (
    <a
      className="mx-auto flex flex-col mb-8"
      href="https://github.com/codestates-seb/seb40_pre_029"
      target="_blank"
      rel="noreferrer">
      <span className="text-center text-emerald-400">Team GitHub</span>
      <span className="text-center text-slate-500 text-xl">Codestates Front-End & Back-End Bootcamp 40th</span>
      <div className="text-center">
        <span className="text-center text-gray-300 text-2xl">Pre-Project</span>
        <span className="border-l-gray-500 border-l border-solid mx-4 text-xs"></span>
        <span className="text-center text-gray-300 text-2xl">seb40_pre_029</span>
        <span className="border-l-gray-500 border-l border-solid mx-4 text-xs"></span>
        <span className="text-center text-gray-300 text-2xl">퍼킹룰렛</span>
      </div>
    </a>
  );
}

export default function Footer() {
  const teamMember = [
    { devRole: "Front-End", name: "정준일", github: "https://github.com/EthanJcoding" },
    { devRole: "Front-End", name: "최동환", github: "https://github.com/DalDalChoi" },
    { devRole: "Back-End", name: "김창일", github: "https://github.com/INewWorldI" },
    { devRole: "Back-End", name: "이혜광", github: "https://github.com/hea0408never" },
    { devRole: "Front-End", name: "류지환", github: "https://github.com/lactofreemilk" },
    { devRole: "Front-End", name: "김광민", github: "https://github.com/kwngmin" },
    {
      devRole: "Back-End",
      name: "정회승",
      github: "https://github.com/montsaintandco",
      email: "montsaintco@gmail.com",
    },
  ];
  return (
    <div className="bg-black px-10 pt-10 pb-32">
      <Banner />
      {/* <div className="text-center text-white">https://github.com/codestates-seb/seb40_pre_029</div> */}
      <div className="text-center">
        {teamMember.map((member, index) => {
          return <Member key={index} devRole={member.devRole} name={member.name} email={member.email} />;
        })}
      </div>
    </div>
  );
}
