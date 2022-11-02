export default function TabDefault({ target, func, state }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="rounded text-gray-500 text-sm font-medium">
        {target.map((el, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                func(idx);
              }}
              value={el.id}
              className={
                func && state === el.id
                  ? "p-2 px-4 inline-block border border-gray-400 text-zinc-500 bg-slate-200 h-10 -mr-1 pt-1.5 first:rounded-l last:rounded-r"
                  : "p-2 px-4 inline-block border border-gray-400 text-gray-500 bg-white hover:bg-slate-100 h-10 -mr-1 pt-1.5 first:rounded-l last:rounded-r"
              }>
              {el.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
