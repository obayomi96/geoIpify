import { getIpAddressAndNetworkInfo, getIpAddressOnly } from '../src/index';
import {
  GEOAPI,
  mockGeoIpifyResponse,
  mockIpifyResponse,
} from '../src/utils/constants';

// Mock global.fetch
global.fetch = jest.fn() as jest.Mock;

describe('Geopify Service API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('getIpAddressAndNetworkInfo', () => {
    it('should resolve with network info when API key and IP are provided', () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      return getIpAddressAndNetworkInfo('fake-api-key', '8.8.8.8').then(
        result => {
          expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('ipAddress=8.8.8.8'),
            {
              mode: 'no-cors',
            }
          );
          expect(result).toEqual(mockGeoIpifyResponse);
        }
      );
    });

    it('should resolve with message when no API key is provided', () => {
      return getIpAddressAndNetworkInfo('', '8.8.8.8').then(result => {
        expect(result).toBe('Add an apiKey');
        expect(fetch).not.toHaveBeenCalled();
      });
    });

    it('should reject when fetch fails', () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      return getIpAddressAndNetworkInfo('valid-key').catch(error => {
        expect(error.message).toContain('HTTP error! Status: 404');
      });
    });
  });

  describe('getIpAddressOnly', () => {
    it('should resolve with IP info when no IP is provided', () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      return getIpAddressOnly().then(result => {
        expect(fetch).toHaveBeenCalledWith(
          `${GEOAPI}?format=json&reverseIp=1`,
          {
            mode: 'no-cors',
          }
        );
        expect(result).toEqual(mockIpifyResponse);
      });
    });

    it('should reject when fetch fails', () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      return getIpAddressOnly('1.1.1.1').catch(error => {
        expect(error.message).toContain('HTTP error! Status: 500');
      });
    });
  });
});
