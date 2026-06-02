export type OpenYoumiyaClientOptions = {
  token: string;
  baseURL?: string;
};

export function createOpenYoumiyaClient(options: OpenYoumiyaClientOptions) {
  const baseURL = options.baseURL ?? "https://openapi.youmiya.love";
  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetch(`${baseURL}${path}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${options.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`OpenYoumiya API request failed: ${response.status}`);
      }
      return response.json() as Promise<T>;
    },
  };
}
