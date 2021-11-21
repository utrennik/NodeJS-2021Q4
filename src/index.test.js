const spawn = require('child_process').spawn;
const concat = require('concat-stream');

const createProcess = (processPath, args = [], env = null) => {
  args = [processPath].concat(args);

  return spawn('node', args, {
    env: Object.assign(
      {
        NODE_ENV: 'test',
      },
      env
    ),
  });
};

const execute = (processPath, args = [], opts = {}) => {
  const { env = null } = opts;
  const childProcess = createProcess(processPath, args, env);

  childProcess.stdin.setEncoding('utf-8');

  const promise = new Promise((resolve, reject) => {
    childProcess.stderr.once('data', (err) => {
      reject(err.toString());
    });

    childProcess.on('error', reject);

    childProcess.stdout.pipe(
      concat((result) => {
        resolve(result.toString());
      })
    );
  });
  return promise;
};

const processPath = 'src\\index.js';
const inputFilePath = 'test\\mocks\\input.txt';

describe('Testing CLI', () => {
  it('Should properly encode the sequence (case1)', async () => {
    const response = await execute(processPath, ['--config', 'C1-C1-R0-A', '-i', inputFilePath]);

    expect(response.trim()).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
  });

  it('Should properly encode the sequence (case2)', async () => {
    const response = await execute(processPath, [
      '--config',
      'C1-C0-A-R1-R0-A-R0-R0-C1-A',
      '-i',
      'test\\mocks\\input.txt',
    ]);

    expect(response.trim()).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
  });

  it('Should properly encode the sequence (case3)', async () => {
    const response = await execute(processPath, [
      '--config',
      'A-A-A-R1-R0-R0-R0-C1-C1-A',
      '-i',
      inputFilePath,
    ]);

    expect(response.trim()).toEqual('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
  });

  it('Should properly encode the sequence (case4)', async () => {
    const response = await execute(processPath, [
      '--config',
      'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
      '-i',
      inputFilePath,
    ]);

    expect(response.trim()).toEqual('This is secret. Message about "_" symbol!');
  });
});

describe('Testing CLI for throwing errors', () => {
  it('Should throw ParamError on config param duplication', async () => {
    try {
      await execute(processPath, [
        '--config',
        'C1-C1-R0-A',
        '--config',
        'C1-C1-R0-A',
        '-i',
        inputFilePath,
      ]);
    } catch (e) {
      expect(e).toEqual('ParamError: Error! Param --config duplicated!');
    }
  });

  it('Should throw ConfigError if no config provided', async () => {
    try {
      await execute(processPath, ['-i', inputFilePath]);
    } catch (e) {
      expect(e).toEqual('ConfigError: Error! No config param!');
    }
  });

  it('Should throw FileReadError if wrong file path provided', async () => {
    try {
      await execute(processPath, ['--config', 'C1-C1-R0-A', '-i', 'wrong\\file\\path.txt']);
    } catch (e) {
      expect(e).toEqual('FileReadError: Input file not found!');
    }
  });

  it('Should throw FileWriteError if wrong file path provided', async () => {
    try {
      await execute(processPath, ['--config', 'C1-C1-R0-A', '-o', 'wrong\\file\\path.txt']);
    } catch (e) {
      expect(e).toEqual('FileWriteError: Output file not found!');
    }
  });

  it('Should throw ConfigError if wrong config provided (case 1)', async () => {
    try {
      await execute(processPath, ['--config', 'C2-C1-R0-A', '-i', inputFilePath]);
    } catch (e) {
      expect(e).toEqual('ConfigError: Error! Config is invalid!');
    }
  });

  it('Should throw ConfigError if wrong config provided (case 2)', async () => {
    try {
      await execute(processPath, ['--config', 'C0-C1-R0-A1', '-i', inputFilePath]);
    } catch (e) {
      expect(e).toEqual('ConfigError: Error! Config is invalid!');
    }
  });

  it('Should throw ConfigError if wrong config provided (case 3)', async () => {
    try {
      await execute(processPath, ['--config', 'S0-C1-R0-A1', '-i', inputFilePath]);
    } catch (e) {
      expect(e).toEqual('ConfigError: Error! Config is invalid!');
    }
  });

  it('Should throw ConfigError if wrong config provided (case 4)', async () => {
    try {
      await execute(processPath, ['--config', 'C0--C1-R0-A1', '-i', inputFilePath]);
    } catch (e) {
      expect(e).toEqual('ConfigError: Error! Config is invalid!');
    }
  });
});
