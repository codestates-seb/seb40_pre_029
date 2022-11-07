export default function Spinner() {
  return (
    <div className="w-full mr-8 mb-16 flex flex-col justify-center items-center h-screen">
      <div className="spinner inline-block relative w-20 h-20">
        <div className="inline-block absolute w-3 left-2 bg-emerald-600"></div>
        <div className="inline-block absolute w-3 left-2 bg-emerald-600"></div>
        <div className="inline-block absolute w-3 left-2 bg-emerald-600"></div>
      </div>
      <span className="text-lg text-gray-600">Loading...</span>
    </div>
  );
}