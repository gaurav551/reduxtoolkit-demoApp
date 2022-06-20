import { googlePlacesApiKey } from "../configs";
const getAddress = async (address) => {
  let returnData = { pin: "", country: "", city: "", state: "" };
  //get lat and long from current addrresss
  let resData = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googlePlacesApiKey}`
  )
    .then((response) => response.json())
    .then(async (data) => {
      const latitude = data?.results[0]?.geometry?.location?.lat;
      const longitude = data?.results[0]?.geometry?.location?.lng;
        //get address information from lat and long because we dont get necessary information from places api without lat and long

      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${googlePlacesApiKey}&latlng=${latitude}, ${longitude}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          let res = data.results;
          let pin =
            res[0].address_components[res[0].address_components.length - 1]
              .long_name;
          let country =
            res[0].address_components[res[0].address_components.length - 2]
              .long_name;
          let state =
            res[0].address_components[res[0].address_components.length - 3]
              .long_name;
          let city =
            res[0].address_components[res[0].address_components.length - 4]
              .long_name;
          returnData.pin = pin;
          returnData.country = country;
          returnData.city = city;
          returnData.state = state;
        });
      return returnData;
    });
  return resData;
};
export default getAddress;
