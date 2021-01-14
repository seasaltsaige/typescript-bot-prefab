//@ts-nocheck
import React, { useEffect } from "react";
import { Dropdown, DropdownButton, Image as Img, OverlayTrigger, SplitButton, Tooltip } from "react-bootstrap";
import { ReactComponent as Plus } from "../../Images/plus_sign.svg"
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./Dashboard.css";
import getAbbreviation from "../../utils/functions";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function imageExists(url: string, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
}


function DashboardSidebar(props: any) {

    const user = props.user;
    const servers = props.servers;
    const managed = props.managed;
    const currentPage = props.currentPage;

    useEffect(() => {

        const avatarImage = document.getElementById("profile");
        if (avatarImage) {
            avatarImage.onpointerenter = (() => {
                const img = new Image();
                img.onerror = () => avatarImage.src = avatarImage.src.replace(".gif", ".png");
                img.onload = () => avatarImage.src = avatarImage.src.replace(".png", ".gif");
                img.src = avatarImage.src.replace(".png", ".gif");
            });
            avatarImage.onpointerleave = (() => avatarImage.src = avatarImage.src.replace(".gif", ".png"));
        }

        const guildImages = document.getElementsByClassName("guildImage");

        if (guildImages.length > 0) {
            for (const guildImage of guildImages) {
                const gImage = document.getElementById(guildImage.id);
                if (gImage) {
                    gImage.onpointerenter = (() => {
                        const img = new Image();
                        img.onerror = () => gImage.src = gImage.src.replace(".gif", ".png");
                        img.onload = () => gImage.src = gImage.src.replace(".png", ".gif");
                        img.src = gImage.src.replace(".png", ".gif");
                    });
                    gImage.onpointerleave = (() => gImage.src = gImage.src.replace(".gif", ".png"));
                }
            }
        }

        if (currentPage !== undefined) {
            const element = document.getElementById(currentPage);
            if (element) {
                element.style.borderRadius = "30%";
                if (element.attributes[1].nodeValue?.includes("guildDiv")) {
                    element.style.backgroundColor = "#7289da";
                }

            }
            const pill = document.getElementById(`item ${currentPage}`);
            if (pill) {
                pill.style.visibility = "visible";
                pill.style.width = "6px";
                pill.style.height = "50px";
                pill.style.marginTop = "12px"
            }
        }
    }, []);

    return (

        <div className="guildImages">

            <Img
                src={user.avatar}
                id="profile"
                className="profile"
                roundedCircle
                onClick={() => window.location.href = "/dashboard"} />

            {servers!.map((data) => (
                `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`.includes("null")
                    ?
                    <div className="profile-div">
                        <div
                            className="pill wrapper"
                            aria-hidden="true">
                            <span
                                className={`item ${data.id}`}
                                id={`item ${data.id}`} />
                        </div>
                        <div
                            id={data.id}
                            className={`guildDiv ${data.id}`}
                            onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id} `}
                            title={data.name}
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
                            />
                        </div>
                        <img
                            id={`${data.id} guildImage`}
                            className={`guildImage ${data.id}`}
                            src={`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`}
                            onClick={() => window.location.href = `http://localhost:3000/dashboard/${data.id}`}
                            key={data.id}
                            title={data.name} >
                        </img>

                    </div>
            ))}


            <Popup
                trigger={
                    <Plus
                        className="add-to-server"
                        title="Add to a new server"
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