async function fetchData() {
    const monsterName = document.querySelector('.monsterName').value.toLowerCase()

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`)

        if(!response.ok) {
            throw new Error('Could not fetch response')
        }
        const data = await response.json()
        console.log(data)
        const monsterImage = `https://www.dnd5eapi.co${data.image}`
        console.log(monsterImage)
        const imgElement = document.querySelector('.monsterImg')
        const nameMonster = document.querySelector('.nameMonster')
        const monsterHP = document.querySelector('.monsterHP')
        const monsterSize = document.querySelector('.monsterSize')
        const monsterType = document.querySelector('.monsterType')
        const monsterAlign = document.querySelector('.monsterAlign')
        
        imgElement.src = monsterImage
        nameMonster.innerText = data.name
        monsterHP.innerText = data.hit_points
        monsterSize.innerText = data.size
        monsterType.innerText = data.type
        monsterAlign.innerText = data.alignment
    }
    catch(error) {
        console.error(error)
    }
}

