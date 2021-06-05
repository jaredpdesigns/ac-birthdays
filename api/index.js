export async function getAllVillagers() {
  try {
    const request = await fetch(
      `https://api.nookipedia.com/villagers?game=nh`,
      {
        headers: {
          "X-API-KEY": process.env.NOOKIPEDIA_KEY,
          "Accept-Version": "2.0.0",
        },
      }
    );
    const response = await request.json();
    return response.length ? response : null;
  } catch (error) {
    return error;
  }
}
export async function getVillagerDetailed(slug) {
  try {
    const request = await fetch(
      `https://api.nookipedia.com/villagers?game=nh&nhdetails=true&name=${slug}`,
      {
        headers: {
          "X-API-KEY": process.env.NOOKIPEDIA_KEY,
          "Accept-Version": "2.0.0",
        },
      }
    );
    const response = await request.json();
    return response.length ? response[0] : null;
  } catch (error) {
    return error;
  }
}
export async function getExtra(query) {
  try {
    const request = await fetch(`https://api.nookipedia.com/${query}`, {
      headers: {
        "X-API-KEY": process.env.NOOKIPEDIA_KEY,
        "Accept-Version": "2.0.0",
      },
    });
    const response = await request.json();
    return response ? response : null;
  } catch (error) {
    return error;
  }
}
export async function getMonth(month) {
  try {
    const request = await fetch(
      `https://api.nookipedia.com/villagers?game=nh&thumbsize=240&birthmonth=${month}`,
      {
        headers: {
          "X-API-KEY": process.env.NOOKIPEDIA_KEY,
          "Accept-Version": "2.0.0",
        },
      }
    );
    const response = await request.json();
    return response.length ? response : null;
  } catch (error) {
    return error;
  }
}
