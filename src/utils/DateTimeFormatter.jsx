export function formatDateTime(rawDT) {
    var DT = new Date(rawDT);
    var date =
        DT.getDate() +
        " " +
        DT.toLocaleString("default", { month: "long" }) +
        " " +
        DT.getFullYear();
    var time = DT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    var datetime = date + " · " + time;
    return { date: date, time: time, datetime: datetime };
}

export function parseDateTime(rawDT) {
    var date, time;
    try {
        date = rawDT.split("T")[0];
        time = new Date(rawDT).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        });
    } catch {
        date = "";
        time = "";
    }
    return { date: date, time: time };
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
