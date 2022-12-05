// convert JSON to FormData Instance
export const JSONtoFormData = (object) => {
    return Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());
};

// convert audience string from API response to a dict
export const CheckboxesStringtoDict = (audienceString) => {
    var audienceMap = {};
    audienceString?.split(",")?.forEach((value) => (audienceMap[value] = true));

    audienceMap[audienceString.substring(audienceString.lastIndexOf(',') + 1)] = false;
    return audienceMap;
};
