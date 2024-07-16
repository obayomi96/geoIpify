import axios from 'axios';

export async function getIpAddressAndNetworkInfo(apiKey: string) {
  try {
    const GEO_IPIFY_ENDPOINT = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`;
    if (apiKey) {
      const result = await axios.get(GEO_IPIFY_ENDPOINT);
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

export async function getIpAddressOnly() {
  try {
    const IPIFY_ENDPOINT = `https://api.ipify.org?format=json`;
    const result = await axios.get(IPIFY_ENDPOINT);
    if ('development' === process.env.NODE_ENV) {
      console.log('===>', result);
    }
    return result;
  } catch (error) {
    throw error;
  }
}
