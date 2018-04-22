import axios from 'axios';

let host = 'https://yixiuge.xyz/scavenger/';
var instance = axios.create({
    headers: {
        'Content-type': 'application/json'
    }
})

export const getAllBanner = params => {
    return instance.get(host + "getAllBanner/");
}

export const getAllBrands = params => {
    return instance.get(host + "getAllElectronicsBrand/");
};

export const getAllMalfunctionCategory = params => {
    return instance.get(host + "getAllMalfunctionCategory/");
};

export const setElectronicsBrand = params => {
    console.log(params);
    return axios.post(host + "setElectronicsBrand/", {
        params: params
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const getAllMalfunctionDetail = params => {
    return instance.get(host + "getAllMalfunctionDetail/");
};

export const getAllOrder = params => {
    return instance.get(host + "getAllOrder/");
};

export const getPopularMalfunctionDetail = params => {
    return instance.get(host + "getPopularMalfunctionDetail/");
};

export const getElectronicsModelByBrand = params => {
    return instance.post(host + "getElectronicsModelByBrand/",params ,{
          headers: {
              'Content-Type': 'application/json'
            } 
    });
};

export const getMalfunctionDetailByModel = params => {
    return instance.post(host + "getMalfunctionDetailByModel/",params,{
          headers: {
              'Content-Type': 'application/json'
            } 
    });
};