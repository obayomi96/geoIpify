import { GEOAPI, GEOAPIV2 } from './utils/constants';

export async function getIpAddressAndNetworkInfo(
  apiKey: string,
  ipAddress?: string
) {
  try {
    const GEO_IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPIV2}/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPIV2}/country,city?apiKey=${apiKey}&reverseIp=1`;

    if (!apiKey.length) {
      return 'Add an apiKey';
    }

    const response = await fetch(GEO_IPIFY_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getIpAddressOnly(ipAddress?: string) {
  try {
    const IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPI}?format=json&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPI}?format=json&reverseIp=1`;

    const response = await fetch(IPIFY_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
