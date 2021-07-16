// get date from ISO timestamp
export const ISOtoDT = (timestamp) => {
    var DT = new Date(timestamp);
    var date = `${DT.getDate()} ${DT.toLocaleString("default", {
        month: "short",
    })} ${DT.getFullYear()}`;
    var time = DT.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    var datetime = `${date} · ${time}`;
    return { date: date, time: time, datetime: datetime };
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
