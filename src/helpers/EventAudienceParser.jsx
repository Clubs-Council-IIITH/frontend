const AudienceList = {
    ug1: "UG 1",
    ug2: "UG 2",
    ug3: "UG 3",
    ugx: "UG 4+",
    pg: "PG",
    staff: "Staff",
    faculty: "Faculty",
};

export function parseAudience(audience) {
    console.log("parsing");
    return AudienceList[audience];
}
