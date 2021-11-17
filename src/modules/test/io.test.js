const { getInputStream, getOutputStream } = require('../io');
const { FileReadStream, FileWriteStream } = require('../../streams');
const { FileWriteError } = require('../../errors');

const file = '/mocks/file.txt';

const badFile = 'Bad_file.txt';

describe('Testing IO module', () => {
  it('should return stdin', async () => {
    const stream = getInputStream();
    expect(stream).toBe(process.stdin);
  });

  it('should return FileInputStream', async () => {
    const stream = getInputStream(file, __dirname);
    expect(stream).toBeInstanceOf(FileReadStream);
  });

  it('should return stdout', async () => {
    const stream = getOutputStream();
    expect(stream).toBe(process.stdout);
  });

  it('should return FileOutputStream', async () => {
    const stream = getOutputStream(file, __dirname);
    expect(stream).toBeInstanceOf(FileWriteStream);
  });

  it('should throw FileWriteError', async () => {
    expect(() => {
      getOutputStream(badFile, __dirname);
    }).toThrow(FileWriteError);
  });
});
