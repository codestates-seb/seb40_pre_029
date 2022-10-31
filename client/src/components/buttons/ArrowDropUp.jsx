import PropTypes from "prop-types";

export default function ArrowDropUp({ fill }) {
  ArrowDropUp.propTypes = {
    fill: PropTypes.string,
  };
  return (
    <button>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 33L24 13L44 33H4Z" fill={fill} />
      </svg>
    </button>
  );
}
