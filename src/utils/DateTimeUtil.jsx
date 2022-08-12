// get date from ISO timestamp
export const ISOtoDT = (timestamp) => {
    var DT = new Date(timestamp);
    var day = DT.getDate();
    var month = DT.toLocaleString("default", { month: "short" });
    var year = DT.getFullYear();
    var date = `${day} ${month} ${year}`;
    var time = DT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    var datetime = `${date} · ${time}`;
    return { day, month, year, date, time, datetime };
};

// get HTML datetime from ISO(with timezone) timestamp
export const ISOtoHTML = (timestamp) => {
    try {
        var DT = new Date(timestamp);
        var tzoffset = new Date().getTimezoneOffset() * 60000;
        return new Date(DT - tzoffset).toISOString().slice(0, -1);
    } catch {
        return "";
    }
};
