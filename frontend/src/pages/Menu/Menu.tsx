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
    const [nonMutual, setNonMutual] = useState([]);

    useEffect(() => {
        userDetails().then(({ data }) => {
            setUser(data);
            return getGuilds();
        }).then(({ data }) => {
            setServers(data.sameGuilds);
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
                currentPage={null} />

        </div>
    );

}

export default Menu;