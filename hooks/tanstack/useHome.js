"use client";

import axiosRequest from "@/lib/axiosRequest";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useHomeData = () => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: async () =>
      await axiosRequest({
        url: `/api/home/`,
        method: "GET",
      }),
  });
};
