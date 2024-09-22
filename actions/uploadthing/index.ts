"use server"

import { FileEsque, UploadFileResult } from "uploadthing/types"
import { utapi } from "./uploadthing"
import { formatUrl } from "@/utils/url-formatter"

export async function uploadImage(formData: FormData) {
  try {
    const files = formData
      .getAll("image")
      .filter((value) => value) as FileEsque[]
    const imageFile = files[0]

    const response: UploadFileResult = await utapi.uploadFiles(imageFile)

    if (response.data) {
      return { success: true, imageUrl: response.data.url }
    }

    return { success: false, imageUrl: null }
  } catch (error) {
    return { success: false, imageUrl: null }
  }
}

export async function deleteImage(fileUrl: string) {
  try {
    const formatedUrl = formatUrl(fileUrl)
    const response = await utapi.deleteFiles(formatedUrl)
    return response.success
  } catch (error) {
    console.log("Error al eliminar la imagen")
  }
}
