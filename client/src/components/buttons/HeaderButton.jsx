import PropTypes from "prop-types";

export default function HeaderButton({ name }) {
  HeaderButton.propTypes = {
    name: PropTypes.object,
  };
  return (
    <>
      <button className="h-full hover:bg-slate-200 w-40 font-medium">{name}</button>
    </>
  );
}
