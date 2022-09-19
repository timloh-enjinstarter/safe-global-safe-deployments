import GnosisSafeL2130 from '../assets/v1.3.0/gnosis_safe_l2.json';
import GnosisSafe130 from '../assets/v1.3.0/gnosis_safe.json';
import { findDeployment } from '../utils';
import { _safeDeployments, _safeL2Deployments } from '../safes';
import { SingletonDeployment } from '../types';

const _safeDeploymentsReverse = [..._safeDeployments].reverse();

describe('utils.ts', () => {
  describe('findDeployment', () => {
    it('should filter by released by default', () => {
      const testUnreleasedDeployment: SingletonDeployment = {
        defaultAddress: '',
        version: '',
        abi: [],
        networkAddresses: {},
        contractName: '',
        released: false,
      };
      const testReleasedDeployment: SingletonDeployment = {
        defaultAddress: '',
        version: '',
        abi: [],
        networkAddresses: {},
        contractName: '',
        released: true, // Default filter value
      };

      const testDeployments = [
        testUnreleasedDeployment,
        testUnreleasedDeployment,
        testReleasedDeployment,
      ];

      expect(findDeployment(undefined, testDeployments)).toBe(
        testReleasedDeployment
      );
    });
    it('should return the correct deployment (filtered by version)', () => {
      // Chronological deployments
      expect(findDeployment({ version: '1.3.0' }, _safeDeployments)).toBe(
        GnosisSafe130
      );
      // Incorrect filter:
      expect(
        findDeployment({ version: '2.0.0' }, _safeDeployments)
      ).toBeUndefined();

      // L2 deployments
      expect(findDeployment({ version: '1.3.0+L2' }, _safeL2Deployments)).toBe(
        GnosisSafeL2130
      );
      // Incorrect filter:
      expect(
        findDeployment({ version: '2.0.0+L2' }, _safeL2Deployments)
      ).toBeUndefined();
    });
    it('should return the correct deployment (filtered by release)', () => {
      // Chronological deployments
      expect(findDeployment({ released: true }, _safeDeployments)).toBe(
        GnosisSafe130
      );
      // Incorrect filter:
      expect(
        findDeployment({ released: false }, _safeDeployments)
      ).toBeUndefined();

      // Reverse chronological deployments
      // Incorrect filter:
      expect(
        findDeployment({ released: false }, _safeDeploymentsReverse)
      ).toBeUndefined();

      // L2 deployments
      expect(findDeployment({ released: true }, _safeL2Deployments)).toBe(
        GnosisSafeL2130
      );
      // Incorrect filter:
      expect(
        findDeployment({ released: false }, _safeL2Deployments)
      ).toBeUndefined();
    });

    it('should return the correct deployment (filtered by network)', () => {
      // Reverse chronological deployments
      expect(
        findDeployment({ network: '97' }, _safeDeploymentsReverse)
      ).toBe(GnosisSafe130);
      // Incorrect filter:
      expect(
        findDeployment({ network: '0' }, _safeDeploymentsReverse)
      ).toBeUndefined();

      // L2 deployments
      expect(findDeployment({ network: '97' }, _safeL2Deployments)).toBe(
        GnosisSafeL2130
      );
      // Incorrect filter:
      expect(
        findDeployment({ network: '0' }, _safeL2Deployments)
      ).toBeUndefined();
    });
    it('should return the correct deployment (filtered by version and released)', () => {
      // Chronological deployments
      expect(
        findDeployment({ version: '1.3.0', released: true }, _safeDeployments)
      ).toBe(GnosisSafe130);
      // Incorrect filter:
      expect(
        findDeployment({ version: '1.0.0', released: false }, _safeDeployments)
      ).toBeUndefined();

      // L2 deployments
      expect(
        findDeployment({ version: '1.3.0', released: true }, _safeL2Deployments)
      ).toBe(GnosisSafeL2130);
      expect(
        findDeployment(
          { version: '1.3.0+L2', released: true },
          _safeL2Deployments
        )
      ).toBe(GnosisSafeL2130);
      // Incorrect filter:
      expect(
        findDeployment(
          { version: '1.3.0+L2', released: false },
          _safeL2Deployments
        )
      ).toBeUndefined();
    });
    it('should return the correct deployment (filtered by version and network)', () => {
      // Reverse chronological deployments
      expect(
        findDeployment(
          { version: '1.3.0', network: '97' },
          _safeDeploymentsReverse
        )
      ).toBe(GnosisSafe130);
      // Incorrect filter:
      expect(
        findDeployment(
          { version: '1.3.0', network: '0' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();

      // L2 deployments
      expect(
        findDeployment({ version: '1.3.0', network: '97' }, _safeL2Deployments)
      ).toBe(GnosisSafeL2130);
      expect(
        findDeployment(
          { version: '1.3.0+L2', network: '97' },
          _safeL2Deployments
        )
      ).toBe(GnosisSafeL2130);
      // Incorrect filter:
      expect(
        findDeployment(
          { version: '1.3.0+L2', network: '0' },
          _safeL2Deployments
        )
      ).toBeUndefined();
    });
    it('should return the correct deployment (filtered by released and network)', () => {
      // Reverse chronological deployments
      expect(
        findDeployment(
          { released: true, network: '97' },
          _safeDeploymentsReverse
        )
      ).toBe(GnosisSafe130);
      // Incorrect filter:
      expect(
        findDeployment(
          { released: true, network: '0' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();
      expect(
        findDeployment(
          { released: false, network: '1' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();

      // L2 deployments
      expect(
        findDeployment({ released: true, network: '97' }, _safeL2Deployments)
      ).toBe(GnosisSafeL2130);
      // Incorrect filter:
      expect(
        findDeployment({ released: true, network: '0' }, _safeL2Deployments)
      ).toBeUndefined();
      expect(
        findDeployment({ released: false, network: '97' }, _safeL2Deployments)
      ).toBeUndefined();
    });
    it('should return the correct deployment (filtered by version, released and network)', () => {
      // Reverse chronological deployments
      expect(
        findDeployment(
          { version: '1.3.0', released: true, network: '97' },
          _safeDeploymentsReverse
        )
      ).toBe(GnosisSafe130);
      // Incorrect filter:
      expect(
        findDeployment(
          { version: '1.3.0', released: false, network: '97' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();
      expect(
        findDeployment(
          { version: '1.3.0', released: true, network: '0' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();
      expect(
        findDeployment(
          { version: '2.0.0', released: true, network: '97' },
          _safeDeploymentsReverse
        )
      ).toBeUndefined();

      // L2 deployments
      expect(
        findDeployment(
          { version: '1.3.0', released: true, network: '97' },
          _safeL2Deployments
        )
      ).toBe(GnosisSafeL2130);
      expect(
        findDeployment(
          { version: '1.3.0+L2', released: true, network: '97' },
          _safeL2Deployments
        )
      ).toBe(GnosisSafeL2130);
      // Incorrect filter:
      expect(
        findDeployment(
          { version: '1.3.0+L2', released: false, network: '97' },
          _safeL2Deployments
        )
      ).toBeUndefined();
      expect(
        findDeployment(
          { version: '1.3.0+L2', released: true, network: '0' },
          _safeL2Deployments
        )
      ).toBeUndefined();
      expect(
        findDeployment(
          { version: '2.0.0+L2', released: true, network: '97' },
          _safeL2Deployments
        )
      ).toBeUndefined();
    });
  });
});
