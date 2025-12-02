import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/auth";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ServerAPIOptions = {
  method?: Method;
  url: string;
  data?: any;
  params?: Record<string, any>;
  revalidate?: number;
};

const mutationsArray = ["POST", "PUT", "DELETE", "PATCH"];

export async function useServerAPI({
  method = "GET",
  url,
  data,
  params,
  revalidate,
}: ServerAPIOptions) {
  const session = await getServerSession(nextAuthOptions);
  const apiUrl = `${process.env.API_URL}`;

  if (method === "GET") {
    return await fetch(`${apiUrl}/${url}?${new URLSearchParams(params)}`, {
      cache: "default",
      next: { tags: [url], revalidate },
    });
  } else if (mutationsArray.includes(method)) {
    return await fetch(`${apiUrl}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
