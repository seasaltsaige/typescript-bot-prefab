//@ts-nocheck
import React, { useEffect, useState } from "react";
import { DashboardSidebar } from "../../components";
import {
    getGuilds,
    getServerSettings,
    userDetails,
    getManagedGuilds,
    allBotGuilds
} from "../../utils/api";

function Dashboard(props: any) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [servers, setServers] = useState([]);
    const [allServers, setAllServers] = useState([]);
    const [settings, setSettings] = useState(null);
    const [nonMutual, setNonMutual] = useState([]);

    useEffect(() => {
        userDetails().then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
            setAllServers(data.allBotGuilds);
            if (props.location.pathname.split("/")[2] !== undefined)
                return getServerSettings(props.location.pathname.split("/")[2]);
            else setLoading(false);
        }).then((response) => {
            const data = response?.data;
            if (data !== undefined) setSettings(data);
            return getManagedGuilds();
        }).then(({ data }) => {
            const managedGuilds = data;
            const unique = [];
            const userArrIds = managedGuilds.map(o => o.id);
            const botArrIds = allServers.map(o => o.id);
            const uniqueIds = userArrIds.filter((o) => botArrIds.indexOf(o) === -1);
            for (let i = 0; i < managedGuilds.length; i++) {
                const userArrObject = managedGuilds[i];
                if (uniqueIds.includes(userArrObject.id)) unique.push(userArrObject);
            }
            console.log(unique);
            setNonMutual(unique);
        }).catch((err) => {
            console.log(err);
            window.location.href = "http://localhost:3000";
            setLoading(false);
        });
    }, []);

    return !loading && (
        <div>
            {/* {
                settings
                    ? (
                        <div className="settings">
                            <h1>Testing</h1>
                        </div>
                    )
                    : (
                        <div className="settings">
                            <h1>Testing</h1>
                        </div>
                    )
            } */}
            <DashboardSidebar
                user={user}
                servers={servers}
                managed={nonMutual} />
        </div>
    );

}

export default Dashboard;