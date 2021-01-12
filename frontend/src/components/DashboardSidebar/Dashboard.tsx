//@ts-nocheck
import React, { useEffect } from "react";
import { Dropdown, DropdownButton, Image, OverlayTrigger, SplitButton, Tooltip } from "react-bootstrap";
import { ReactComponent as Plus } from "../../Images/plus_sign.svg"
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./Dashboard.css";
import getAbbreviation from "../../utils/functions";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function DashboardSidebar(props: any) {

    const user = props.user;
    const servers = props.servers;
    const managed = props.managed;
    const currentPage = props.currentPage;

    useEffect(() => {
        if (currentPage !== undefined) {
            const element = document.getElementById(currentPage);
            if (element) {
                element.style.borderRadius = "30%";
            }
            const pill = document.getElementById(`item ${currentPage}`);
            if (pill) {
                pill.style.visibility = "visible";
                pill.style.width = "6px";
                pill.style.height = "60px";
                pill.style.marginTop = "7px"
            }
        }
    }, []);

    return (

        <div className="guildImages">

            <Image
                src={user.avatar}
                className="profile"
                roundedCircle />

            {servers!.map((data) => (
                `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`.includes("null")
                    ?
                    <div className="profile-div">
                        <div
                            className="pill wrapper"
                            aria-hidden="true">
                            <span
                                className={`item ${data.id}`}
                                id={`item ${data.id}`}
                                style={
                                    {
                                        // visibility: "hidden",
                                        opacity: 1,
                                        height: "40px",
                                        transform: "none",
                                    }
                                } />
                        </div>
                        <div
                            id={data.id}
                            className={`guildDiv ${data.id}`}
                            onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id} `}
                        >
                            {getAbbreviation(data.name)}
                        </div>
                    </div>
                    :

                    <div className="profile-div">
                        <div
                            className="pill wrapper"
                            aria-hidden="true">
                            <span
                                className={`item ${data.id}`}
                                id={`item ${data.id}`}
                                style={
                                    {
                                        // visibility: "hidden",
                                        opacity: 1,
                                        height: "40px",
                                        transform: "none",
                                    }
                                } />
                        </div>
                        <img
                            id={data.id}
                            className={`guildImage ${data.id}`}
                            src={`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`}
                            onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id}`}
                            key={data.id}>
                        </img>
                    </div>
            ))}


            <Popup
                trigger={
                    <Plus
                        className="add-to-server"
                    />
                }
                position="center center"
                modal>

                <h3 className="invite-text">Invite Bot to your Server!</h3>

                <div className="server-popup">

                    <DropdownButton
                        className="server-select"
                        variant="dark"
                        title="Select a Server"
                    >

                        {
                            managed.length === 0
                                ?
                                <DropdownItem
                                    className="dropdown-item">
                                    None
                                </DropdownItem>
                                :
                                managed.map((s, index) => (
                                    <Dropdown.Item
                                        eventKey={s.id}
                                        key={index}
                                        className={`dropdown-item ${s.id}`}
                                        href={`https://discord.com/oauth2/authorize?client_id=776538408780038144&scope=bot&permissions=8&guild_id=${s.id}`} >
                                        {s.name}
                                    </Dropdown.Item>
                                ))
                        }

                    </DropdownButton>

                </div>
            </Popup>
        </div>
    );

}

export default DashboardSidebar;