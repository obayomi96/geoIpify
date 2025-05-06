const axios = require('axios');
import { getIpAddressAndNetworkInfo, getIpAddressOnly } from '../src/index';
import {
  GEOAPI,
  mockGeoIpifyResponse,
  mockIpifyResponse,
} from '../src/utils/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Geopify Service API', () => {
  describe('Get IpAddress And Network Info', () => {
    it('should fetch IP network info with API key and IP address', async () => {
      mockedAxios.get.mockResolvedValue(mockGeoIpifyResponse);

      const result = await getIpAddressAndNetworkInfo(
        'fake-api-key',
        '8.8.8.8'
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('ipAddress=8.8.8.8')
      );
      expect(result).toEqual(mockGeoIpifyResponse);
    });

    it('should fetch IP network info with API key only (no ip address)', async () => {
      mockedAxios.get.mockResolvedValue(mockGeoIpifyResponse);

      const result = await getIpAddressAndNetworkInfo('fake-api-key', '');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('apiKey=fake-api-key')
      );
      expect(result).toEqual(mockGeoIpifyResponse);
    });

    it('should return a message when no API key is provided', async () => {
      const result = await getIpAddressAndNetworkInfo('', '8.8.8.8');
      expect(result).toBe('Add an apiKey');
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(''));
    });
  });

  describe('Get IpAddress Only', () => {
    it('should fetch the current IP address with no parameters', async () => {
      mockedAxios.get.mockResolvedValue(mockIpifyResponse);

      const result = await getIpAddressOnly();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${GEOAPI}?format=json&reverseIp=1`
      );
      expect(result).toEqual(mockIpifyResponse);
    });

    it('should fetch the IP address with optional IP input', async () => {
      mockedAxios.get.mockResolvedValue(mockIpifyResponse);

      const result = await getIpAddressOnly('1.1.1.1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('ipAddress=1.1.1.1')
      );
      expect(result).toEqual(mockIpifyResponse);
    });
  });
});
