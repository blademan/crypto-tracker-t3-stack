const Spinner = () => {
  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-full border-2 border-purple-200"></div>
      <div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-t-2 border-purple-700"></div>
    </div>
  );
};
export default Spinner;
