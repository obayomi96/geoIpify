# Geo Ipify

> Get your public IP address, network details, and internet service provider info.

Using the [`Geo Ipify`](https://geo.ipify.org/) 

This is unofficial but on [Ipify API](https://www.ipify.org), to get more information from an ip address by passing an `APIKEY` gotten from Geo Ipify website.

> Retrieve your api key from [`Geo Ipify`](https://geo.ipify.org/) 


## Install
```js
import geoIpify from 'geo-ipify';

console.log(await geoIpify("apikey"));
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

### geoIpify(options?)

> Returns a `Promise<string>` with an object containing your ip address and other network and device information.
