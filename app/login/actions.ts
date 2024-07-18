"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (user.username === "admin" && user.password === "admin") {
    cookies().set("admin", "true");
    return true;
  } else {
    return false;
  }
}
