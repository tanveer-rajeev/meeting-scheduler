import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
export const SidebarData = [
  {
    title: "Profile",
    iconClosed: <RiIcons.RiArrowDownFill />,
    iconOpened: <RiIcons.RiArrowUpFill />,
    subNav: [
      {
        title: "User Details",
        path: "/profile",
        icon: <AiIcons.AiFillHome />,
      },
      {
        title: "Your Scheduler",
        path: "/userScheduler",
        icon: <RiIcons.RiTodoLine />,
      },
    ],
  },
  {
    title: "Ongoing Schedulers",
    iconClosed: <RiIcons.RiArrowDownFill />,
    iconOpened: <RiIcons.RiArrowUpFill />,
    subNav: [
      { title: "Rooms", path: "/rooms", icon: <BsIcons.BsList /> },
      {
        title: "Add Room",
        path: "/addRoom",
        icon: <RiIcons.RiTodoLine />,
      },
    ],
  },
];
