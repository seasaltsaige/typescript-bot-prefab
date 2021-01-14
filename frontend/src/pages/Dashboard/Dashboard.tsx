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

const menuCategories = [
    "general",
    "moderation",
    "logging",
    "roles",
    "levels",
    "commands",
];

const menuDesctions = [
    "General information about the bot",
    "Configure anything from auto-moderation to your muted role",
    "Change information about logging",
    "Configure auto roles and more",
    "Change settings on leveling progression",
    "Enable and disable certain bot commands",
];

function Dashboard(props: any) {

    const dashId = props.match.params.id;
    // console.log(dashId);
    // console.log(props.match);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [servers, setServers] = useState([]);
    const [nonMutual, setNonMutual] = useState([]);
    const [currentGuild, setCurrentGuild] = useState("");

    useEffect(() => {
        userDetails().then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
            const currGuild = data.sameGuilds.find(g => g.id === dashId);
            // console.log(currGuild);
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
                {menuCategories.map((c, i) => (
                    <div className={`${c} category`}>
                        <h3 className="category-text">View the {c} category</h3>
                        <h5 className="description-text">{menuDesctions[i]}</h5>
                        <Button
                            variant="dark"
                            className="category-button"
                            onClick={() => window.location.href = `/dashboard/${dashId}/${c}`}>View Category</Button>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default Dashboard;