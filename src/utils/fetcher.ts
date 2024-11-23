type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";

interface FetcherConfigBase {
  path: string;
  method: HttpMethod;
}

interface FetcherConfigWithBody extends FetcherConfigBase {
  method: "POST" | "PUT";
  body: Record<string, any>;
}

type FetcherConfig = FetcherConfigBase | FetcherConfigWithBody;

const handleError = (error: any) => {
  console.error("HTTP Error:", error);
  throw new Error(error.message || "Something went wrong!");
};

export const fetcher = async <T>(config: FetcherConfig): Promise<T> => {
  const { path, method } = config;
  const URL = `${process.env.API_URL}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (method === "POST" || method === "PUT") {
    const { body } = config as FetcherConfigWithBody;
    options.body = JSON.stringify(body);
  }

  console.log(options);

  try {
    const res = await fetch(URL, options);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || res.statusText);
    }

    const data: T = await res.json();

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
