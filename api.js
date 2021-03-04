const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async url => {
  try {
      const response = await fetch(url);
      const data = response.json();
      return data;
  } catch(e) {
      throw new Error("Error 발생!")
  }
};

export const api = {
  fetchCats: async keyword => {
    try{
      const resp = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      return {
        success: true,
        data : resp.data
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.toString()
      }
    }
    
  },
  fetchDetailCat: async id => {

    try{
      const resp = await request(`${API_ENDPOINT}/api/cats/${id}`)
      return {
        success: true,
        data : resp.data
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.toString()
      }
    }
  },
  randomCats: async () => {
    try{
      const resp = await request(`${API_ENDPOINT}/api/cats/random50`)
      return {
        success: true,
        data : resp.data
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.toString()
      }
    }
  }
};
