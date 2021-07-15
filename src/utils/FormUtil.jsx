// convert JSON to FormData Instance
export const JSONtoFormData = (object) => {
    return Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());
};
