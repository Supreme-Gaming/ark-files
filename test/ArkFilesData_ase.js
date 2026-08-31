const path = require('path');
const ArkFiles = require('../src/ArkFilesData');
const arkFiles = new ArkFiles(path.join(__dirname, 'assets/ase'));
const chai = require('chai');
const expect = chai.expect;

const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

describe('Players', () => {
    let players;

    before(() => {
        players = arkFiles.getPlayers();
    });

    it('gets players', () => {
        expect(players).to.have.lengthOf(1);
        expect(players[0].FileCreated).to.match(timestampRegex);
        expect(players[0].FileUpdated).to.match(timestampRegex);

        const { FileCreated, FileUpdated, ...playerData } = players[0];
        expect(playerData).to.deep.equal({
            Tribe: false,
            PlayerName: 'TimmeY',
            Level: 300,
            TotalEngramPoints: 10000,
            CharacterName: 'Timmey',
            TribeId: false,
            SteamId: 76561198123343260,
            PlayerId: 145285114,
        });
    });
});

describe('tribes', () => {
    let tribes;

    before(() => {
        tribes = arkFiles.getTribes();
    });

    it('finds all tribes', () => {
        expect(tribes).to.have.lengthOf(3);
    });

    it('parses tribe The Dino Police correctly', () => {
        const tribe = tribes.find(t => t.Id === 1632026172);

        expect(tribe.FileCreated).to.match(timestampRegex);
        expect(tribe.FileUpdated).to.match(timestampRegex);

        const { FileCreated, FileUpdated, ...tribeData } = tribe;
        expect(tribeData).to.deep.equal({
            Players: [],
            Name: 'The Dino Police',
            OwnerId: 529159650,
            Id: 1632026172,
            TribeLogs: [
                'Day 93, 09:26:13: <RichColor Color="0, 1, 1, 1">Jarno was added to the Tribe!</>',
                'Day 93, 10:45:15: <RichColor Color="0, 1, 1, 1">Remco was added to the Tribe by Jarno!</>',
                'Day 93, 11:48:28: <RichColor Color="1, 0, 0, 1">Tribemember Remco - Lvl 26 was killed by a Raptor - Lvl 360!</>',
                'Day 93, 11:53:40: <RichColor Color="1, 0, 0, 1">Tribemember Jarno - Lvl 44 was killed by a Raptor - Lvl 360!</>',
                'Day 93, 16:23:49: <RichColor Color="0, 1, 0, 1">Jarno Tamed a Pteranodon - Lvl 149 (Pteranodon)!</>',
            ],
            TribeMemberNames: ['Jarno', 'Remco'],
        });
    });

    it('parses UTF-16 tribe Tribe of Nerón correctly', () => {
        const tribe = tribes.find(t => t.Id === 1025759535);

        expect(tribe.Name).to.equal('Tribe of Nerón');
        expect(tribe.OwnerId).to.equal(747045347);
        expect(tribe.TribeMemberNames).to.deep.equal(['Nerón']);
        expect(tribe.TribeLogs).to.be.an('array').with.lengthOf(37);
        expect(tribe.TribeLogs[0]).to.equal(
            'Day 22, 06:17:52: <RichColor Color="0, 1, 1, 1">Nerón was added to the Tribe!</>'
        );
        expect(tribe.FileCreated).to.match(timestampRegex);
        expect(tribe.FileUpdated).to.match(timestampRegex);
    });

    it('uses scalar TribeId for Tribe of Agent Xer0', () => {
        const tribe = tribes.find(t => t.Id === 1810672570);

        expect(tribe.Id).to.be.a('number');
        expect(tribe.Name).to.equal('Tribe of Agent Xer0');
        expect(tribe.OwnerId).to.equal(499502473);
        expect(tribe.TribeMemberNames).to.deep.equal(['Agent Xer0']);
        expect(tribe.TribeLogs).to.be.an('array').with.lengthOf(45);
        expect(tribe.TribeLogs[0]).to.equal(
            'Day 14623, 16:32:46: <RichColor Color="0, 1, 1, 1">Agent Xer0 was added to the Tribe!</>'
        );
        expect(tribe.FileCreated).to.match(timestampRegex);
        expect(tribe.FileUpdated).to.match(timestampRegex);
    });
});
