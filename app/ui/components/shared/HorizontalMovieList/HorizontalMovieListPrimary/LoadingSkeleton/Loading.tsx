export function Loading() {
  return (
    <article className="flex flex-col items-start gap-5 w-full h-72 animate-pulse">
      <div className="w-40 h-9 rounded-md bg-dark-800"></div>
      <div className="col-span-1 md:col-span-4 w-full h-52 md:h-40 rounded-md bg-dark-700" />
    </article>
  );
}
