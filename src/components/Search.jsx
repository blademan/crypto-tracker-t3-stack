const Search = ({ onChange }) => {
  return (
    <div className=" mb-5 flex w-full flex-col justify-center bg-transparent">
      <div className="relative w-full sm:mx-auto sm:max-w-2xl">
        <div className="relative z-0 overflow-hidden rounded-full p-3">
          <form
            role="form"
            className="relative z-50 flex rounded-full bg-slate-900"
          >
            <input
              onChange={onChange}
              type="text"
              placeholder="enter your search here"
              className="flex-1 rounded-full bg-slate-900 px-6 py-4 text-gray-700 focus:outline-none"
            />
            <button className="rounded-full bg-transparent px-8 py-4 font-semibold text-white hover:bg-purple-600 focus:bg-indigo-600 focus:outline-none">
              Search
            </button>
          </form>
          <div className="glow glow-1 absolute -top-10 -left-10 z-10 h-120 w-120 animate-glow1 rounded-100 bg-indigo-400"></div>
          <div className="glow glow-2 absolute -top-10 -left-10 z-20 h-120 w-120 animate-glow2 rounded-100 bg-fuchsia-800"></div>
          <div className="glow glow-3 absolute -top-10 -left-10 z-30 h-120 w-120 animate-glow3 rounded-100 bg-blue-600"></div>
          <div className="glow glow-4 absolute -top-10 -left-10 z-40 h-120 w-120 animate-glow4 rounded-100 bg-violet-700"></div>
        </div>
      </div>
    </div>
  );
};
export default Search;
