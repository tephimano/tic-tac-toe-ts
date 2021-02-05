import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production";

export const usePostQuery = (key, id, url, body, config = {}) => {
  return useQuery(
    [key, id],
    async () => {
      var { data, status } = await axios.post(BASE_URL + url, body, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(`POST ${url} : ${data} `);
      console.log(`AXIOS Status : ${url} : ${status}`);
      return data;
    },
    config
  );
};
