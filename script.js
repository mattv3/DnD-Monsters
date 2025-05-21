async function fetchData() {
    const monsterName = document.querySelector('.monsterName').value.toLowerCase()

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`)

        if(!response.ok) {
            throw new Error('Could not fetch response')
        }
        const data = await response.json()
        console.log(data)
        // Set monster image
        const monsterImage = `https://www.dnd5eapi.co${data.image}`
        document.querySelector('.monsterImg').src = monsterImage

        // Populate list items
        document.querySelectorAll('#monsterInfo li').forEach(li => {
            const key = li.dataset.key
            // li.innerText = data[key]
            const value = data[key]

            if(value) {
            // Capitalize string values (skip numbers)
            const capValue = typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value
            // Add prefix label (capitalize the key and replace _ with space
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            li.innerText = `${label}: ${capValue}`
            }else{
            li.innerText = `Missing: ${key}`
            }
        })

        // Monster Abilities
        // Clear previous abilities
        const abilitiesList = document.querySelector('.monsterAbilities')
        abilitiesList.innerHTML = '' // Clear old entries

        // Check if there are any abilties
        if (Array.isArray(data.special_abilities)) {
            data.special_abilities.forEach(ability => {
                const abilityItem = document.createElement('li')
                abilityItem.innerText = `${ability.name}: ${ability.desc}`
                abilitiesList.appendChild(abilityItem)
            })
        }else {
            const noAbilities = document.createElement('li')
            noAbilities.innerText = 'No special abilities.'
            abilitiesList.appendChild(noAbilities)
        }

    }
    catch(error) {
        console.error(error)
    }
}



