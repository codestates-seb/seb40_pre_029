import PropTypes from "prop-types";

export default function ArrowDropDown({ fill, onClick }) {
  ArrowDropDown.propTypes = {
    fill: PropTypes.string,
  };
  return (
    <button onClick={onClick}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="downbutton" d="M24 35L4 15H44L24 35Z" fill={fill} />
      </svg>
    </button>
  );
}
