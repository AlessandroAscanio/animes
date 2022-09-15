const title = document.querySelector('[data-js="title"]')
const cardContainer = document.querySelector('[data-js="card-container"]')
const loaderContainer = document.querySelector('[data-js="container-loader"]')
const card = document.querySelector('[data-js="card"]')
const search = document.querySelector('[data-js="formSearch"]')


let page = 0

const getAnimes = async () => {
  const { data } = await dataFetch(
    `https://kitsu.io/api/edge/anime?page[limit]=8&page[offset]=${page}`)
  return data
}

const showCard = async () => {
  const animes = await getAnimes()
  // console.log(animes)
  animes.forEach(anime => {
    const description = anime.attributes.description.slice(0,130)
    const title = anime.attributes.canonicalTitle
    const totalEpisodes = anime.attributes.episodeCount === null ?
      'In Progress': anime.attributes.episodeCount
    const animeImage = anime.attributes.posterImage.small

    const card = `
    <a href="./pages/details.html?id=${anime.id}" target="_blank" ref="next"> 
<div data-id="${anime.id}" data-js="card" class="card">
        <div class="topCard">
          <h2 data-js="title" class="title">${title}</h2>
          <span class="secondText">Total Episodes: ${totalEpisodes} </span>
        </div>
        <div data-js="image" class="mediaCard">
          <img src="${animeImage}" alt="${title}">
        </div>
        <div class="bottomCard">
          <div class="bottomText">
            <span class="secondText">${description}... click on card for details.</span>
          </div>
        </div>
</div>
    </a>
  `
  cardContainer.innerHTML += card
  })  
}

const getNextAnimes = () => {
  page += 8
  showCard()
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getNextAnimes()
  }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoader()
}

window.addEventListener('scroll', () => { 
  const { clientHeight, scrollHeight, scrollTop  } = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

  if (isPageBottomAlmostReached) {
    showLoader()    
  }

})

showCard()

search.addEventListener('input', async e => {

  const inputValue = e.target.value.toLowerCase()
  const cards = document.querySelectorAll('[data-js="card"]')
  
  cards.forEach(card => {
    const title = card.querySelector('[data-js="title"]').textContent.toLowerCase()
    
    if (title.includes(inputValue)){
      card.style.display = 'block'
      return
    }
    
    card.style.display = 'none'
  
  })

  
})


