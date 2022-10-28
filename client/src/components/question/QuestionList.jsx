//author 누르면 페이지 이동 title 클릭하면 질문페이지로 이동

const QuestionList = () => {
  const getParsedDate = createdAt => {
    return new Date(createdAt).toLocaleDateString("ko-KR");
  };

  const dummyArticle = [
    {
      author_id: "유재석",
      title: "국민MC가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "방송", tagId: 14 },
        { tag: "방송", tagId: 13 },
        { tag: "방송", tagId: 12 },
      ],
      views: 40,
      commentsAmount: 10,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 0,
      recommendId: ["강호동", "신동엽"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 7,
      downVote: 3,
      isSelected: true,
    },
    {
      author_id: "유재석",
      title: "국민MC가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "방송", tagId: 14 },
        { tag: "방송", tagId: 13 },
        { tag: "방송", tagId: 12 },
      ],
      views: 40,
      commentsAmount: 10,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 0,
      recommendId: ["강호동", "신동엽"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 7,
      downVote: 3,
      isSelected: false,
    },
    {
      author_id: "유재석",
      title: "국민MC가 되기 위해선 무얼 해야하나요?",
      tags: [
        { tag: "엔터테인먼트", tagId: 23 },
        { tag: "자바스크립트", tagId: 17 },
        { tag: "방송", tagId: 14 },
        { tag: "방송", tagId: 13 },
        { tag: "방송", tagId: 12 },
      ],
      views: 40,
      commentsAmount: 10,
      date_published: getParsedDate("2022-02-24T16:17:47.000Z"),
      id: 0,
      recommendId: ["강호동", "신동엽"],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      upVote: 7,
      downVote: 3,
      isSelected: true,
    },
  ];

  const tags = dummyArticle[0].tags;

  return (
    <section>
      <ul className="questions-container relative">
        {dummyArticle.map(article => {
          return (
            <div className="question-summary p-4 border-t-2 flex grow" key={article.id}>
              <div className="question-stats flex flex-col flex-wrap shrink-0 items-end mr-4 p-1 mb-1">
                <div className="question-upvote">{article.upVote} votes</div>
                {article.isSelected ? (
                  <div className="question-answer border-2 border-green-600 text-green-800 p-1 rounded">
                    {article.commentsAmount} answers
                  </div>
                ) : (
                  <div className="question-answer">{article.commentsAmount} answers</div>
                )}

                <div className="question-views">{article.views} views</div>
              </div>
              <li className="question">
                <div className="question-content grow-1 max-w-full flex-col">
                  <div className="question-title break-words mb-1 p-1">{article.title}</div>
                  <div className="question-summary-meta flex flex-wrap items-center space-x-16 gap-x-1 gap-y-2">
                    <div className="question-tag inline-flex">
                      {tags.map((el, idx) => {
                        return (
                          <div className="border-2 mr-1 mb-1 p-1" key={idx}>
                            {el.tag}
                          </div>
                        );
                      })}
                    </div>
                    <div className="author-info flex items-center ml-auto justify-end gap-1 ">
                      <div className="question-author">{article.author_id}</div>
                      <div className="question-createdAt">{article.date_published}</div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default QuestionList;
