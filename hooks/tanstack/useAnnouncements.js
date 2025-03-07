"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = "https://cse.uap-bd.edu/v1/";

const axiosRequest = async ({ ...options }) => {
  const onSuccess = (res) => {
    return res.data;
  };
  const onError = (err) => {
    throw err.response.data;
  };

  return axios(options).then(onSuccess).catch(onError);
};

export const useGetAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () =>
      await axiosRequest({
        url: `/api/noticeboard/`,
        method: "GET",
      }),
  });
};
