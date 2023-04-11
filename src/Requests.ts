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

async function request(url: string, method: string, data: JSON | null = null) {

  let request_necessity = false;

  const localInfo = localStorage.getItem(url);

  if(localInfo == null) {
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

export async function getNewsNotices() {
  const url = "/news/notices";

  return await request(url, "GET", null);
}


