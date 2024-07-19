# Geo Ipify

> Easily get your public IP address, network details, and internet service provider info.

Using the [`Geo Ipify`](https://geo.ipify.org/)

This is built on [Ipify API](https://www.ipify.org), to get user's IP address & you can also get more information from the IP address by passing an `APIKEY` gotten from [`get ipify`](https://geo.ipify.org/) website.

> To get IP address with all it's network information, retrieve a free API key from here https://geo.ipify.org/

## Install
> npm install `geo-ipify` or yarn install `geo-ipify`

## Usage
> Use the `getIpAddressOnly()` to get only user's IP address. You DO NOT need to add an API key

> Use the `getIpAddressAndNetworkInfo(apiKey: string, ipAddress?: string)` To get more network information from an IP address. You need to add an API key. For this example you can add an optional ipAddress parameter if the IP you want to check is a specific IP address.

## Example

```js
import { getIpAddressOnly, getIpAddressAndNetworkInfo } from 'geo-ipify';

// IP address only
const result = await getIpAddressOnly();
// You can explicitly pass in an optional ipAddress parameter as well if you want to.
// getIpAddressOnly('187.201.32.8');

console.log(result.data);
//=> { "ip": "187.201.32.8" }


// IP address with all network information
const result = await getIpAddressAndNetworkInfo('apikey', '8.8.8.8');
// The IP address parameter is optional
console.log(result.data);
//=> {
//     "ip": "8.8.8.8",
//     "location": {
//         "country": "US",
//         "region": "California",
//         "timezone": "-07:00",
//     },
//     "domains": [
//         "0d2.net",
//         "003725.com",
//         "0f6.b0094c.cn",
//         "007515.com",
//         "0guhi.jocose.cn"
//     ],
//     "as": {
//         "asn": 15169,
//         "name": "Google LLC",
//         "route": "8.8.8.0/24",
//         "domain": "https://about.google/intl/en/",
//         "type": "Content"
//     },
//     "isp": "Google LLC"
// }
```
> See live example usage [here](jetvisionv3.netlify.app)

## API

### getIpAddressOnly()
> Returns a `Promise<object>` with an object containing your ip address only. You can explicitly pass in an optional ipAddress parameter as well if you want to.

### getIpAddressAndNetworkInfo(apiKey, ipAddress?)

> Returns a `Promise<object>` with an object containing your ip address and other network and device information. You need to add an API key. For this example you can add an optional ipAddress parameter if the IP you want to check is a specific IP address.
