import ArticleBottomSet from "./ArticleBottomSet.jsx";
//BACKEND Tag 구현되면 추가해야함 지금 하드코딩 상태
export default function QuestionBody({ data }) {
  return (
    <div className="ml-6 mr-8 w-full">
      <p className="text-lg ">{data.article}</p>
      <div className="mt-8 mb-12">
        <span className="text-cyan-700 text-sm px-2 pt-0.5 pb-1 bg-blue-50 rounded-sm mr-1">algorithm</span>
        <span className="text-cyan-700 text-sm px-2 pt-0.5 pb-1 bg-blue-50 rounded-sm mr-1">algorithm</span>
      </div>
      <ArticleBottomSet date="2010.10.20" nickname="최함수" />
    </div>
  );
}
