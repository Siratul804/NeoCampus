"use client";

import axiosRequest from "@/lib/axiosInstance";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () =>
      await axiosRequest({
        url: `/api/eventGet/`,
        method: "GET",
      }),
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "createEvent",
    mutationFn: async (body) => {
      return await axiosRequest({
        url: `/api/event/`,
        method: "POST",
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
