export function Loading() {
  return (
    <div
      role="status"
      className="w-full h-screen py-16 lg:py-[4.5rem] bg-dark-800"
    >
      <div className="w-full h-full flex justify-center items-end animate-pulse">
        <div className="flex flex-col justify-center gap-8 w-11/12 md:w-10/12 h-full">
          <div className="flex flex-col gap-2 w-full h-auto">
            <div className="w-24 h-5 rounded-full bg-dark-700"></div>
            <div className="w-full max-w-prose h-12 rounded-lg bg-dark-700"></div>
            <div className="w-10 h-4 rounded-lg bg-dark-700"></div>
          </div>
          <div className="w-fit rounded-lg padding-button bg-dark-700 whitespace-nowrap text-transparent">
            Ver película
          </div>
          <div className="w-full max-w-40 h-8 rounded-lg bg-dark-700"></div>
          <div className="col-span-1 md:col-span-4 w-full h-52 md:h-40 rounded-md bg-dark-700" />
        </div>
      </div>
    </div>
  );
}
