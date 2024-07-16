# Geo Ipify

> Easily get your public IP address, network details, and internet service provider info.

Using the [`Geo Ipify`](https://geo.ipify.org/)

This is built on [Ipify API](https://www.ipify.org), to get user's IP address & you can also get more information from the IP address by passing an `APIKEY` gotten from [`get ipify`](https://geo.ipify.org/) website.

> To get IP address & more network information, retrieve an api key from here https://geo.ipify.org/

## Install
> npm install `geo-ipify` or yarn install `geo-ipify`

## Usage
> Use the `getIpAddressOnly()` to get only user's IP address. You DO NOT need to add an API key

> Use the `getIpAddressAndNetworkInfo(apiKey)` To get more network information from an IP address. You need to add an API key.

## Example

```js
import { getIpAddressOnly, getIpAddressAndNetworkInfo } from 'geo-ipify';

// IP address only
const result = await getIpAddressOnly();
console.log(result.data);
//=> { "ip": "187.201.32.8" }


// IP address and all network information
const result = await getIpAddressAndNetworkInfo('apikey');
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

## API

### getIpAddressOnly()
> Returns a `Promise<object>` with an object containing your ip address only.

### getIpAddressAndNetworkInfo(apiKey)

> Returns a `Promise<object>` with an object containing your ip address and other network and device information.
