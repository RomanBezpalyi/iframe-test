"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function submitUrl(formData: FormData) {
  const url = formData.get("url") as string

  if (url) {
    // Set the URL in a cookie
    const cookieStore = await cookies()
    cookieStore.set("iframe-url", url, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  }

  // Revalidate the page to show the new URL
  revalidatePath("/")
}

export async function clearUrl() {
  const cookieStore = await cookies()
  cookieStore.delete("iframe-url")
  revalidatePath("/")
}
