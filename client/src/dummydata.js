const getParsedDate = createdAt => {
  return new Date(createdAt).toLocaleDateString("ko-KR");
};

//dummy article
const dummyArticle = [
  {
    MEMBER_ID: "제임스",
    QUESTION_ID: 2,
    COMMENT_ID: ["유재석"],
    title: "detect the number of three way conversations in chat dataset using",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: getParsedDate("2022-02-24T16:17:47.000Z"),
    modifiedAt: getParsedDate("2022-02-24T16:17:47.000Z"),
    views: 33,
    recommend_id: [0, 1],
    tags: [
      { tag: "javascript", id: 1 },
      { tag: "python", id: 2 },
      { tag: "java", id: 3 },
      { tag: "php", id: 4 },
      { tag: "mysql", id: 5 },
    ],
    commentsAmount: 7, // 댓글 개수
    isSelected: false,
  },
  {
    MEMBER_ID: "신동엽",
    QUESTION_ID: 1,
    COMMENT_ID: ["유재석"],
    title: "국민MC가 되기 위해선 무얼 해야하나요?",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: getParsedDate("2022-02-24T16:17:47.000Z"),
    modifiedAt: getParsedDate("2022-02-24T16:17:47.000Z"),
    views: 12,
    recommend_id: [0, 1],
    tags: [
      { tag: "javascript", id: 1 },
      { tag: "python", id: 2 },
      { tag: "java", id: 3 },
    ],
    commentsAmount: 7, // 댓글 개수
    isSelected: false,
  },
];

export default dummyArticle;
