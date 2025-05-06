import { GEOAPI, GEOAPIV2 } from './utils/constants';

export function getIpAddressAndNetworkInfo(apiKey: string, ipAddress?: string) {
  const GEO_IPIFY_ENDPOINT = ipAddress
    ? `${GEOAPIV2}/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}&reverseIp=1`
    : `${GEOAPIV2}/country,city?apiKey=${apiKey}&reverseIp=1`;

  if (!apiKey.length) {
    return Promise.resolve('Add an apiKey');
  }

  return fetch(GEO_IPIFY_ENDPOINT, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw error;
    });
}

export function getIpAddressOnly(ipAddress?: string) {
  const IPIFY_ENDPOINT = ipAddress
    ? `${GEOAPI}?format=json&ipAddress=${ipAddress}&reverseIp=1`
    : `${GEOAPI}?format=json&reverseIp=1`;

  return fetch(IPIFY_ENDPOINT, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw error;
    });
}
