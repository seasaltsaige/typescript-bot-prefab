//@ts-nocheck
import React, { useEffect, useState } from "react";
import { DashboardSidebar } from "../../components";
import {
    getGuilds,
    userDetails,
    getManagedGuilds,
} from "../../utils/api";

function Menu(props: any) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [servers, setServers] = useState([]);
    const [allServers, setAllServers] = useState([]);
    const [nonMutual, setNonMutual] = useState([]);

    useEffect(() => {
        userDetails().then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
            setAllServers(data.allBotGuilds);
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
            setNonMutual(unique);
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
                managed={nonMutual} />

        </div>
    );

}

export default Menu;