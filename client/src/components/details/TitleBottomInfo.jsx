export default function TitleBottomInfo({ element, value }) {
  return (
    <>
      <span className="text-slate-500 mr-2">{element}</span>
      <span className="mr-6">{value}</span>
    </>
  );
}
