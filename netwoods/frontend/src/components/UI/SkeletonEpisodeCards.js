const SkeletonEpisodeCards = () => {
  const times = [1, 2, 3];
  return (
    <>
      {times.map((val) => (
        <div key={val} className="animate-pulse flex flex-col md:flex-row w-full p-4 my-4">
          <div className="flex flex-col md:flex-row items-start md:items-center md:w-full">
            <div className="w-full md:w-[16rem] h-[10rem] rounded-lg bg-neutral-700" />
            <div className="my-2 md:mx-6 w-full">
              <div className="h-4 w-1/2 bg-neutral-700" />
              <div className="hidden md:block w-full">
                <div className="h-4 mt-4 mb-2 bg-neutral-700 " />
                <div className="h-4 mb-2 bg-neutral-700 " />
                <div className="h-4 mb-2 bg-neutral-700 " />
              </div>
            </div>
          </div>
          <div className="w-full md:hidden">
            <div className="h-4 mb-2 w-full bg-neutral-700" />
            <div className="h-4 mb-2 w-full bg-neutral-700" />
            <div className="h-4 mb-2 w-full bg-neutral-700 bg-" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonEpisodeCards;
