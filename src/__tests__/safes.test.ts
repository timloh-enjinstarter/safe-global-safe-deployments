import GnosisSafeL2130 from '../assets/v1.3.0/gnosis_safe_l2.json';
import GnosisSafe130 from '../assets/v1.3.0/gnosis_safe.json';
import {
  getSafeSingletonDeployment,
  getSafeL2SingletonDeployment,
} from '../safes';

describe('safes.ts', () => {
  describe('getSafeSingletonDeployment', () => {
    it('should find the latest deployment first', () => {
      const result = getSafeSingletonDeployment();
      expect(result).toBe(GnosisSafe130);
    });
  });
  describe('getSafeL2SingletonDeployment', () => {
    it('should find the latest deployment first', () => {
      const result = getSafeL2SingletonDeployment();
      expect(result).toBe(GnosisSafeL2130);
    });
  });
});
