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
    { devRole: "Front-End", name: "정준일", github: "https://github.com/EthanJcoding", email: "ethan.95j@gmail.com" },
    { devRole: "Front-End", name: "최동환", github: "https://github.com/DalDalChoi", email: "ethan.95j@gmail.com" },
    { devRole: "Back-End", name: "김창일", github: "https://github.com/INewWorldI", email: "kk971107@naver.com" },
    { devRole: "Back-End", name: "이혜광", github: "https://github.com/hea0408never", email: "hea0408never@naver.com" },
    { devRole: "Front-End", name: "류지환", github: "https://github.com/lactofreemilk", email: "jihwan4743@gmail.com" },
    { devRole: "Front-End", name: "김광민", github: "https://github.com/kwngmin", email: "kwngmink@gmail.com" },
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
        {/* {teamMember.map(member => {
          const { devRole, name, email } = member;
          console.log({ devRole, name, email });
          <Member devRole={member.devRole} name={member.name} email={member.email} />;
        })} */}
        <Member devRole={teamMember[0].devRole} name={teamMember[0].name} github={teamMember[0].github} />
        <Member devRole={teamMember[1].devRole} name={teamMember[1].name} github={teamMember[1].github} />
        <Member devRole={teamMember[2].devRole} name={teamMember[2].name} github={teamMember[2].github} />
        <Member devRole={teamMember[3].devRole} name={teamMember[3].name} github={teamMember[3].github} />
        <Member devRole={teamMember[4].devRole} name={teamMember[4].name} github={teamMember[4].github} />
        <Member devRole={teamMember[5].devRole} name={teamMember[5].name} github={teamMember[5].github} />
        <Member devRole={teamMember[6].devRole} name={teamMember[6].name} github={teamMember[6].github} />
      </div>
    </div>
  );
}
