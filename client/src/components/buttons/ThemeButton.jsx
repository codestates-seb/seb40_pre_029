import PropTypes from "prop-types";

export default function ThemeButton({ theme }) {
  ThemeButton.propTypes = {
    theme: PropTypes.object,
  };
  return (
    <button className="hover:bg-gray-900 w-12 h-12 rounded-full p-2 mx-2">
      <span className="material-icons text-yellow-500 leading-8 group-hover/theme:text-yellow-300 text-3xl">
        {theme}
      </span>
    </button>
  );
}
