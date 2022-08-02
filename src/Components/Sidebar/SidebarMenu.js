import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './SidebarMenu.css'

const SidebarMenu = ({item}) => {
    const [subNav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subNav);
    return (
        <div>
            <Link id="link-to" to={item.path} onClick={item.subNav && showSubnav}>
                <div className="sidebar-list">
                    <div className="icon">{item.icon}</div>
                    <div className="title">{item.title}</div>
                    <div>
                        {
                            item.subNav && subNav
                                ? item.iconOpened
                                : item.subNav
                                    ? item.iconClosed
                                    : null
                        }
                    </div>
                </div>
            </Link>

            {
                subNav && item.subNav.map((item, key) => {
                    return <Link id="subNav" to={item.path} key={key}>
                        <div className="subNav-list">
                            <div className="icon">{item.icon}</div>
                            <div className="title">{item.title}</div>
                        </div>
                    </Link>

                })
            }

        </div>
    );
};

export default SidebarMenu;