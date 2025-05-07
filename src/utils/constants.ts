export const GEOAPI: string = 'https://geo.ipify.org';
export const GEOAPIV2: string = 'https://geo.ipify.org/api/v2';

export const mockGeoIpifyResponse = {
  data: {
    ip: '8.8.8.8',
    location: {
      country: 'US',
      region: 'California',
      timezone: '-07:00',
    },
    domains: [
      '0d2.net',
      '003725.com',
      '0f6.b0094c.cn',
      '007515.com',
      '0guhi.jocose.cn',
    ],
    as: {
      asn: 15169,
      name: 'Google LLC',
      route: '8.8.8.0/24',
      domain: 'https://about.google/intl/en/',
      type: 'Content',
    },
    isp: 'Google LLC',
  },
};

export const mockIpifyResponse = {
  data: { ip: '1.1.1.1' },
};
