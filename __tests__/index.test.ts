import { getIpAddressAndNetworkInfo, getIpAddressOnly } from '../src/index';
import {
  GEOAPI,
  GEOAPIV2,
  mockGeoIpifyResponse,
  mockIpifyResponse,
} from '../src/utils/constants';

// Mock global.fetch
global.fetch = jest.fn() as jest.Mock;

describe('Geopify Service API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  describe('getIpAddressAndNetworkInfo', () => {
    it('should immediately resolve with message when no API key is provided', done => {
      getIpAddressAndNetworkInfo('', '8.8.8.8')
        .then(result => {
          expect(result).toBe('Add an apiKey');
          expect(fetch).not.toHaveBeenCalled();
          done();
        })
        .catch(done);
    });

    it('should make API call with correct endpoint when API key is provided', done => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      getIpAddressAndNetworkInfo('fake-api-key', '8.8.8.8')
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            `${GEOAPIV2}/country,city?apiKey=fake-api-key&ipAddress=8.8.8.8&reverseIp=1`,
            expect.objectContaining({
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
          );
          expect(result).toEqual(mockGeoIpifyResponse);
          done();
        })
        .catch(done);
    });

    it('should make API call without IP address when none provided', done => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoIpifyResponse),
      });

      getIpAddressAndNetworkInfo('fake-api-key')
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            `${GEOAPIV2}/country,city?apiKey=fake-api-key&reverseIp=1`,
            expect.any(Object)
          );
          done();
        })
        .catch(done);
    });

    it('should fallback to no-cors mode when CORS request fails', done => {
      // First mock a CORS failure
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('CORS blocked'));

      // Then mock a no-cors response
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        url: 'https://geo.ipify.org/',
        type: 'opaque',
      });

      getIpAddressAndNetworkInfo('fake-api-key')
        .then(result => {
          expect(fetch).toHaveBeenCalledTimes(2);
          expect(result).toEqual({
            status: 200,
            statusText: 'OK',
            url: 'https://geo.ipify.org/',
            type: 'opaque',
          });
          done();
        })
        .catch(done);
    });

    it('should reject with error when both CORS and no-cors requests fail', done => {
      (fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('CORS blocked'))
        .mockRejectedValueOnce(new Error('Network error'));

      getIpAddressAndNetworkInfo('fake-api-key')
        .then(() => done.fail('Should have rejected'))
        .catch(error => {
          expect(error.message).toBe('Network error');
          done();
        });
    });

    // it('should handle non-OK responses with status text', (done) => {
    //   (fetch as jest.Mock).mockResolvedValueOnce({
    //     ok: false,
    //     status: 404,
    //     statusText: 'Not Found',
    //     json: () => Promise.resolve({ error: 'Not found' })
    //   });

    //   getIpAddressAndNetworkInfo('fake-api-key')
    //     .then(() => done.fail('Should have rejected'))
    //     .catch(error => {
    //       expect(error.message).toBe('HTTP error! Status: 404');
    //       done();
    //     });
    // });
  });

  describe('getIpAddressOnly', () => {
    it('should make API call with correct default endpoint', done => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      getIpAddressOnly()
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            `${GEOAPI}?format=json&reverseIp=1`,
            expect.objectContaining({
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
          );
          expect(result).toEqual(mockIpifyResponse);
          done();
        })
        .catch(done);
    });

    it('should include IP address in endpoint when provided', done => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockIpifyResponse),
      });

      getIpAddressOnly('1.1.1.1')
        .then(result => {
          expect(fetch).toHaveBeenCalledWith(
            `${GEOAPI}?format=json&ipAddress=1.1.1.1&reverseIp=1`,
            expect.any(Object)
          );
          done();
        })
        .catch(done);
    });

    // it('should handle JSON parsing errors', (done) => {
    //   (fetch as jest.Mock).mockResolvedValueOnce({
    //     ok: true,
    //     json: () => Promise.reject(new Error('Invalid JSON')),
    //   });

    //   getIpAddressOnly()
    //     .then(() => done.fail('Should have rejected'))
    //     .catch(error => {
    //       expect(error.message).toContain('Invalid JSON');
    //       done();
    //     });
    // });

    it('should fallback to no-cors mode and return response object when CORS fails', done => {
      (fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('CORS blocked'))
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          url: GEOAPI,
          type: 'opaque',
        });

      getIpAddressOnly()
        .then(result => {
          expect(result).toEqual({
            status: 200,
            statusText: 'OK',
            url: GEOAPI,
            type: 'opaque',
          });
          done();
        })
        .catch(done);
    });
  });
});
