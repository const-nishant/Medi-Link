// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("isEmailVerified");
};

export const isUserLoggedIn = () => {
  if (localStorage.length === 0) {
    return false;
  }

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const isEmailVerified = localStorage.getItem("isEmailVerified");

  if (isEmailVerified === "true") {
    return true;
  }

  if (!token || !userId || !role || !isEmailVerified) {
    return false;
  }

  return true;
};

export const verifyEmail = async (otp: string) => {
  if (!BASE_URL) {
    throw new Error("Backend URL is not defined");
  }
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/email-verification/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || "Unknown error"}`);
  }
  return response;
};
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

export async function login(email: string, password: string) {
  if (!BASE_URL) {
    throw new Error("Backend URL is not defined");
  }

  const response = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || "Unknown error"}`);
  }

  return response;
}
