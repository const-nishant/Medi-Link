// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Update to your backend URL

export async function signUp(
  name: string,
  email: string,
  password: string,
  role: string
) {
  if (!BASE_URL) {
    throw new Error("Backend URL is not defined");
  }

  const response = await fetch(`${BASE_URL}/api/v1/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || "Unknown error"}`);
  }

  return response;
}
