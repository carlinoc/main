export function Loading() {
  return (
    <div role="status" className="w-full h-[40vh] lg:h-[50vh] bg-dark-800">
      <div className="w-full h-full flex justify-center items-center animate-pulse">
        <div className="w-full max-w-xs h-12 rounded-lg bg-dark-700"></div>
      </div>
    </div>
  );
}
