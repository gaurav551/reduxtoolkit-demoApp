const getCheckedValues = (obj) =>
{
    var keys = Object.keys(obj);

    var filtered = keys.filter(function(key) {
        return obj[key]
    });
    return filtered;
}
export default getCheckedValues