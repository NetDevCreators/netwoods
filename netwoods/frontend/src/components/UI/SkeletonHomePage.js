import { SkeletonSlider } from "./SkeletonMoviesSeries";

const SkeletonHomePage = () => {
  
  window.scroll({top:0});

  const times = [1, 2, 3];
  return (
    <div className="animate-pulse">
      <div className="h-[36rem] w-full bg-neutral-700" />
      <div className="px-4">
      {times.map((val) => (
        <SkeletonSlider key={val} />
      ))}
      </div>
    </div>
  );
};

export default SkeletonHomePage;
