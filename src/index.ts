import { GEOAPI, GEOAPIV2 } from './utils/constants';
const axios = require('axios');

export async function getIpAddressAndNetworkInfo(
  apiKey: string,
  ipAddress?: string
) {
  try {
    const GEO_IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPIV2}/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPIV2}/country,city?apiKey=${apiKey}&reverseIp=1`;
    const url = GEO_IPIFY_ENDPOINT;
    if (apiKey.length) {
      const result = await axios.get(url);
      if ('development' === process.env.NODE_ENV) {
        console.log('===>', result);
      }
      return result;
    } else {
      return 'Add an apiKey';
    }
  } catch (error) {
    throw error;
  }
}

export async function getIpAddressOnly(ipAddress?: string) {
  try {
    const IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPI}?format=json&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPI}?format=json&reverseIp=1`;
    const url = IPIFY_ENDPOINT;
    const result = await axios.get(url);
    if ('development' === process.env.NODE_ENV) {
      console.log('===>', result);
    }
    return result;
  } catch (error) {
    throw error;
  }
}
