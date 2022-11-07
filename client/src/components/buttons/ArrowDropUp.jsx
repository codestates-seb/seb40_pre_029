import PropTypes from "prop-types";

export default function ArrowDropUp({ fill, onClick }) {
  ArrowDropUp.propTypes = {
    fill: PropTypes.string,
  };
  return (
    <button onClick={onClick}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="upbutton" d="M4 33L24 13L44 33H4Z" fill={fill} />
      </svg>
    </button>
  );
}
