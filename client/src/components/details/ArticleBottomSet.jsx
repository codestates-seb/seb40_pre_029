import ProfileCard from "./ProfileCard.jsx";
import PropTypes from "prop-types";
export default function ArticleBottomSet({ date, nickname }) {
  ArticleBottomSet.propTypes = {
    date: PropTypes.string,
    nickname: PropTypes.string,
  };
  return (
    <>
      <div className="my-4 flex justify-between">
        <div>
          <span className="text-slate-500 mr-2">Share</span>
          <span className="text-slate-500 mr-2">Edit</span>
          <span className="text-slate-500 mr-2">Follow</span>
        </div>
        <ProfileCard date={date} nickname={nickname} />
      </div>
      <span className="text-gray-400">Add a comment</span>
    </>
  );
}
