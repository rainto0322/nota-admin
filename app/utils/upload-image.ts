import dayjs from "dayjs";
export type ImageSelect = {
  name: string,
  base64: string,
  state: number
}

const GenerateImageName = () => {
  const datePart = dayjs().format('YYMMDD')
  const randomPart = Math.random().toString(36).slice(2, 6)
  return `${datePart}-${randomPart}`
}

export const ReadFiles = (files: FileList | File[]): Promise<ImageSelect[]> => {
  return new Promise((resolve, reject) => {
    let completedReads = 0
    const result: Array<ImageSelect> = []
    if (!files || files.length === 0) {
      resolve(result)
      return;
    }
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        result.push({
          name: GenerateImageName(),
          base64: e.target?.result as string,
          state: 0
        })
        completedReads++

        // All files have been read and the Promise has been parsed
        if (completedReads === files.length || completedReads > 5) {
          resolve(result);
        }
      }
      reader.readAsDataURL(file);


    }
  })
}