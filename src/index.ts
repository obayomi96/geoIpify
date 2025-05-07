import { GEOAPI, GEOAPIV2 } from './utils/constants';

export function getIpAddressAndNetworkInfo(apiKey: string, ipAddress?: string) {
  return new Promise((resolve, reject) => {
    if (!apiKey.length) {
      resolve('Add an apiKey');
      return;
    }

    const GEO_IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPIV2}/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPIV2}/country,city?apiKey=${apiKey}&reverseIp=1`;

    // First try with CORS enabled
    fetch(GEO_IPIFY_ENDPOINT, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => resolve(data))
      .catch(corsError => {
        // Fallback to no-cors mode if CORS fails
        fetch(GEO_IPIFY_ENDPOINT, {
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            // In no-cors mode, we can't read the response directly
            // So we return the entire response object
            resolve({
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              type: response.type,
            });
          })
          .catch(error => reject(error));
      });
  });
}

export function getIpAddressOnly(ipAddress?: string) {
  return new Promise((resolve, reject) => {
    const IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPI}?format=json&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPI}?format=json&reverseIp=1`;

    // First try with CORS enabled
    fetch(IPIFY_ENDPOINT, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => resolve(data))
      .catch(corsError => {
        // Fallback to no-cors mode if CORS fails
        fetch(IPIFY_ENDPOINT, {
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            // In no-cors mode, we can't read the response directly
            // So we return the entire response object
            resolve({
              status: response.status,
              statusText: response.statusText,
              url: response.url,
              type: response.type,
            });
          })
          .catch(error => reject(error));
      });
  });
}
