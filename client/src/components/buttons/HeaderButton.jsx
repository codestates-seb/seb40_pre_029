import PropTypes from "prop-types";

export default function HeaderButton({ name, id, openModalHandler }) {
  HeaderButton.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    openModalHandler: PropTypes.func,
  };
  return (
    <>
      <button
        className="h-full dark:bg-slate-900 dark:text-gray-400 w-40 font-medium "
        onClick={openModalHandler}
        id={id}>
        {name}
      </button>
    </>
  );
}
