import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router';
import {UserContext} from '../../App';
import {logInWithCredentials, signUPWithCredentials} from './CredentialController';
import "./login.css"
import {Form, FormControl} from "react-bootstrap";

const Login = () => {

    const [credential, setCredential] = useState({
        username: '',
        password: '',
        phoneNumber: '',
        department: ''
    });

    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleResponse = (res, redirect) => {
        if (redirect) {
            console.log(res)

            setLoggedInUser(res);
            history.push(`home`);
        } else {
            setNewUser(redirect);
        }
    }


    const handleSubmit = (e) => {
        const {username, password, phoneNumber, department} = credential;
        e.preventDefault();
        if (newUser) {
            signUPWithCredentials(username, password, phoneNumber, department)
                .then((response) => {
                    handleResponse(response, false);
                }).catch(err => {
                setError(err);
            })
        } else if (username && password) {
            // sessionStorage.setItem('name',username);

            logInWithCredentials(credential)
                .then((response) => {
                    handleResponse(response, true);
                })
        }

    }

    return (


        <div id="accountDiv" className=" container p-5">

            <Form onSubmit={handleSubmit}>

                {
                    !newUser && <>
                        <h1>Log In </h1>
                        <fieldset>
                            <legend >Username</legend>
                            <FormControl id="signUp-username"
                                   onChange={(e) => setCredential({...credential, username: e.target.value})}
                                   value={credential.username} className="inp-style" type="text"
                                   placeholder="username"/>
                        </fieldset>

                        <fieldset>
                            <legend >Password</legend>
                            <FormControl id="signUp-password" value={credential.password}
                                   onChange={(e) => setCredential({...credential, password: e.target.value})}
                                   className="inp-style" type="password"
                                   placeholder="password"/>
                        </fieldset>
                    </>
                }
                {
                    newUser &&
                    <> <h1>Create Account</h1>
                        <fieldset>
                            <legend >Username</legend>
                            <FormControl id="signUp-username"
                                   onChange={(e) => setCredential({...credential, username: e.target.value})}
                                   value={credential.username} className="inp-style" type="text"
                                   placeholder="username"/>
                        </fieldset>

                        <fieldset>
                            <legend >Password</legend>
                            <FormControl id="signUp-password" value={credential.password}
                                   onChange={(e) => setCredential({...credential, password: e.target.value})}
                                   className="inp-style" type="password"
                                   placeholder="password"/>
                        </fieldset>
                        <fieldset>
                            <legend >Phone Number</legend>
                            <FormControl id="signUp-password" value={credential.phoneNumber}
                                   onChange={(e) => setCredential({...credential, phoneNumber: e.target.value})}
                                   className="inp-style" type="text"
                                   placeholder="phone number"/>
                        </fieldset>
                        <fieldset>
                            <legend >Department</legend>
                            <FormControl id="signUp-password" value={credential.department}
                                   onChange={(e) => setCredential({...credential, department: e.target.value})}
                                   className="inp-style" type="text"
                                   placeholder="department"/>
                        </fieldset>

                    </>
                }
                <br/>
                <input  type="submit" value={newUser ? 'Sign Up' : 'Log In'}/>
            </Form>
            <p>{error}</p>
            <br/>
            <h5> Don't have an account?</h5>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <legend >Create Account</legend>
            <br/>
        </div>
    );
};

export default Login;