const Spinner = () => {
  return (
    <div class="relative">
      <div class="h-20 w-20 rounded-full border-2 border-purple-200"></div>
      <div class="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-t-2 border-purple-700"></div>
    </div>
  );
};
export default Spinner;
