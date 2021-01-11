export default function getAbbreviation(guildName: string) {
    const guildNameArr = guildName.split(" ");
    const abbreviation = guildNameArr.map(s => s[0]).join("").slice(0, 2);
    return abbreviation;
}