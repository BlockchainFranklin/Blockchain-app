import { AiOutlineTable } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaWallet, FaHistory, FaCheck, FaImage } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="containerSidebar">
            <div className="menuSidebar">
                <NavLink 
                    to="dashboard" 
                    className={`itemSidebar ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                    title={"Dashboard"}
                >
                    <FaWallet size={30}/>
                </NavLink>         
                <NavLink
                    to="takephoto"
                    className={`itemSidebar ${location.pathname === '/takephoto' ? 'active' : ''}`}
                    title="Make photo"
                >
                    <BsPersonBoundingBox size={30}/>
                </NavLink>
                <NavLink
                    to="addrate"
                    className={`itemSidebar ${location.pathname === '/addrate' ? 'active' : ''}`}
                    title="Add rate"
                >
                    <FaImage size={30}/>
                </NavLink>
                <NavLink
                    to="history"
                    className={`itemSidebar ${location.pathname === '/history' ? 'active' : ''}`}
                    title="History"
                >
                    <FaHistory size={30}/>
                </NavLink>

                <NavLink
                    to="confirm"
                    className={`itemSidebar ${location.pathname === '/confirm' ? 'active' : ''}`}
                    title="Confirm"
                >
                    <FaCheck size={30} />
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;
