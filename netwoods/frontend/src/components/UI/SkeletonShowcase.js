const SkeletonShowcase =()=>{
window.scroll({top:0});
const times=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

 return (
    <div className="animate-pulse w-full p-4">
            <div className="h-8 w-2/3 mt-24 mb-16 bg-neutral-700"/>
            <div className="grid grid-cols-2 gap-y-8 md:gap-cols-3 lg:grid-cols-4 lg:gap-y-12 place-items-center my-16">
                {
                    times.map(val => <div key={val} className="h-[22vh] w-[14vh] md:h-[352px] md:w-[232px] bg-neutral-700 rounded" />)
                }
            </div>
        </div>
 )
}
export default SkeletonShowcase