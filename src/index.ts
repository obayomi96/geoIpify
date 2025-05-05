import axios from 'axios';

export async function getIpAddressAndNetworkInfo(
  apiKey: string,
  ipAddress?: string
) {
  try {
    const GEO_IPIFY_ENDPOINT = ipAddress
      ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}&reverseIp=1`
      : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&reverseIp=1`;
    const url = GEO_IPIFY_ENDPOINT;
    if (apiKey) {
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
      ? `https://api.ipify.org?format=json&ipAddress=${ipAddress}&reverseIp=1`
      : `https://api.ipify.org?format=json&reverseIp=1`;
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
