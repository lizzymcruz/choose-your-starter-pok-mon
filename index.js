import { pokemonStarters} from '/data.js'

const pokemonRadios = document.getElementById("pokemon-radios")
const showSprite = document.getElementById("show-sprite")
const pokemonRevealModal = document.getElementById("pokemon-reveal-modal")
const pokemonModalInner = document.getElementById("pokemon-modal-inner")
const chooseBtn = document.getElementById("choose-btn")
const closeBtn = document.getElementById("pokemon-close-btn")
const pokemonRegisterModal = document.getElementById("register-modal")
const registerForm = document.getElementById("register-form")
const registerModalInner = document.getElementById("modal-inner")
const trainerNameHeading = document.getElementById("trainerName-span")
const choosePokemon = document.getElementById("choose-pokemon")


chooseBtn.addEventListener('click', renderPokemon)

closeBtn.addEventListener('click', closeModal)

setTimeout(function(){
    pokemonRegisterModal.style.display = "flex"
}, 1500)

registerForm.addEventListener('submit', function(e){
    e.preventDefault()

    const registerFormData = new FormData(registerForm)
    const trainerName = registerFormData.get("trainerName")
    trainerNameHeading.textContent = `${trainerName}`

    registerModalInner.innerHTML = `
    <div class="modal-inner-loading">
        <img src="assets/red-and-pikachu-walking-pokemon-yellow.gif" class="loading">
        <p id="loading-text">Ok... so your name is <span class="add-color">${trainerName}</span></p>
    </div>`

    setTimeout(function(){
        document.getElementById("loading-text").textContent = `A fine name that is...`
    }, 1500)

    setTimeout(function(){
        document.getElementById("loading-text").textContent = `${trainerName} are you ready?`
    }, 3000)

    setTimeout(function(){
        document.getElementById("loading-text").innerHTML = `Then let's <span class="add-color">START!</span>`
    }, 4500)

    setTimeout(function(){
        choosePokemon.style.display = "flex"
        pokemonRegisterModal.style.display = "none"

    }, 6000)

}
)


function closeModal(){
    pokemonRevealModal.style.display = "none"
    choosePokemon.style.display = "flex"
}

function renderPokemon(){
    const pokemonObject = getSinglePokemonObject()
    const isSprite = showSprite.checked
    if (isSprite){
        pokemonModalInner.innerHTML = `
        <div class="pokemon-info">
            <div class="first-section">
                <div class="poke-image">
                <img class="pokemon" src="${pokemonObject.pokeImage}">
                </div>
                <div class="poke-info-inner">
                    <div class="poke-info-title">
                        <div class="poke-number">
                            <div class="pokenum-inner">
                                <img src="assets/8_bit_pokeball.png">
                                <p>#${pokemonObject.pokeNum}</p>
                            </div>
                            <p>${pokemonObject.pokeName}</p>
                        </div>
                        <p class="poke-title">${pokemonObject.pokeTitle}</p>
                    </div>
                    <div class="poke-stats">
                        <div class="sprite">
                            <img src="${pokemonObject.pokeTypeImg}">
                            <img class="poke-sprite" src="${pokemonObject.pokeSprite}">
                        </div>
                        <div class="height-weight">
                            <div class="height">
                                <p>Height</p>
                                <div class="stats">
                                    <p>${pokemonObject.pokeHeight[0]}</p>
                                    <p>${pokemonObject.pokeHeight[1]}</p>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div class="weight">
                                <p>Weight</p>
                                <div class="stats">
                                    <p>${pokemonObject.pokeWeight[0]}</p>
                                    <p>${pokemonObject.pokeWeight[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="poke-desc">
                <p>${pokemonObject.pokeDesc}</p>
            </div>
        </div>`
    }
    else{
        pokemonModalInner.innerHTML = `
        <div class="pokemon-info">
            <div class="first-section">
                <div class="poke-image">
                <img class="pokemon" src="${pokemonObject.pokeImage}">
                </div>
                <div class="poke-info-inner">
                    <div class="poke-info-title">
                        <div class="poke-number">
                            <div class="pokenum-inner">
                                <img src="assets/8_bit_pokeball.png">
                                <p>#${pokemonObject.pokeNum}</p>
                            </div>
                            <p>${pokemonObject.pokeName}</p>
                        </div>
                        <p class="poke-title">${pokemonObject.pokeTitle}</p>
                    </div>
                    <div class="poke-stats">
                        <div class="sprite">
                            <img src="${pokemonObject.pokeTypeImg}">
                            
                        </div>
                        <div class="height-weight">
                            <div class="height">
                                <p>Height</p>
                                <div class="stats">
                                    <p>${pokemonObject.pokeHeight[0]}</p>
                                    <p>${pokemonObject.pokeHeight[1]}</p>
                                </div>
                            </div>
                            <div class="divider"></div>
                            <div class="weight">
                                <p>Weight</p>
                                <div class="stats">
                                    <p>${pokemonObject.pokeWeight[0]}</p>
                                    <p>${pokemonObject.pokeWeight[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="poke-desc">
                <p>${pokemonObject.pokeDesc}</p>
            </div>
        </div>`
    }
    pokemonRevealModal.style.display = 'flex'
    choosePokemon.style.display = "none"

}

function getSinglePokemonObject(){
    const pokemonArray = getMatchingPokemonStarterArray()
    const randomNumber = Math.floor(Math.random() * pokemonArray.length)
        return pokemonArray[randomNumber]
}

function getMatchingPokemonStarterArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedType = document.querySelector('input[type="radio"]:checked').value
        const isSprite = showSprite.checked

        const matchingPokemonStarterArray = pokemonStarters.filter(function(pokestarter){
            if(isSprite){
                return pokestarter.pokeType.includes(selectedType) && pokestarter.isSprite
            }
            else{
                return pokestarter.pokeType.includes(selectedType)
            }
        })
        return matchingPokemonStarterArray
        
    }
}


function getPokemonStarterArray(pokestarters){
    const pokemonStarterArray = []
    for (let pokestarter of pokestarters){
        for (let poketype of pokestarter.pokeType){
            if(!pokemonStarterArray.includes(poketype)){
                pokemonStarterArray.push(poketype)
            }
        }
    }
    return pokemonStarterArray
}


function renderPokemonRadios(pokestarters){
    let radioItems = ''
    const poketypes = getPokemonStarterArray(pokestarters)
    for (let poketype of poketypes){
        radioItems +=`
                    <div id="radio" class="radio">
                        <label for="${poketype}">
                        <div class="inside-radio">
                        <img src="assets/8_bit_pokeball.png">
                        <p>${poketype}</p>
                        </div>
                        </label>
                        <input type="radio" id="${poketype}" value="${poketype}" name="poketype">
                    </div>
                    `
    }
    pokemonRadios.innerHTML = radioItems
}

renderPokemonRadios(pokemonStarters)


