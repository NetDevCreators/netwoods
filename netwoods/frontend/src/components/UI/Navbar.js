import { useState, useEffect, useRef } from "react";
import { Link , NavLink,useNavigate} from "react-router-dom";
import { SearchIcon , CloseIcon, HamburgerMenuIcon } from "../Icons";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [expandInput,setExpandInput] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const clickHandler = () => {
        if(expandInput){
            inputRef.current.value = '';
        }
        else{
            inputRef.current.focus();
        }

        setExpandInput(prevExpandInput => !prevExpandInput);
    }

    const menuHandler = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setExpandInput(prevExpandInput => !prevExpandInput);

        const searchText = inputRef.current.value;

        inputRef.current.value = '';
        inputRef.current.blur();

        if(searchText.trim() !== ''){
            navigate("/search?value=" + searchText + "&page=1");
        }
    }
    
    return (
        window.innerWidth >= 768
        ?
            <nav className = {`w-full h-16 p-4 hidden md:flex justify-between items-center text-slate-200 fixed top-0 z-[1001] transition-colors ease-in-out duration-500 ${isScrolled && "bg-[#141313]"}`}>
                <div className="w-1/2 flex justify-start items-center">
                    <h1 className="text-4xl"><Link to = "/"> <span className="text-coolRed">Net</span>Woods </Link></h1>
                    <ul className="w-full flex justify-around items-center">
                        <li><NavLink to = "/" className={({isActive}) => isActive ? "text-white font-medium" : "hover:underline"} end> Home </NavLink></li>
                        <li><NavLink to = "/movie" className={({isActive}) => isActive ? "text-white font-medium" : "hover:underline"}> Movies </NavLink></li>
                        <li><NavLink to = "/tv" className={({isActive}) => isActive ? "text-white font-medium" : "hover:underline"}> Series </NavLink></li>
                    </ul>
                </div>
                <form onSubmit = {submitHandler} method = "post" className="flex justify-center items-center">
                    <button type = "button" onClick = {clickHandler} className = {`h-9 w-8 ${expandInput ? "bg-white pl-1 rounded-l-md" : "bg-transparent"}`}><SearchIcon color = {expandInput ? "#000000" : "#ffffff"}/></button>
                    <input ref = {inputRef} type = "text" name = "searchValue" autoComplete = "off" className = {`h-9 text-black bg-white transition-all ease-in-out duration-500 ${expandInput ? "w-72 pl-2" : "w-0"}`}/>
                    {expandInput && <button type = "button" onClick = {clickHandler} className = {`h-9 w-8 ${expandInput ? "bg-white pl-1 rounded-r-md" : "bg-transparent"}`}><CloseIcon/></button>}
                </form>
            </nav>
        :
            <nav className={`w-screen h-16 px-2 md:hidden flex justify-between items-center text-slate-200 fixed top-0 z-10 transition-colors ease-in-out duration-500 ${isScrolled && "bg-[#141313]"}`}>
                <span onClick = {menuHandler}><HamburgerMenuIcon/></span>

                {menuOpen &&
                    <div className="w-screen h-screen px-4 fixed top-0 left-0 bg-black">
                        <div className = "w-full mt-12" onClick = {menuHandler}><CloseIcon color = "#ffffff"/></div>
                        <ul className="w-full h-2/3 flex flex-col justify-evenly items-center">
                            <li onClick = {menuHandler} className="text-2xl"><NavLink to = "/" className={({isActive}) => isActive ? "text-white" : "hover:underline"} end> Home </NavLink></li>
                            <li onClick = {menuHandler} className="text-2xl"><NavLink to = "/movie" className={({isActive}) => isActive ? "text-white text-2xl" : "hover:underline"}> Movies </NavLink></li>
                            <li onClick = {menuHandler} className="text-2xl"><NavLink to = "/tv" className={({isActive}) => isActive ? "text-white text-2xl" : "hover:underline"}> Series </NavLink></li>
                        </ul>
                    </div>
                } 

                <div className="w-full mx-4 flex justify-start items-center">
                    <h1 className="text-4xl"><Link to = "/"> <span className="text-coolRed">N</span>W</Link></h1>
                </div>
                <form onSubmit = {submitHandler} method = "post" className="flex justify-center items-center">
                    <button type = "button" onClick = {clickHandler} className = {`h-9 w-8 ${expandInput ? "bg-white pl-1 rounded-l-md" : "bg-transparent"}`}><SearchIcon color = {expandInput ? "#000000" : "#ffffff"}/></button>
                    <input ref = {inputRef} type = "text" name = "searchValue" autoComplete = "off" className = {`h-9 text-black bg-white transition-all ease-in-out duration-500 ${expandInput ? "w-36 pl-2" : "w-0"}`}/>
                    {expandInput && <button type = "button" onClick = {clickHandler} className = {`h-9 w-10 ${expandInput ? "bg-white pl-1 rounded-r-md" : "bg-transparent"}`}><CloseIcon color = "#000000"/></button>}     
                </form>
            </nav>
    );
}

export default Navbar;