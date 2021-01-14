//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Form, Image, Nav, Navbar } from "react-bootstrap";
import { userDetails } from "../../utils/api";
import "./NavBar.css";

function login() {
    window.location.href = "http://localhost:4000/api/login";
}

function dashboard() {
    window.location.href = "http://localhost:3000/dashboard";
}

function NavBar(props: any) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userDetails().then(({ data }) => {
            setLoggedIn(true);
            setUser(data);
            setLoading(false);
        }).catch(err => {
            setLoggedIn(false);
            setUser(null);
            setLoading(false);
        });
    }, []);

    return !loading && (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Navbar.Brand href="/">Discord Bot Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" />
                <Form inline>
                    {
                        !loggedIn
                            ? <Button variant="dark" onClick={login}>Login</Button>
                            : <Button variant="dark" onClick>Profile</Button>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;