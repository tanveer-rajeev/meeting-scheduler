import React from 'react';
import {SidebarData} from "./SidebarData";
import './Sidebar.css'
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {


    return (
        <div className="sidebar ">
            <div className="">
                <ul >
                    {
                        SidebarData.map((item, key) => {
                            return <SidebarMenu key={key} item={item}  />
                        })
                    }
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;