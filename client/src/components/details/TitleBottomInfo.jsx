import PropTypes from "prop-types";

export default function TitleBottomInfo({ element, value }) {
  TitleBottomInfo.propTypes = {
    element: PropTypes.string,
    value: PropTypes.number, // PropTypes string 애러 나서 잠시 바꿈!
  };
  return (
    <>
      <span className="text-slate-500 mr-2">{element}</span>
      <span className="mr-6">{value}</span>
    </>
  );
}
