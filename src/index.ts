import axios from 'axios';

export default async function geoIpify(apiKey: string) {
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
