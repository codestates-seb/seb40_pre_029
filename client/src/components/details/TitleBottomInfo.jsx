import PropTypes from "prop-types";

export default function TitleBottomInfo({ element, value }) {
  TitleBottomInfo.propTypes = {
    element: PropTypes.string,
    value: PropTypes.string,
  };
  return (
    <>
      <span className="text-slate-500 mr-2">{element}</span>
      <span className="mr-6">{value}</span>
    </>
  );
}
