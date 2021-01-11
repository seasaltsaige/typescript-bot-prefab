//@ts-nocheck
import React from "react";
import { Dropdown, Image, SplitButton } from "react-bootstrap";
import { ReactComponent as Plus } from "../../Images/plus_sign.svg"
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./Dashboard.css";
import getAbbreviation from "../../utils/functions";

function DashboardSidebar(props: any) {

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
                `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`.includes("null")
                    ?
                    <div
                        className={`guildDiv ${data.id}`}
                        onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id} `}
                    >
                        {getAbbreviation(data.name)}
                    </div>
                    :
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

                <h3 className="invite-text">Invite Bot to your Server!</h3>

                <div className="server-popup">

                    <SplitButton
                        className="server-select"
                        variant="dark"
                        title="Select a Server"
                    >
                        {
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
                    </SplitButton>

                </div>
            </Popup>
        </div>
    );

}

export default DashboardSidebar;