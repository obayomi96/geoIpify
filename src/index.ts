export const geoIpify = async (apiKey: string) => {
  try {
    const GEO_IPIFY_ENDPOINT = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`;
    if (apiKey) {
      const result = await fetch(GEO_IPIFY_ENDPOINT);
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
};
