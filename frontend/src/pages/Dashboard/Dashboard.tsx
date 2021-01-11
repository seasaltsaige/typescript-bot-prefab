//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { getServerSettings, updatePrefix as updateGuildPrefix } from "../../utils/api";
import "./Dashboard.css";

function updatePrefix(dashId: string, newPrefix: string) {
    if (newPrefix !== "") {
        const el = document.getElementsByClassName("prefix-text")[0];
        el.innerHTML = `Current Prefix: ${newPrefix}`;
        updateGuildPrefix(dashId, newPrefix);
    }
}

function Dashboard(props: any) {

    const dashId = props.match.params.id;

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prefix, setPrefix] = useState("");
    const [formPrefix, setFormPrefix] = useState("");

    useEffect(() => {
        getServerSettings(dashId).then(({ data }) => {
            setSettings(data);
            setPrefix(data.prefix);
            setFormPrefix(data.prefix);
            setLoading(false);
        });
    }, []);

    return !loading && (
        <div>
            <Button
                className="back-button"
                href="http://localhost:3000/menu"
                variant="dark"
            >Back to Menu</Button>
            <div className="prefix">

                <h3 className="prefix-text">Current Prefix: {formPrefix}</h3>

                <InputGroup className="update-prefix">

                    <Button
                        variant="dark"
                        className="prefix-submit"
                        onClick={() => updatePrefix(dashId, prefix)}
                    >Submit</Button>
                    <FormControl
                        className="enter-prefix"
                        onChange={(e) => setPrefix(e.target.value)} />
                </InputGroup>

            </div>
            <div className="logs">
                aaa
            </div>
        </div>
    )

}

export default Dashboard;