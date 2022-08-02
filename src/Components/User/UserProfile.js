import React from 'react';
import {Col, Row} from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

const UserProfile = () => {
    return (
        <Row>
            <Col md={3}>
                <Sidebar/>
            </Col>
            <Col md={9}>
                <h1>Profile</h1>
            </Col>
        </Row>

    );
};

export default UserProfile;