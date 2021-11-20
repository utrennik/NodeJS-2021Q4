const path = require('path');
const fs = require('fs');
const { FileWriteStream, FileReadStream } = require('../streams');

const file = '\\mocks\\output.txt';
const badFile = '\\bad\\path.txt';
const data = 'This is secret. Message about "_" symbol!';
const filePath = path.join(__dirname, file);

beforeEach(() => {
  outputStream = fs.createWriteStream(filePath);

  outputStream.write('', async () => {
    await new Promise((res) => {
      outputStream.on('finish', () => {
        res();
      });
    });
  });
});

describe('Testing FileWriteStream', () => {
  it('Should write data to file', async () => {
    const outputStream = new FileWriteStream(filePath);

    outputStream.write(data, async () => {
      const inputStream = new FileReadStream(filePath);

      const outputData = await new Promise((res) => {
        inputStream.on('data', (chunk) => {
          res(chunk);
        });
      });
      expect(outputData.trim()).toEqual(data);
    });
  });

  it('Should throw error on _destroy call', async () => {
    const outputStream = new FileWriteStream(filePath);
    try {
      outputStream._destroy();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
