import axios from 'axios';
import { GEOAPI, GEOAPIV2 } from './utils/constants';

export async function getIpAddressAndNetworkInfo(
  apiKey: string,
  ipAddress?: string
) {
  try {
    const GEO_IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPIV2}/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
      : `${GEOAPIV2}/country,city?apiKey=${apiKey}`;
    const url = GEO_IPIFY_ENDPOINT;
    if (apiKey) {
      const result = await axios.get(url);
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
      ? `${GEOAPI}?format=json&ipAddress=${ipAddress}`
      : `${GEOAPI}?format=json`;
    const url = IPIFY_ENDPOINT;
    const result = await axios.get(url);
    return result;
  } catch (error) {
    throw error;
  }
}
