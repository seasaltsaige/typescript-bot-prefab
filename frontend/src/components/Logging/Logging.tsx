//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getChannels, updateSettings } from "../../utils/api";
import { ReactComponent as Back } from "../../Images/BackArrow.svg";
import "./Logging.css";

function Logging(props: any) {
    const { settings, user, servers, managed, currentGuild } = props;

    // if (!settings.logChannel.name) {
    //     settings.logChannel.name = "None";
    // }

    const [loading, setLoading] = useState(true);
    const [channels, setChannels] = useState([]);

    const updateDiv = (name: string, id: string) => {

        const otherh6s = document.getElementsByClassName("channel");

        for (let i = 0; i < otherh6s.length; i++) {
            const el = document.getElementById(otherh6s[i].id);
            if (el) {
                if (el.style.backgroundColor === "rgb(89, 95, 100)")
                    el.style.backgroundColor = "";
            }
        }

        const chEl = document.getElementById(id);
        const div = document.getElementById("logchannel-name-to-set");

        if (div) div.innerHTML = "#" + name;
        if (chEl) chEl.style.backgroundColor = "rgb(89, 95, 100)";

    };

    const reset = () => {

        const otherh6s = document.getElementsByClassName("channel");

        for (let i = 0; i < otherh6s.length; i++) {
            const el = document.getElementById(otherh6s[i].id);
            if (el) {
                if (el.style.backgroundColor === "rgb(89, 95, 100)")
                    el.style.backgroundColor = "";
            }
        }

        const chEl = document.getElementById(settings.logChannel.id);
        const div = document.getElementById("logchannel-name-to-set");

        if (div) div.innerHTML = "#none";
        if (chEl) chEl.style.backgroundColor = "rgb(89, 95, 100)";

    }

    const submit = () => {

        const otherh6s = document.getElementsByClassName("channel");

        for (let i = 0; i < otherh6s.length; i++) {
            const el = document.getElementById(otherh6s[i].id);
            if (el) {
                if (el.style.backgroundColor === "rgb(89, 95, 100)") {

                    // const chEl = document.getElementById(settings.logChannel.id);
                    // if (chEl)

                    settings.logChannel = {
                        id: otherh6s[i].id,
                        name: el.innerHTML.split("#").join(""),
                    }

                    const currLogCh = document.getElementById("logchannel-name");
                    if (currLogCh) {
                        currLogCh.innerHTML = "#" + settings.logChannel.name;

                    }

                    updateSettings(settings);
                }

            }
        }

        const div = document.getElementById("logchannel-name-to-set");
        if (div) div.innerHTML = "#none";



    }


    useEffect(() => {
        getChannels(settings.gId).then(({ data }) => {
            setChannels(data);
            setLoading(false);

            if (settings.logChannel.id !== undefined) {
                const chEl = document.getElementById(settings.logChannel.id);
                if (chEl) chEl.style.backgroundColor = "rgb(89, 95, 100)";
            }
        }).catch(err => {
            console.log(err)
            setLoading(false);
        });

    }, []);

    return !loading && (
        <div>
            <div className="main-container">

                <div
                    className="back-button"
                    onClick={() => window.location.href = `/dashboard/${settings.gId}`} >
                    <Back
                        className="back-arrow"
                    />
                    <h4
                        className="back-text">Back</h4>
                </div>

                <div className="channel-selector">
                    <h2
                        className="channel-selector-text" >
                        Channel Selector</h2>
                    <h5
                        className="channel-description-text">
                        The current log channel is displayed on the left.<br />To select a new channel, choose from the channels on the right.</h5>

                    <div
                        className="channel-container">
                        <div
                            className="current-channel"
                            id="current-channel-div">

                            <h3
                                className="current-log"
                            >Current Log Channel</h3>
                            <h5
                                className="logchannel-name"
                                id="logchannel-name"
                            >#{settings.logChannel.name}</h5>
                            <br />
                            <h3
                                className="updated-log"
                            >Log Channel to Set</h3>
                            <h5
                                className="logchannel-name"
                                id="logchannel-name-to-set"
                            >#{settings.logChannel.name}</h5>

                            <div
                                className="buttons-wrapper">
                                <Button
                                    className="reset-button"
                                    variant="dark"
                                    onClick={reset} >Reset</Button>
                                <Button
                                    className="submit-button"
                                    variant="dark"
                                    onClick={submit} >Update</Button>
                            </div>
                        </div>

                        <div className="all-channels">
                            <br />
                            {
                                channels.map((c) => (
                                    <h6
                                        className={`${c.name} channel`}
                                        id={c.id}
                                        onClick={() => updateDiv(c.name, c.id)}
                                    >
                                        #{c.name}
                                    </h6>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logging;