import { bp } from 'binparse';
import { D2PathStrut } from './common.js';
import { D2StatListStrut, D2StatStrut } from './common.js';
import { Pointer } from './pointer.js';

export const D2cWaypointData = bp.object('D2rWaypoint', {});
export const D2cQuestData = bp.object('D2rQuest', {});
export const D2cArenaUnit = bp.object('D2cArenaUnit', {});
export const D2cPlayerTrade = bp.object('D2cPlayerTrade', {});
export const D2cClient = bp.object('D2cClient', {});
export const D2cInventory = bp.object('D2cInventory', {});
export const D2cLight = bp.object('D2cLight', {});

export const D2cRoom2 = bp.object('D2cRoom2', {
  skip1: bp.skip(0x34),
  x: bp.lu32,
  y: bp.lu32,
  width: bp.lu32,
  height: bp.lu32,
});

export const D2cRoom1 = bp.object('D2cRoom1', {
  pRoomNear: new Pointer(bp.lu32), // 0x00
  skip1: bp.skip(3 * 4), // 0x04
  pRoom2: new Pointer(D2cRoom2), // 0x10
  skip2: bp.skip(0x4c - (0x10 + 4)),
  x: bp.lu32, //0x4c
  y: bp.lu32,
  width: bp.lu32,
  height: bp.lu32,

  skip3: bp.skip(6 * 4),
  pUnit: new Pointer(bp.lu32),
});

export const D2cPlayerDataStrut = bp.object('D2rPlayerData', {
  name: bp.string(16), // 0x00
  questNormal: new Pointer(D2cQuestData), // 0x10
  questNightmare: new Pointer(D2cQuestData), // 0x14
  questHell: new Pointer(D2cQuestData), // 0x18
  wpNormal: new Pointer(D2cWaypointData), // 0x1c
  wpNightmare: new Pointer(D2cWaypointData), // 0x20
  wpHell: new Pointer(D2cWaypointData), // 0x24
});

export const D2cActStrut = bp.object('Act', {
  unk1: bp.skip(12), // 0x00
  mapSeed: bp.lu32, //  0x0c
  room1: new Pointer(D2cRoom1), // 0x10
  act: bp.lu32, // 0x14
});

export const D2cUnitAnyPlayerStrut = bp.object('UnitAnyPlayer', {
  type: bp.lu32, //  0x00
  txtFileNo: bp.lu32, // 0x04
  unitId: bp.lu32, // 0x08
  mode: bp.lu32, // 0x0c
  /** Pointer to PlayerStrut */
  pPlayer: new Pointer(D2cPlayerDataStrut), //0x10
  actId: bp.lu32, // 0x14
  /** Pointer to Act */
  pAct: new Pointer(D2cActStrut), // 0x18
  seedA: bp.lu32, // 0x1c
  seedB: bp.lu32, // 0x20
  unk2: bp.skip(4), // 0x24
  pPath: new Pointer(D2PathStrut), // 0x28
  skip2: bp.skip(0x58 - (0x28 + 4)),

  pStats: new Pointer(D2StatListStrut),
  pInventory: new Pointer(D2cInventory),
  pLight: new Pointer(D2cLight),
  skip3: bp.skip(36),

  x: bp.lu16,
  y: bp.lu16,

  // skip4: bp.skip(0xe4 - 0x8c),

  // next: new Pointer(bp.lu32),
  // // unk5: bp.array('Unk5', new Pointer(bp.lu32), 30),

  // // nextUnit: bp.lu64, // 0x158
});

export const D2cStrut = {
  UnitPlayer: D2cUnitAnyPlayerStrut,
  PlayerData: D2cPlayerDataStrut,
  StatList: D2StatListStrut,
  Stat: D2StatStrut,
  Act: D2cActStrut,
  Path: D2PathStrut,
};
