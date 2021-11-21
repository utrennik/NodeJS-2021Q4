const { getInputStream } = require('../modules/io');

const file = '\\mocks\\input.txt';
const badFilePath = '\\bad\\file\\path';

describe('Testing FileReadStream', () => {
  it('FileReadStream should read data from file', async () => {
    const stream = getInputStream(file, __dirname);
    const data = await new Promise((res) => {
      stream.on('data', (chunk) => {
        res(chunk);
      });
    });

    expect(data.trim()).toEqual('This is secret. Message about "_" symbol!');
  });

  it('should call _read when reading from file', async () => {
    const stream = getInputStream(file, __dirname);
    const spyRead = jest.spyOn(stream, '_read');

    await new Promise((res) => {
      stream.on('data', (chunk) => {
        res(chunk);
      });
    });

    expect(spyRead).toBeCalled();
  });

  it('Should throw error on _destroy call', async () => {
    const inputStream = getInputStream(file, __dirname);
    try {
      inputStream._destroy(Error());
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
