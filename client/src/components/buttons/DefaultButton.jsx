import PropTypes from "prop-types";
export default function DefaultButton({ name }) {
  DefaultButton.propTypes = {
    name: PropTypes.string,
  };
  return (
    <button className="px-6 pb-1 shadow-sky-300 shadow-tline border border-sky-500 h-12 min-w-36 bg-blue-500 rounded text-white">
      <span>{name}</span>
    </button>
  );
}
