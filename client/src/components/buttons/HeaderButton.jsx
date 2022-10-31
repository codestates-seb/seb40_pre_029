import PropTypes from "prop-types";

export default function HeaderButton({ name, id, openModalHandler }) {
  HeaderButton.propTypes = {
    name: PropTypes.object,
    id: PropTypes.object,
    openModalHandler: PropTypes.object,
  };
  return (
    <>
      <button className="h-full hover:bg-slate-200 w-40 font-medium" onClick={openModalHandler} id={id}>
        {name}
      </button>
    </>
  );
}
