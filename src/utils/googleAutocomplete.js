

const GoogleAutoCompelete = async text =>


    new Promise((resolve, reject) => {
        if (!text) {
            return reject("Need valid text input")
        }
            if (typeof window === "undefined") {
            return reject("Need valid window object")
        }
        
    try {
        new window.google.maps.places.AutocompleteService().getQueryPredictions(
            { input: text, componentRestrictions: { country: "us" }, fields: ["address_components", "geometry"], },
            resolve
            )
        } catch (e) {
            reject(e)
        }
    })
export default GoogleAutoCompelete;