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
    it('should resolve with network info when API key and IP are provided', (done) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      getIpAddressAndNetworkInfo('fake-api-key', '8.8.8.8')
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('ipAddress=8.8.8.8'),
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );
          expect(result).toEqual(mockGeoIpifyResponse);
          done();
        })
        .catch(done);
    });

    it('should resolve with message when no API key is provided', (done) => {
      getIpAddressAndNetworkInfo('', '8.8.8.8')
        .then(result => {
          expect(result).toBe('Add an apiKey');
          expect(fetch).not.toHaveBeenCalled();
          done();
        })
        .catch(done);
    });

    it('should reject when fetch fails', (done) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      getIpAddressAndNetworkInfo('valid-key')
        .catch(error => {
          expect(error.message).toContain('HTTP error! Status: 404');
          done();
        });
    });
  });

  describe('getIpAddressOnly', () => {
    it('should resolve with IP info when no IP is provided', (done) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      getIpAddressOnly()
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            `${GEOAPI}?format=json&reverseIp=1`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );
          expect(result).toEqual(mockIpifyResponse);
          done();
        })
        .catch(done);
    });

    it('should reject when fetch fails', (done) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      getIpAddressOnly('1.1.1.1')
        .catch(error => {
          expect(error.message).toContain('HTTP error! Status: 500');
          done();
        });
    });
  });
});
