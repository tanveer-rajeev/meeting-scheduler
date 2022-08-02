import React, {useState} from 'react';
import {Converter} from "../Common/Converter";
import {Button} from "react-bootstrap";
import EditScheduler from "./EditScheduler";

const SchedulerList = ({bookingResponse}) => {
    const {roomName, booking} = bookingResponse;
    const {id,startTime,endTime,bookingDate} = booking;
    const startTimeInt = parseInt(startTime.substr(0, 2));
    const endTimeInt = parseInt(endTime.substr(0, 2));
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <tr>
                <td>{roomName}</td>
                <td>{Converter(startTimeInt, startTime)}</td>
                <td>{Converter(endTimeInt, endTime)}</td>
                <td>{bookingDate}</td>
                <td><Button variant="secondary" size={"sm"} onClick={() => setModalShow(true)}>
                    Edit
                </Button>
                </td>
            </tr>
            {
                modalShow && <EditScheduler
                    key={id}
                    roomName = {roomName}
                    booking={booking}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            }

        </>
    );
};

export default SchedulerList;