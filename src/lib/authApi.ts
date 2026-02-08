export type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignupPayload = {
  fullName: string;
  organization: string;
  email: string;
  password: string;
};

export type AuthSuccess = {
  token: string;
  message?: string;
};

type ApiError = {
  message?: string;
};

async function postJson<TResponse>(url: string, body: unknown): Promise<TResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : undefined;

  if (!res.ok) {
    const message =
      (data as ApiError | undefined)?.message ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as TResponse;
}

export const authApi = {
  login: (payload: LoginPayload) => postJson<AuthSuccess>("/api/login", payload),
  signup: (payload: SignupPayload) => postJson<AuthSuccess>("/api/signup", payload),
};
