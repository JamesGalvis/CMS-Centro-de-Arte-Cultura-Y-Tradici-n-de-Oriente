"use client"

import { z } from "zod"
import Image from "next/image"
import { toast } from "sonner"
import { AboutUs } from "@prisma/client"
import { ArrowRightLeft, ImagePlus, Loader2, X } from "lucide-react"
import { ChangeEvent, useEffect, useState, useTransition } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AboutUsSchema } from "@/schemas/about-us"
import { uploadImage } from "@/actions/uploadthing"
import { createAboutUsSection, updateAboutUsSection } from "@/actions/about-us"
import { useAboutUsStore } from "@/stores/about-us"

interface InfoSectionProps {
  data?: AboutUs | null
  className?: string
}

export default function AboutUsPreview({ data, className }: InfoSectionProps) {
  const { setSelectedItem } = useAboutUsStore() // Usar Zustand para cambiar el ítem seleccionado
  const [loading, startTransition] = useTransition()

  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)
  const [isReverse, setIsReverse] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(data?.image || null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (!data) {
      setTitle(undefined)
      setDescription(undefined)
      setIsReverse(false)
      setImageSrc(null)
      setFile(null)
    } else {
      setTitle(data.title)
      setDescription(data.description)
      setIsReverse(data.reverse || false)
      setImageSrc(data.image || null)
    }
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024 // Tamaño máximo de la imagen 4MB
      if (file.size > maxSizeInBytes) {
        setImageSrc(null)
        toast.error(
          "La imagen seleccionada excede el tamaño máximo permitido de 4MB."
        )
        return
      }

      setFile(file)

      const src = URL.createObjectURL(file)
      setImageSrc(src)

      // También actualizar el valor del formulario de react-hook-form
      // form.setValue("image", src)
    }
  }

  const toastMessage = data ? "Sección actualizada" : "Sección creada"

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        let newImage = data?.image
        const infoData: z.infer<typeof AboutUsSchema> = {
          title: title!,
          description: description!,
          reverse: isReverse,
        }

        if (file) {
          const formData = new FormData()
          formData.append("image", file)

          const { success, imageUrl } = await uploadImage(formData)

          if (success && imageUrl) {
            newImage = imageUrl
          }

          if (!success) {
            toast.error("Algo salió mal al subir la imagen.")
          }
        }

        if (!data) {
          creationProcess(infoData, newImage)
        }

        if (data) {
          updateProcess(infoData, newImage!)
        }
      } catch (error) {
        toast.error("Algo salió mal.")
      }
    })
  }

  const creationProcess = async (
    values: z.infer<typeof AboutUsSchema>,
    imageUrl: string | undefined
  ) => {
    try {
      const { success, error } = await createAboutUsSection(values, imageUrl!)

      if (success) {
        toast.success(toastMessage)

        setSelectedItem(values.title)
      }

      if (error) {
        toast.error(error)
      }
    } catch (error) {
      toast.error("Algo salio mal al crear la sección.")
    }
  }

  const updateProcess = async (
    values: z.infer<typeof AboutUsSchema>,
    imageUrl: string
  ) => {
    try {
      const { success, error } = await updateAboutUsSection(
        data?.id!,
        imageUrl,
        values
      )

      if (success) {
        toast.success(toastMessage)
      }

      if (error) {
        toast.error(error)
      }
    } catch (error) {
      toast.error("Algo salió mal en la actualización.")
    }
  }

  return (
    <div
      className={cn(
        "relative sm:grid flex flex-col max-w-screen-xl mx-auto sm:grid-cols-2 grid-cols-1",
        className
      )}
      style={{
        gridTemplateAreas:
          data?.reverse || isReverse ? "'content image'" : "'image content'",
      }}
    >
      {/* Boton de revertir el orden */}
      <div>
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-white text-secondary z-[60]"
          onClick={(e) => {
            e.stopPropagation()
            setIsReverse((prev) => !prev)
          }}
        >
          <ArrowRightLeft
            className={cn(
              "size-4 transition-transform",
              isReverse && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Componente de cambiar imagen */}
      <div
        className={cn(
          "relative [grid-area:image] w-full h-[620px] max-sm:h-[300px]",
          !data && "flex items-center justify-center"
        )}
      >
        {imageSrc && (
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 dark:bg-red-500 rounded-full z-[60]"
            onClick={(e) => {
              e.stopPropagation()
              setFile(null)
              setImageSrc(null)
            }}
          >
            <X className="size-4" />
          </Button>
        )}
        <label
          htmlFor="fileInput"
          className="relative flex items-center justify-center size-full rounded-lg cursor-pointer"
        >
          <div
            className={cn(
              "flex items-center justify-center inset-0 size-full rounded-lg bg-muted-foreground/20 absolute z-[9999]",
              imageSrc && "hidden"
            )}
          >
            <ImagePlus className="size-16 shrink-0" />
          </div>

          <input
            key={imageSrc || "new"} // Cambiar la key cuando la imagen cambia o se crea uno nuevo
            id="fileInput"
            name="file"
            type="file"
            accept="image/*"
            onChange={handleChange}
            hidden
          />

          {imageSrc && (
            <Image
              src={imageSrc}
              alt="image file selected"
              fill
              priority
              className="object-cover size-full rounded-lg"
            />
          )}
        </label>
      </div>

      {/* Seccion de titulo y descripción */}
      <div
        className={cn(
          "[grid-area:content] w-full flex-1 flex items-center justify-center sm:p-12 py-4 md:px-4 px-6",
          data?.reverse && "max-sm:text-right"
        )}
      >
        <div className="lg:w-[70%] md:w-[85%] w-full space-y-4 max-sm:py-4">
          <h2
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setTitle(e.currentTarget.textContent as string)}
            className="text-3xl max-md:text-[26px] font-bold outline-none focus:outline-none border-none"
          >
            {data ? data.title : "Sin titulo"}
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onInput={(e) =>
              setDescription(e.currentTarget.textContent as string)
            }
            className="text-foreground/70 lg:text-lg max-md:text-[15px] outline-none focus:outline-none border-none"
          >
            {data ? data.description : "Sin descripción"}
          </p>
        </div>
      </div>

      {/* Contenedor del boton de envio de información */}
      <div className="flex items-center justify-end mt-2">
        <Button
          disabled={!title || !description || !imageSrc || loading}
          onClick={handleSubmit}
        >
          {loading && <Loader2 className="size-5 animate-spin mr-3" />}
          {!data ? "Crear sección" : "Actualizar información"}
        </Button>
      </div>
    </div>
  )
}
