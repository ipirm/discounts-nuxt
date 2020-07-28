import apiRequest from "../utils/apiRequest";










export const actions = {
  async sendMail({commit},body) {
    const data = await apiRequest.post(`mail-form`,body);
      console.log(data);
  }
}
