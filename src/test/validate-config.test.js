const { validateConfig } = require('../modules/validate-config');

describe('Testing config validation', () => {
  const validConfig = 'C1-C0-A-R1-R0-A-R0-R0-C1-A';

  it('Should accept valid config', async () => {
    expect(validateConfig(validConfig)).toBeTruthy();
  });

  const invalidConfigWrongEncType = 'S1-C0-A-R1-R0-A-R0-R0-C1-A';

  it('Should decline invalid config with wrong encoding type', async () => {
    expect(validateConfig(invalidConfigWrongEncType)).toBeFalsy();
  });

  const invalidConfigWrongEncParam1 = 'C2-C0-A-R1-R0-A-R0-R0-C1-A';
  const invalidConfigWrongEncParam2 = 'C1-C0-A1-R1-R0-A-R0-R0-C1-A';
  const invalidConfigWrongEncParam3 = 'C1-C0-A1-R1-R0-A-R0-R4-C1-A';

  it('Should decline invalid config with wrong encoding type C param', async () => {
    expect(validateConfig(invalidConfigWrongEncParam1)).toBeFalsy();
  });

  it('Should decline invalid config with wrong encoding tpye A param', async () => {
    expect(validateConfig(invalidConfigWrongEncParam2)).toBeFalsy();
  });

  it('Should decline invalid config with wrong encoding type R param', async () => {
    expect(validateConfig(invalidConfigWrongEncParam3)).toBeFalsy();
  });
});
