type Pet = {
  id?: number,
  category?: {
    id: number,
    name: string,
  },
  name?: string,
  photoUrls?: string[],
  tags?: Object[],
  status?: string
}

const getData = async (): Promise<void> => {
  const rawData: Response = await fetch('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available');
  const data: Pet = await rawData.json();
  console.log(data)
}

getData()
