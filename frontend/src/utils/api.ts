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

export function updatePrefix(id: string, prefix: string) {
    return axios.post(`${baseURL}/servers/${id}/prefix`, {
        prefix,
    });
}

export function getChannels(id: string) {
    return axios.get(`${baseURL}/servers/${id}/channels`, {
        withCredentials: true,
    });
}

export function updateSettings(settings: any) {
    return axios.post(`${baseURL}/servers/${settings.gId}/update`, {
        settings,
    });
}

// export function test(id: string) {
//     return axios.post(`${baseURL}/servers/${id}/message`)
// }