//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DashboardSidebar, Logging, Roles } from "../../components";
import { getGuilds, getManagedGuilds, getServerSettings, userDetails } from "../../utils/api";
import "./Configuration.css";

function Configuration(props: any) {
    const { id, category } = props.match.params;

    // console.log(id);

    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({});
    const [user, setUser] = useState(null);
    const [servers, setServers] = useState([]);
    const [nonMutual, setNonMutual] = useState([]);
    const [currentGuild, setCurrentGuild] = useState("");
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getServerSettings(id).then(({ data }) => {
            setSettings(data);
            return userDetails();
        }).then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
            const currGuild = data.sameGuilds.find((g: any) => g.id === id);
            setCurrentGuild(currGuild.name);
            return getManagedGuilds();
        }).then(({ data }) => {
            setNonMutual(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            window.location.href = "http://localhost:3000";
            setLoading(false);
        });
    }, []);

    return !loading && (
        <div>

            <DashboardSidebar
                user={user}
                servers={servers}
                managed={nonMutual}
                currentPage={id} />

            <br />
            <div className="guild-name">
                <h1 className="guild-text">{currentGuild} {category} Configuration</h1>
            </div>

            {/* <div className="backplate"> */}
            {
                category === "roles"
                    ? <Roles
                        settings={settings}
                        user={user}
                        servers={servers}
                        managed={nonMutual}
                        currentGuild={currentGuild} />
                    :
                    category === "logging"
                        ? <Logging
                            settings={settings}
                            user={user}
                            servers={servers}
                            managed={nonMutual}
                            currentGuild={currentGuild}
                            allChannels={channels} />
                        : ""
            }
            {/* </div> */}
        </div>
    )

}

export default Configuration;