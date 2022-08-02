import axios from 'axios';
import React, { useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const WorkingPlaceCapacity = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableCapacity, setAvailableCapacity] = useState('');

    const token = sessionStorage.getItem('token');
    const header = {
        "pragma": token
    }

    const getCapacity = (date)=>{
         console.log( date);
        axios.get(`http://localhost:8080/booking/getCapacity/${date}`, {
            headers: header
        }).then(res => {
            setAvailableCapacity(res.data);
        })
  
    }
        


    const  formatDate=  (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleChange = (date) => {
        date = date.toString().slice(0, 16)
        date = formatDate(date)
        setSelectedDate(date);
        getCapacity(date);
    }

    return (
        <div className="  mt-5 p-3">

            <main style={{height: '600px'}} className="row d-flex align-items-center">
                <div className="col-md-4 offset-md-1">
                    <h1 style={{color: '#3A4256'}}>Appointment</h1>
                    <Calendar
                        onChange={handleChange}
                        value={new Date()}
                    />
                </div>
                <div className="col-md-6">
                    {/*<img src={chair} alt="" className="img-fluid" />*/}
                    <div className="container  mt-5">

                        {
                            availableCapacity &&
                            <div className="container bookingNotification">

                                <h1>The capacity of free working places on
                                    "{selectedDate} "is {availableCapacity}% </h1>

                            </div>
                        }
                    </div>
                </div>
            </main>


        </div>
    );
};

export default WorkingPlaceCapacity;