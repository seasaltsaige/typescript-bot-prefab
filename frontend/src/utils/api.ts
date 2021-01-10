import axios from "axios";
const baseURL = "http://localhost:4000/api";

export function userDetails() {
    return axios.get(`${baseURL}/users/user/@me`, {
        withCredentials: true,
    });
}

export function getGuilds() {
    return axios.get(`${baseURL}/bot/guilds`, {
        withCredentials: true,
    });
}

export function getServerSettings(id: string) {
    return axios.get(`${baseURL}/servers/${id}`, {
        withCredentials: true,
    });
}

export function getManagedGuilds() {
    return axios.get(`${baseURL}/servers/all/managed`, {
        withCredentials: true,
    });
}

export function allBotGuilds() {
    return axios.get(`${baseURL}/bot/guilds/all`, {
        withCredentials: true,
    });
}