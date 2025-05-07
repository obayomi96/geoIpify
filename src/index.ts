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

    fetch(GEO_IPIFY_ENDPOINT, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

export function getIpAddressOnly(ipAddress?: string) {
  return new Promise((resolve, reject) => {
    const IPIFY_ENDPOINT = ipAddress
      ? `${GEOAPI}?format=json&ipAddress=${ipAddress}&reverseIp=1`
      : `${GEOAPI}?format=json&reverseIp=1`;

    fetch(IPIFY_ENDPOINT, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}
