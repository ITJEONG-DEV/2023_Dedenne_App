let apiKey = "";

const baseUrl = "https://developer-lostark.game.onstove.com/";


export function setApiKey(key: string) {
    apiKey = key;
}

async function GET_request(url: string): Promise<JSON | null> {
  try {
  const response = await fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return (await response.json());

  } catch (error) {
    if (error instanceof Error) {
      console.log('error: ', error.message);

      return null;
    } else {
      console.log('unexpected error: ', error);

      return null;
    }
  }
}

async function POST_request(url: string, data: JSON | null): Promise<JSON | null> {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        return (await response.json());

    } catch (error) {
        if (error instanceof Error) {
            console.log('error: ', error.message);

            return null;
        } else {
            console.log('unexpected error: ', error);

            return null;
        }
    }
}

const timeGap = 10*60*1000;
function checkTimeGap(loadedDate: string): boolean {
  return Date.now() - Number(loadedDate) > timeGap;
}

async function request(url: string, method: string, data: JSON | null = null, force: boolean): Promise<JSON | null> {

  let request_necessity = false;

  const localInfo = localStorage.getItem(url);

  if(force) {
    request_necessity = true;
  } else if(localInfo == null) {
    request_necessity = true;
  } else {
    const json = JSON.parse(localInfo);

    request_necessity = checkTimeGap(json["date"]);
  }

  if(!request_necessity && localInfo != null) {
    const json = JSON.parse(localInfo);

    return json["payload"];
  }

  const result = method == "GET" ? await GET_request(url) : await POST_request(url, data);

  if(result != null) {
    const json = {
      "payload" : result,
      "date": Date.now().toString()
    }

    localStorage.setItem(url, JSON.stringify(json));
  }

  return result;
}

// Notice
export interface INotice {
  Date: string,
  Link: string,
  Title: string,
  Type: string
}

// Event
export interface IEvent {
  Title: string,
  Thumbnail: string,
  Link: string,
  StartDate: string,
  EndDate: string,
  RewardDate?: string
}

// CharacterInfo
export interface ICharacterInfo {
  ServerName: string,
  CharacterName: string,
  CharacterLevel: number,
  CharacterClassName: string,
  ItemAvgLevel: string,
  ItemMaxLevel: string
}

// Stat
export interface IStat {
  Type: string,
  Value: string,
  Tooptip: Array<string>
}

// Tendency
interface ITendency {
  Type: string,
  Point: number,
  MaxPoint: number
}

// ArmoryProfile
export interface IArmoryProfile {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: number;
  TownName: string;
  Title: string;
  GuildMemeberGrade: string;
  GuildName: string;
  UsingSkillPoint: number;
  TotalSkillPoint: number;
  Stats: Array<IStat>;
  Tendencies: Array<ITendency>;
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
}

// ArmoryEquipment
export interface IArmoryEquipment {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
}

export interface IEquipment {
  name: string;
  value: IArmoryEquipment | null;
}

// ArmoryAvatar
export interface IArmoryAvatar {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  IsSet: boolean;
  IsInner: boolean;
  Tooltip: string;
}

// SkillTripod
export interface ISkillTripod {
  Tier: number;
  Slot: number;
  Name: string;
  Icon: string;
  Level: number;
  IsSelected: boolean;
  Tooltip: string;
}

// SkillRune
export interface ISkillRune {
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
}

// ArmorySkill
export interface IArmorySkill {
  Name: string;
  Icon: string;
  Level: number;
  Type: string;
  IsAwakening: boolean;
  Tripods: Array<ISkillTripod>;
  Rune: Array<ISkillRune>;
}

// Engraving
export interface IEngraving {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
}

// Effect
export interface IEffect {
  Name: string;
  Description: string;
}

// ArmoryEngraving
export interface IArmoryEngraving {
  Engravings: Array<IEngraving>;
  Effects: Array<IEffect>;
}

