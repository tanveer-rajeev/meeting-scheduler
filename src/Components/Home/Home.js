import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Row>
                <Col md={3}>
                    <Sidebar/>
                </Col>
                <Col md={9}>
                    {/*<Login/>*/}
                </Col>
            </Row>
        </>

    );
};

export default Home;