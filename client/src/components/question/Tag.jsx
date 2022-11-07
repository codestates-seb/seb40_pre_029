import { useState } from "react";

const Tag = props => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagAmount, setTagAmout] = useState(0);

  const onKeyPress = e => {
    // enter 키가 눌리고 중복되는 값이 없을 때
    if (e.target.value !== "" && e.key === "Enter" && tagList.indexOf(e.target.value) === -1) {
      submitTagItem();
    }
  };

  const onKeyDown = e => {
    if (e.target.value === "" && e.key === "Backspace") {
      tagList.pop();
      setTagList(tagList);
      setTagAmout(tagAmount - 1);
    }
  };

  const submitTagItem = () => {
    if (tagAmount < 5) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tagItem);
      setTagList(updatedTagList);
      props.setTagList(updatedTagList);
      setTagItem("");
      setTagAmout(tagAmount + 1);
    } else {
      window.alert("maximum 5 tags");
    }
  };

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
    props.setTagList(() => filteredTagList);
    setTagAmout(tagAmount - 1);
  };

  return (
    <div className="question-tag-container mb-6 rounded w-full bg-white shadow-md">
      <div className="question-tag py-6 px-8 bg-#FFFFFF dark:bg-slate-800 dark:text-gray-400">
        <div className="text-xl font-medium ">Tags</div>
        <div className="text-sm text-gray-500 mb-4 mt-2">
          Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
        </div>
        <div className="py-0.5 flex items-center flex-wrap w-full border border-gray-400 rounded focus-within:text-black focus-within:outline-none focus-within:border-emerald-500 focus-within:ring-4 focus-within:border focus-within:ring-emerald-100">
          {tagList.length > 0
            ? tagList.map((tagItem, index) => {
                return (
                  <div
                    className="px-2 h-8 mr-1 my-0.5 flex flex-row items-center justify-center items-center rounded bg-emerald-100 text-sm text-black"
                    key={index}>
                    <div className="mr-1">{tagItem}</div>
                    <button onClick={deleteTagItem}>❎</button>
                  </div>
                );
              })
            : null}

          <input
            className="h-8 my-0.5 mx-1 grow outline-none text-sm"
            type="text"
            onChange={e => setTagItem(e.target.value)}
            value={tagItem}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}></input>
        </div>
      </div>
    </div>
  );
};

export default Tag;
