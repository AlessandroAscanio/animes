const animeTitle = document.querySelector('[data-detais="title"]')
const animeImg = document.querySelector('[data-details="image"]')
const animeDescription = document.querySelector('[data-details="description"]')

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

const getAnimeDetails = async id => {
  const { data } =  await dataFetch(`https://kitsu.io/api/edge/anime/${id}`)
  return data
}

const insertElementsIntoDOM = (title,animeImage,description) => {
  animeTitle.textContent = title
  animeImg.innerHTML = `<img src="${animeImage}" alt="${title}">` 
  animeDescription.textContent = description
}

const showAnimeDetails = async () => {
  const animeDetail = await getAnimeDetails(id)

  const title = animeDetail.attributes.canonicalTitle
  const animeImage = animeDetail.attributes.posterImage.small
  const description = animeDetail.attributes.description
  console.log(title, animeImage, description)

  insertElementsIntoDOM(title,animeImage,description)
}

showAnimeDetails()