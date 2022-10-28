// 재사용 가능하게 만들려면..?
// input 으로 사용자가 지정한 태그를 끌어오고 return 목록
import { useState } from "react";

const Tag = () => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagAmount, setTagAmout] = useState(0);

  const onKeyPress = (e) => {
    if (
      e.target.value !== "" &&
      e.key === "Enter" &&
      tagList.indexOf(e.target.value) === -1
    ) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    if (tagAmount < 5) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tagItem);
      setTagList(updatedTagList);
      setTagItem("");
      setTagAmout(tagAmount + 1);
    } else {
      window.alert("maximum 5 tags");
    }
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
    setTagAmout(tagAmount - 1);
  };
  return (
    <div className="question-tag-container border-2 border-#E3E6E8 w-4/5 mb-12 rounded">
      <div className="question-tag p-4 bg-#FFFFFF">
        <div className="p-1">태그</div>
        <div className="flex flex-wrap w-full border-2 focus-within:border-pink-300 rounded">
          {tagList.map((tagItem, index) => {
            return (
              <div
                className="p-1 tag-item flex flex-row justify-center items-center rounded m-1 bg-sky-200"
                key={index}
              >
                <div className="p-1">{tagItem}</div>
                <button className="p-1" onClick={deleteTagItem}>
                  ❌
                </button>
              </div>
            );
          })}

          <input
            className="w-auto p-2 bg-transparent outline-none"
            type="text"
            onChange={(e) => setTagItem(e.target.value)}
            value={tagItem}
            onKeyPress={onKeyPress}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Tag;
