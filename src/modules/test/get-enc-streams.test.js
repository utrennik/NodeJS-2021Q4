const { getEncStreams } = require('../get-enc-streams');
const { Caesar, Atbash, Rot8 } = require('../../streams');
const { ConfigError } = require('../../errors');

describe('Test transform streams generation', () => {
  it('Should generate encoding Caesar stream', async () => {
    const streamsArr = getEncStreams('C1');
    const stream = streamsArr[0];

    expect(stream).toBeInstanceOf(Caesar);
    expect(stream.isEnc).toBeTruthy();
  });

  it('Should generate decoding Caesar stream', async () => {
    const streamsArr = getEncStreams('C0');
    const stream = streamsArr[0];

    expect(stream).toBeInstanceOf(Caesar);
    expect(stream.isEnc).toBeFalsy;
  });

  it('Should generate encoding ROT-8 stream', async () => {
    const streamsArr = getEncStreams('R1');
    const stream = streamsArr[0];

    expect(stream).toBeInstanceOf(Rot8);
    expect(stream.isEnc).toBeTruthy();
  });

  it('Should generate decoding ROT-8 stream', async () => {
    const streamsArr = getEncStreams('R0');
    const stream = streamsArr[0];

    expect(stream).toBeInstanceOf(Rot8);
    expect(stream.isEnc).toBeFalsy();
  });

  it('Should generate Atbash stream', async () => {
    const streamsArr = getEncStreams('A');
    const stream = streamsArr[0];

    expect(stream).toBeInstanceOf(Atbash);
  });
});

describe('Test multiple streams generation', () => {
  it('Should generate encoding Caesar, decoding ROT-8 and Atbash stream', async () => {
    const streamsArr = getEncStreams('C1-R0-A');
    const strCaesarEnc = streamsArr[0];
    const strRot8Dec = streamsArr[1];
    const strAtbash = streamsArr[2];

    expect(strCaesarEnc).toBeInstanceOf(Caesar);
    expect(strCaesarEnc.isEnc).toBeTruthy();

    expect(strRot8Dec).toBeInstanceOf(Rot8);
    expect(strRot8Dec.isEnc).toBeFalsy();

    expect(strAtbash).toBeInstanceOf(Atbash);
  });
});

describe('Test config validation', () => {
  it('Should throw ConfigError on invalid config', async () => {
    expect(() => {
      getEncStreams('C3-S0');
    }).toThrow(ConfigError);

    expect(() => {
      getEncStreams('C1--C0');
    }).toThrow(ConfigError);

    expect(() => {
      getEncStreams('A1');
    }).toThrow(ConfigError);
  });
});
