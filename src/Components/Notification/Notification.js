import React from 'react';
import { useParams } from 'react-router';

const Notification = (props) => {
    const { message } = props;
    console.log(message);
    return (
        <div>
            <h1>Notification is loading...</h1>
        </div>
    );
};

export default Notification;