// Card
export interface ICard {
  Slot: number;
  Name: string;
  Icon: string;
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
  Tooltip: string;
}

// CardEffect
export interface ICardEffect {
  Index: number;
  CardSlots: Array<number>;
  Items: Array<IEffect>;
}

// ArmoryCard
export interface IArmoryCard {
  Cards: Array<ICard>;
  Effects: Array<ICardEffect>;
}

// Gem
export interface IGem {
  Slot: number;
  Name: string;
  Icon: string;
  Level: number;
  Grade: string;
  Tooltip: string;
}

// GemEffect
export interface IGemEffect {
  GemSlot: number;
  Name: string;
  Description: string;
  Icon: string;
  Tooltip: string;
}

// ArmoryGem
export interface IArmoryGem {
  Gems: Array<IGem>;
  Effects: Array<IGemEffect>;
}

// AggregationTeamDeathMatchRank
export interface IAggregationTeamDeathMatchRank {
  Rank: number;
  RankName: string;
  RankIcon: string;
  RankLastMmr: number;
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  aceCount: number;
  DeathCount: number;
}

// Aggregation
export interface IAggregation {
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

// AggregationElimination
export interface IAggregationElimination {
  FirstWinCount: number;
  SecondWinCount: number;
  ThirdWinCount: number;
  FirstPlayCount: number;
  SecondPlayCount: number;
  ThirdPlayCount: number;
  AllKillCount: number;
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

// Colosseum
export interface IColosseum {
  SeasonName: string;
  Competitive: Array<IAggregationTeamDeathMatchRank>;
  TeamDeathmatch: Array<IAggregation>;
  Deathmatch: Array<IAggregation>;
  TeamElimination: Array<IAggregationElimination>;
  CoOpBattle: Array<IAggregation>;
}

// ColosseumInfo
export interface IColosseumInfo {
  Rank: number;
  PreRank: number;
  Exp: number;
  Colosseums: Array<IColosseum>;
}

// CollectiblePoint
export interface ICollectiblePoint {
  PointName: string;
  Point: number;
  MaxPoint: number;
}

// Collectible
export interface ICollectible {
  Type: string;
  Icon: string;
  Point: number;
  MaxPoint: number;
  CollectiblePoints: Array<ICollectiblePoint>;
}

// Profile
export interface IProfile {
  ArmoryProfile: IArmoryProfile;
  ArmoryEquipment: Array<IArmoryEquipment>;
  ArmoryAvatars: Array<IArmoryAvatar>;
  ArmorySkills: Array<IArmorySkill>;
  ArmoryEngraving: IArmoryEngraving;
  ArmoryCard: IArmoryCard;
  ArmoryGem: IArmoryGem;
  ColosseumInfo: IColosseumInfo;
  Collectibles: Array<ICollectible>;
}

export async function getNewsNotices(force: boolean): Promise<INotice[]> {
  const url = "/news/notices";

  const result = await request(url, "GET", null, force);

  let noticeList: Array<INotice> = Object.assign(new Array<INotice>(), result);

  return noticeList;
}

export async function getNewsEvents(force: boolean): Promise<IEvent[]> {
  const url = "/news/events";

  const result = await request(url, "GET", null, force);

  let eventList: Array<IEvent> = Object.assign(new Array<IEvent>(), result);

  return eventList;
}

export async function getCharactersSiblings(characterName: string, force: boolean): Promise<ICharacterInfo[]> {
  const url = `/characters/${characterName}/siblings`;

  const result = await request(url, "GET", null, force);

  let charcterList: Array<ICharacterInfo> = Object.assign(new Array<ICharacterInfo>(), result);

  return charcterList;
}

export async function getArmoriesCharacters(characterName: string, force: boolean): Promise<IProfile> {
  const url = `/armories/characters/${characterName}`;

  const result = await request(url, "GET", null, force);

  let charcterList: IProfile = result as unknown as IProfile;

  return charcterList;
}