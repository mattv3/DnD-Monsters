async function fetchData() {
    const monsterName = document.querySelector('.monsterName').value.toLowerCase()

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`)

        if(!response.ok) {
            throw new Error('Could not fetch response')
        }
        const data = await response.json()

        // Set monster image
        const monsterImage = `https://www.dnd5eapi.co${data.image}`
        document.querySelector('.monsterImg').src = monsterImage

        // Populate list items
        document.querySelectorAll('#monsterInfo li').forEach(li => {
            const key = li.dataset.key
            li.innerText = data[key]
        })

    }
    catch(error) {
        console.error(error)
    }
}



