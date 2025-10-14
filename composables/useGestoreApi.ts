import { ofetch } from "ofetch";

export const useGestoreApi = () => {
  const config = useRuntimeConfig();

  const api = ofetch.create({
    baseURL: config.public.gestoreApiUrl,
    headers: {
      Authorization: `Bearer ${config.public.gestoreApiKey}`,
    },
  });

  return api;
};