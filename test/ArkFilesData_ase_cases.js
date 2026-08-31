const path = require('path');
const ArkFiles = require('../src/ArkFilesData');
const chai = require('chai');
const expect = chai.expect;

const arkFilesDir = path.join(__dirname, 'assets/ase-cases');
const arkFiles = new ArkFiles(arkFilesDir, 0, undefined, true);

describe('ASE edge-case files', () => {
  let tribes;
  let players;

  before(() => {
    tribes = arkFiles.getTribes();
    players = arkFiles.getPlayers();
  });

  it('skips unreadable profiles and zeroed tribes', () => {
    expect(players).to.have.lengthOf(0);
    expect(tribes).to.have.lengthOf(2);
    expect(tribes.map(tribe => tribe.Id).sort()).to.deep.equal([1025759535, 1810672570]);
  });
});
