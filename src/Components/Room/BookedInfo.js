import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Converter} from "../Common/Converter";

const BookedInfo = ({id, startTime, endTime, bookingDate}) => {

    const [bookedUsersInfo, setBookedUsersInfo] = useState([]);

    const startTimeInt = parseInt(startTime.substr(0, 2));
    const endTimeInt = parseInt(endTime.substr(0, 2));

    useEffect(() => {
        axios.get(`http://localhost:8080/booking/user/bookingId/${id}`, {
            headers: {
                "pragma": sessionStorage.getItem("token")
            }
        })
            .then(response => {
                setBookedUsersInfo(response.data);
            })
    }, [id])

    return (
        <tr>
            <td>{Converter(startTimeInt, startTime)}</td>
            <td>{Converter(endTimeInt, endTime)}</td>
            <td>{bookedUsersInfo.username}</td>
            <td>{bookedUsersInfo.department}</td>
            <td>{bookedUsersInfo.phoneNumber}</td>
            <td>{bookingDate}</td>
        </tr>
    );
};

export default BookedInfo;