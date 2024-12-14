const SkeletonMoviesSeries = () => {
  window.scroll({top:0});

  const times = [1, 2, 3, 4, 5];
  return (
    <div className="animate-pulse p-4 mt-20">
      <div className="h-8 w-3/5 bg-neutral-700" />
      {times.map((val) => (
        <SkeletonSlider key={val} />
      ))}
    </div>
  );
};
export default SkeletonMoviesSeries;

export const SkeletonSlider = () => {
  return (
    <>
      <div className="my-6 h-6 w-2/5 bg-neutral-700" />
      <div className="flex justify-between items-center my-4">
        <div className="h-[22vh] w-[14vh] md:h-[352px] md:w-[232px] bg-neutral-700 rounded" />
        <div className="h-[22vh] w-[14vh] md:h-[352px] md:w-[232px] bg-neutral-700 rounded" />
        <div className="h-[22vh] w-[14vh] md:h-[352px] md:w-[232px] bg-neutral-700 rounded" />
      </div>
    </>
  );
};
