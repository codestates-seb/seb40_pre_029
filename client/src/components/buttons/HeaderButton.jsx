import PropTypes from "prop-types";

export default function HeaderButton({ name, id, openModalHandler }) {
  HeaderButton.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    openModalHandler: PropTypes.func,
  };
  return (
    <>
      <button className="h-full hover:bg-slate-200 w-40 font-medium" onClick={openModalHandler} id={id}>
        {name}
      </button>
    </>
  );
}
