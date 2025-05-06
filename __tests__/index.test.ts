import { getIpAddressAndNetworkInfo, getIpAddressOnly } from '../src/index';
import {
  GEOAPI,
  mockGeoIpifyResponse,
  mockIpifyResponse,
} from '../src/utils/constants';

// Set up fetch mocking
global.fetch = jest.fn() as jest.Mock;

describe('Geopify Service API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('Get IpAddress And Network Info', () => {
    it('should fetch IP network info with API key and IP address', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      const result = await getIpAddressAndNetworkInfo('fake-api-key', '8.8.8.8');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('ipAddress=8.8.8.8')
      );
      expect(result).toEqual(mockGeoIpifyResponse);
    });

    it('should fetch IP network info with API key only (no ip address)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      const result = await getIpAddressAndNetworkInfo('fake-api-key', '');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('apiKey=fake-api-key')
      );
      expect(result).toEqual(mockGeoIpifyResponse);
    });

    it('should return a message when no API key is provided', async () => {
      const result = await getIpAddressAndNetworkInfo('', '8.8.8.8');
      expect(result).toBe('Add an apiKey');
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('Get IpAddress Only', () => {
    it('should fetch the current IP address with no parameters', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      const result = await getIpAddressOnly();

      expect(fetch).toHaveBeenCalledWith(
        `${GEOAPI}?format=json&reverseIp=1`
      );
      expect(result).toEqual(mockIpifyResponse);
    });

    it('should fetch the IP address with optional IP input', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      const result = await getIpAddressOnly('1.1.1.1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('ipAddress=1.1.1.1')
      );
      expect(result).toEqual(mockIpifyResponse);
    });

    it('should throw an error if fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getIpAddressOnly()).rejects.toThrow('HTTP error! Status: 404');
    });
  });
});
