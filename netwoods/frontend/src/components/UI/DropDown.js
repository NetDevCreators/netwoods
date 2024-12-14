import { useState } from "react"
import { DropDownIcon } from "../Icons";


const DropDown = ({selectedIndex,selectables,onClick}) => {
    const [selectVisible,setSelectVisible] = useState(false);

    const selectHandler = () => {
        setSelectVisible(prevState => !prevState);
    }

    return (
        <div id = "selectMenu" className="self-start relative mb-2">
            <div onClick = {selectHandler} className={`w-64 px-4 py-2 flex justify-between items-center bg-coolBlack text-white border cursor-pointer ${selectVisible ? "rounded-t-sm border-b-0" : "rounded-sm"}`}> 
                <h4>{selectedIndex < selectables.length && selectables[selectedIndex].name}</h4>
                <span><DropDownIcon/></span>
            </div>

            <div className={`w-64 px-4 max-h-52 overflow-auto absolute top-auto z-10 bg-coolBlack text-white rounded-b-sm border ${selectVisible ? "block border-t-0" : "hidden"}`}>
                {selectables.map((s,idx) => <h4 key = {idx} onClick = {() => {selectHandler(); onClick(idx) }} className="hover:font-bold cursor-pointer my-4">{s.name}</h4>)}
            </div>
        </div>
    )
}

export default DropDown;