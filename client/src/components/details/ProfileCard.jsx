export default function ProfileCard({ date, nickname }) {
  return (
    // <div className="bg-slate-50 w-64 h-24 rounded-lg">
    <div className="bg-slate-100 border border-slate-200 pr-4 pl-4 py-2 w-64 h-24 rounded-lg">
      <span className="text-slate-500 mr-2 text-sm">Asked</span>
      <span className="text-gray-600 mr-1 text-sm text-slate-600">{date}</span>
      <div className="flex items-center mt-2 ml-0.5">
        <img
          src={require("../images/GitHub-Mark-Light-120px-plus.png")}
          alt=""
          className="w-9 bg-black rounded-sm ring-black ring-4"
        />
        <span className="ml-4 text-emerald-700 font-medium">{nickname}</span>
      </div>
    </div>
  );
}
