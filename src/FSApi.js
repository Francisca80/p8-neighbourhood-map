

const API = "https://api.foursquare.com/v2/venues";



const CATEGORIES = {
  coffee: "4bf58dd8d48988d1e0931735"
};

const queryParams = params => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

export const getVenues = (lat, lng) => {
  const categoryId = Object.keys(CATEGORIES).map(cat => CATEGORIES[cat]);
  const params = {
    client_id: 'J4TRUHKP4NS0U11LXTE2JK4DO1EOFVRV5CAKWZVCZYDICB3C',
    client_secret: 'ACD1T22UPLHRH5L1VXTZIJGBOWJZNOXVA00RDLFMMQBQ3TGF',
    v: 20190502,
    ll: `${lat},${lng}`,
    categoryId: `${categoryId}`,
    radius: 1000,
    limit: 10
  };

  const url = `${API}/search?${queryParams(params)}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(data => data.response.venues)
    .catch(error => {
      console.error(error);
      window.alert("Error: Failed to get venues in Fourquare API");
    });
};