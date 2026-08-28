const path = require('path');
const ArkFiles = require('../src/ArkFilesData');
const ArkBinaryFormats = require('../src/ArkBinaryFormats');
const chai = require('chai');
const expect = chai.expect;

describe('constructor', () => {
  it('resolves a server root to ShooterGame/Saved/SavedArks', () => {
    const arkFiles = new ArkFiles('test/assets/ase');
    expect(arkFiles.arkFilesDir).to.equal(path.join('test/assets/ase', 'ShooterGame', 'Saved', 'SavedArks'));
    expect(arkFiles.getPlayers()).to.have.lengthOf(1);
  });

  it('uses arkServerDir as-is when absolutePath is true', () => {
    const arkFilesDir = path.resolve('test/assets/ase/ShooterGame/Saved/SavedArks');
    const arkFiles = new ArkFiles(arkFilesDir, undefined, undefined, true);

    expect(arkFiles.arkFilesDir).to.equal(arkFilesDir);
    expect(arkFiles.getPlayers()).to.have.lengthOf(1);
  });

  it('uses arkServerDir as-is with format and refreshInterval when absolutePath is true', () => {
    const arkFilesDir = path.resolve('test/assets/asa/ShooterGame/Saved/SavedArks');
    const arkFiles = new ArkFiles(arkFilesDir, 120, ArkBinaryFormats.ASA, true);

    expect(arkFiles.refreshInterval).to.equal(120);
    expect(arkFiles.format).to.equal(ArkBinaryFormats.ASA);
    expect(arkFiles.getPlayers()).to.have.lengthOf(4);
  });
});
