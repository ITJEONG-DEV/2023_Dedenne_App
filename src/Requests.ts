import { ref } from "vue";

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
  return new Date().getUTCMilliseconds() - Date.parse(loadedDate) > timeGap;
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
        "date": new Date().toString()
      }

    localStorage.setItem(url, JSON.stringify(json));
  }

  return result;
}

// Notice
interface INotice {
  Date: string,
  Link: string,
  Title: string,
  Type: string
}

export class Notice implements INotice {
  Date: string = "";
  Link: string = "";
  Title: string = "";
  Type: string = "";

  constructor(date: string, link: string, title: string, type: string) {
    this.Date = date;
    this.Link = link;
    this.Title = title;
    this.Type = type;
  }
}

// Event
interface IEvent {
  Title: string,
  Thumbnail: string,
  Link: string,
  StartDate: string,
  EndDate: string,
  RewardDate?: string
}

export class Event implements IEvent {
  Title: string = "";
  Thumbnail: string = "";
  Link: string = "";
  StartDate: string = "";
  EndDate: string = "";
  RewardDate?: string;

  constructor(title: string, thumbnail: string, link: string, startDate: string, endDate: string, rewardDate?: string) {
    this.Title = title;
    this.Thumbnail = thumbnail;
    this.Link = link;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.RewardDate = rewardDate;    
  }
}

// CharacterInfo
interface ICharacterInfo {
  ServerName: string,
  CharacterName: string,
  CharacterLevel: number,
  CharacterClassName: string,
  ItemAvgLevel: string,
  ItemMaxLevel: string
}

export class CharacterInfo implements ICharacterInfo {
  ServerName: string = "";
  CharacterName: string = "";
  CharacterLevel: number = 0;
  CharacterClassName: string  ="";
  ItemAvgLevel: string = "";
  ItemMaxLevel: string = "";

  constructor(serverName: string, characterName: string, characterLevel: number, characterClassName: string, itemAvgLevel: string, itemMaxLevel: string) {
    this.ServerName = serverName;
    this.CharacterName = characterName;
    this.CharacterLevel = characterLevel;
    this.CharacterClassName = characterClassName;
    this.ItemAvgLevel = itemAvgLevel;
    this.ItemMaxLevel = itemMaxLevel;
  }
}

export async function getNewsNotices(force: boolean): Promise<Notice[]> {
  const url = "/news/notices";

  const result = await request(url, "GET", null, force);

  let noticeList: Array<Notice> = Object.assign(new Array<Notice>(), result);

  return noticeList;
}

export async function getNewsEvents(force: boolean): Promise<Event[]> {
  const url = "/news/events";

  const result = await request(url, "GET", null, force);

  let eventList: Array<Event> = Object.assign(new Array<Event>(), result);

  return eventList;
}

export async function getCharactersSiblings(characterName: string, force: boolean): Promise<CharacterInfo[]> {
  const url = `/characters/${characterName}/siblings`;

  const result = await request(url, "GET", null, force);

  let charcterList: Array<CharacterInfo> = Object.assign(new Array<CharacterInfo>(), result);

  return charcterList;
}