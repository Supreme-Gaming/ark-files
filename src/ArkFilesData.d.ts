declare class ArkFilesData {
    constructor(arkServerDir: string, refreshInterval?: number);

    getPlayers(): ArkFilesData.Player[];
    getTribes(): ArkFilesData.Tribe[];
}

declare namespace ArkFilesData {
    interface Player {
        Tribe: Tribe | false;
        PlayerName: string;
        Level: number;
        TotalEngramPoints: number;
        CharacterName: string;
        TribeId: number | false;
        SteamId: number;
        PlayerId: number;
        FileCreated: string;
        FileUpdated: string;
    }

    interface Tribe {
        Players: Player[];
        Name: string;
        OwnerId: number;
        Id: number;
        TribeLogs: string[];
        TribeMemberNames: string[];
        FileCreated: string;
        FileUpdated: string;
    }
}

export = ArkFilesData;
