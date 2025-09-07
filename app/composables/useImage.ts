

// @/composables/useImage.ts
export const useImage = () => {
  const cue = useCue()

  const git_name = useRuntimeConfig().public.git_path
  const git_token = useRuntimeConfig().public.git_token
  const url = (path: string) => {
    return `https://api.gitcode.com/api/v5/repos/${git_name}/${path}?access_token=${git_token}`
  }

  const UploadImage = async (file: ImageSelect) => {
    try {
      const data: any = await $fetch(url(`contents/daily/${file.name}.png`), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": " application/json"
        },
        body: {
          content: file.base64.replace(/^data:image\/\w+;base64,/, ''),
          message: file.name
        }
      })

      if (data) {
        cue.done({ title: `Image ${file.name} upload successful.` })
        return data
      } else {
        throw new Error("Upload failed.");
      }

    } catch (error: any) {
      cue.error({ title: `Image ${file.name} upload successful.` })
      throw new Error(error.message)
    }
  }

  return {
    git_name,
    UploadImage,
  }
}