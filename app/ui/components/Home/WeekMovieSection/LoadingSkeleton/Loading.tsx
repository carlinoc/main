export function Loading() {
  return (
    <div
      role="status"
      className="w-full min-height-banner--sm lg:min-height-banner--lg py-16 lg:py-[4.5rem] bg-dark-800"
    >
      <div className="w-full h-full flex justify-center items-end animate-pulse">
        <div className="flex flex-col justify-center gap-8 w-11/12 md:w-10/12 h-full">
          <div className="flex flex-col gap-8 w-full h-auto">
            <div className="w-full max-w-md h-12 rounded-lg bg-dark-700"></div>
            <div className="w-full max-w-xs h-5 rounded-full bg-dark-700"></div>
            <div className="w-full max-w-prose h-28 rounded-lg bg-dark-700"></div>
          </div>
          <div className="w-fit rounded-lg padding-button bg-dark-700 whitespace-nowrap text-transparent">
            Ver película
          </div>
        </div>
      </div>
    </div>
  );
}
