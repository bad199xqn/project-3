import axios from 'axios';
import { api_v1 } from "../services/api";

export const labelPost = async (token, article_pk, mention_pk, sentimentality, session_id, screen_type, keyword) => {
  var data = JSON.stringify({
    labeled_data: [
      {
        mention_pk: mention_pk,
        article_pk: article_pk,
        sentimentality: [sentimentality],
      },
    ],
    session_id: session_id,
    screen_type: screen_type,
    keyword: keyword,
  });

  var config = {
    method: "post",
    url: `${api_v1}/labels/`,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  let status = await axios(config)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return {
        status: 400
      }
    });
    return status;
};
