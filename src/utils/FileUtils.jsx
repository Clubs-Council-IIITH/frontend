export function assertFiletype(file, accepted) {
    return file.length === 1
        ? accepted.includes(file[0].name.substr(file[0].name.lastIndexOf(".") + 1))
        : false;
}
