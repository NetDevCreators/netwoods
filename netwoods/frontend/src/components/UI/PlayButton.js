import { PlayIcon } from "../Icons";

const PlayButton = ({onClick,children}) => {

    return (
        <button onClick = {onClick} className = "w-28 h-10 pr-[12px] text-lg flex items-center justify-center font-medium text-black bg-coolRed rounded-md">
        <PlayIcon/>
        {children}
        </button>
    )
}

export default PlayButton;