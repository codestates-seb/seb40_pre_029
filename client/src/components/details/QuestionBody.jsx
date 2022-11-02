import ArticleBottomSet from "./ArticleBottomSet.jsx";
export default function QuestionBody() {
  return (
    <div className="ml-6 mr-8">
      <p className="text-lg ">
        Tromsø is well known for it’s hiking opportunities. You shall develop a program for calculating the total length
        and height of mountain hikes. The program shall provide a terminal where the user can input the (i) name of a
        trip/mountain, (ii) the length of the trip in kilometers, and (iii) the vertical climb of the trip in total. The
        program must accept multiple hikes to be registered. The program shall provide a report upon the input “END”
        that prints all the trips, as well as the combined length and height of the trips. expecting the complete python
        code
      </p>
      <div className="mt-8 mb-12">
        <span className="text-cyan-700 text-sm px-2 pt-0.5 pb-1 bg-blue-50 rounded-sm mr-1">algorithm</span>
        <span className="text-cyan-700 text-sm px-2 pt-0.5 pb-1 bg-blue-50 rounded-sm mr-1">algorithm</span>
      </div>
      <ArticleBottomSet date="2010.10.20" nickname="최함수" />
    </div>
  );
}
