//@ts-nocheck
import React from "react";
import { Dropdown, Image, SplitButton } from "react-bootstrap";
import { ReactComponent as Plus } from "../../Images/plus_sign.svg"
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./Dashboard.css";

function Dashboard(props: any) {

    const user = props.user;
    const servers = props.servers;
    const managed = props.managed;

    return (

        <div className="guildImages">

            <Image
                src={user.avatar}
                className="profile"
                roundedCircle />

            {servers!.map((data) => (
                <Image
                    className={`guildImage ${data.id}`}
                    src={`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`}
                    onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id} `}
                    roundedCircle />
            ))}
            <Popup
                trigger={
                    <Plus className="add-to-server" />
                }
                position="right center"
                modal>

                <span className="server-popup">
                    <SplitButton
                        variant="dark"
                        title="Select a Server">
                        {
                            managed.map((s, index) => (
                                <Dropdown.Item
                                    eventKey={s.id}
                                    key={index}
                                    className={`dropdown-item ${s.id}`} >
                                    {s.name}
                                </Dropdown.Item>
                            ))
                        }
                    </SplitButton>

                </span>
            </Popup>
        </div>
    );

}

export default Dashboard;