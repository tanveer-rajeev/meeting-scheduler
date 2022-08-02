import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Button, Nav, Navbar} from "react-bootstrap";
import {UserContext} from '../../App';
import "./Header.css"
import {useHistory} from "react-router";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const handleResponse = () => {
            setLoggedInUser({});
            history.push(`/`);
    }
    return (
        <div className="">
            <Navbar className="navbar-main" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <h1 className="nav-title ">Scheduler</h1>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto pr-5">

                    </Nav>
                    <Nav >
                        {loggedInUser.name ? (
                            <Button
                                onClick={handleResponse}
                            >
                                ʟᴏɢ ᴏᴜᴛ
                            </Button>
                        ) : (
                            <Link to="/" className="nav-link">
                                ʟᴏɢɪɴ
                            </Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;