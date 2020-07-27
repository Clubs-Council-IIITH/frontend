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

export function isSameDay(dto1, dto2) {
    const dt1 = new Date(dto1);
    const dt2 = new Date(dto2);
    return (
        dt1.getDay() === dt2.getDay() &&
        dt1.getMonth() === dt2.getMonth() &&
        dt1.getFullYear() === dt2.getFullYear()
    );
}
