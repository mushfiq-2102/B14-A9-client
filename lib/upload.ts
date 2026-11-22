// Uploads an image file to imgbb and returns the hosted image URL.
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("image", file)

  const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`

  const res = await fetch(imgbbAPI, {
    method: "POST",
    body: formData,
  })

  const result = await res.json()
  if (!result?.data?.url) {
    throw new Error("Image upload failed")
  }
  return result.data.url as string
}
