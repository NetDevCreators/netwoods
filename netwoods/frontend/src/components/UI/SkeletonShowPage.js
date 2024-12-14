const SkeletonShowPage = () => {
  window.scroll({top:0});
  const times = [1, 2, 3];
  return (
    <div className="animate-pulse pt-20">
      <div className="w-full h-[28rem] md:w-5/6 md:h-[32rem] mx-auto bg-neutral-700" />
      <div className="w-full flex flex-col md:flex-row md:justify-around my-6 p-2">
        <div className="w-full md:w-2/3 mb-8">
          <div className="h-6 w-1/3 my-4 bg-neutral-700" />

            <div className="flex">
          {times.map(val => 
            <div key={val} className="h-4 w-1/6 bg-neutral-700 mr-2" />
          )}
          </div>
          <div className="h-4 w-4/5 my-4 bg-neutral-700" />
          <div className="h-4 w-4/5 my-4 bg-neutral-700" />
          <div className="h-4 w-4/5 my-4 bg-neutral-700" />

          <div className="flex">
            <div className="mr-2 h-4 w-1/6 bg-neutral-700" />
            <div className="mr-2 h-4 w-1/6 bg-neutral-700" />
            <div className="mr-2 h-4 w-1/6 bg-neutral-700" />
          </div>

          <div className="flex items-center my-2">
            <div className="my-2 mr-4 h-4 w-1/6 bg-neutral-700" />
            <div className="my-2 w-14 h-14 rounded-full bg-neutral-700" />
          </div>
        </div>
        <div className="w-full h-[30rem] md:h-[24rem] md:w-[300px] bg-neutral-700" />
      </div>
    </div>
  );
};

export default SkeletonShowPage;
