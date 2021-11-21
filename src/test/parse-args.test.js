const { ConfigError, ParamError } = require('../errors');
const { parseArgs } = require('../modules/parse-args');

describe('Testing arguments parsing', () => {
  it('Should return proper config', async () => {
    const args = ['--config', 'A-R0-C1', '--input', 'file.txt', '--output', 'file2.txt'];
    const parsed = parseArgs(args);

    expect(parsed.config).toEqual('A-R0-C1');
  });

  it('Config.output should be null if no --output param provided', async () => {
    const args = ['--config', 'A-R0-C1', '--input', 'file.txt'];
    const parsed = parseArgs(args);

    expect(parsed.output).toEqual(null);
  });

  it('Config.input should be null if no --input param provided', async () => {
    const args = ['--config', 'A-R0-C1', '--output', 'file.txt'];
    const parsed = parseArgs(args);

    expect(parsed.input).toEqual(null);
  });

  it('Should throw ParamError on config args duplication', async () => {
    const duplicatedConfig = ['-c', 'A', '-c', 'C1', '-i', 'file.txt', '-o', 'file.txt'];

    expect(() => {
      parseArgs(duplicatedConfig);
    }).toThrow(ParamError);
  });

  it('Should throw ParamError on input args duplication', async () => {
    const duplicatedInput = ['-c', 'A', '-i', 'file.txt', '-i', 'file.txt'];
    const duplicatedInput2 = ['-c', 'A', '--input', 'file.txt', '--input', 'file.txt'];
    const duplicatedInput3 = ['-c', 'A', '-i', 'file.txt', '--input', 'file.txt'];

    expect(() => {
      parseArgs(duplicatedInput);
    }).toThrow(ParamError);

    expect(() => {
      parseArgs(duplicatedInput2);
    }).toThrow(ParamError);

    expect(() => {
      parseArgs(duplicatedInput3);
    }).toThrow(ParamError);
  });

  it('Should throw ParamError on output args duplication', async () => {
    const duplicatedInput = ['-c', 'A', '-o', 'file.txt', '-o', 'file.txt'];
    const duplicatedInput2 = ['-c', 'A', '--output', 'file.txt', '--output', 'file.txt'];
    const duplicatedInput3 = ['-c', 'A', '-o', 'file.txt', '--output', 'file.txt'];

    expect(() => {
      parseArgs(duplicatedInput);
    }).toThrow(ParamError);

    expect(() => {
      parseArgs(duplicatedInput2);
    }).toThrow(ParamError);

    expect(() => {
      parseArgs(duplicatedInput3);
    }).toThrow(ParamError);
  });

  it('Should throw ConfigError if there is no config', async () => {
    const args = ['--input', './file.txt', '--output', './file.txt'];

    expect(() => {
      parseArgs(args);
    }).toThrow(ConfigError);
  });
});
