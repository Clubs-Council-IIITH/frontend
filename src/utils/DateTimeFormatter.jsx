export function formatDateTime(rawDT) {
    var DT = new Date(rawDT);
    var cleanDT = {};
    cleanDT["date"] =
        DT.getDate() +
        " " +
        DT.toLocaleString("default", { month: "long" }) +
        " " +
        DT.getFullYear();
    cleanDT["time"] = DT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    cleanDT["datetime"] = cleanDT["date"] + " · " + cleanDT["time"];
    return cleanDT;
}
