//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { DashboardSidebar } from "../../components";
import { getServerSettings, updatePrefix as updateGuildPrefix } from "../../utils/api";

import {
    getGuilds,
    userDetails,
    getManagedGuilds,
} from "../../utils/api";

import "./Dashboard.css";

function updatePrefix(dashId: string, newPrefix: string) {
    if (newPrefix !== "") {
        document.querySelector(".prefix-text").innerHTML = `Current Prefix: ${newPrefix}`;
        updateGuildPrefix(dashId, newPrefix);
    }
}

function Dashboard(props: any) {

    const dashId = props.match.params.id;

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [formPrefix, setFormPrefix] = useState("");
    const [user, setUser] = useState(null);
    const [servers, setServers] = useState([]);
    const [nonMutual, setNonMutual] = useState([]);
    const [currentGuild, setCurrentGuild] = useState("");

    useEffect(() => {
        getServerSettings(dashId).then(({ data }) => {
            setSettings(data);
            setPrefix(data.prefix);
            setFormPrefix(data.prefix);
            return userDetails()
        }).then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
            const currGuild = data.sameGuilds.find(g => g.id === dashId);
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
                currentPage={dashId} />

            <br />
            <div className="guild-name">
                <h1 className="guild-text">{currentGuild} Configuration</h1>
            </div>

            <div className="backplate">



            </div>
        </div>
    )

}

export default Dashboard;