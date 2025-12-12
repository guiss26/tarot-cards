const URL_API = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot"

// Método GET 
export async function getAllCards() {
    const response = await fetch(URL_API)
    if (!response.ok) throw new Error('Error al obtener las cartas')
    return response.json()
}

// Método GET/:id
export async function getOneCard(id) {
    try {
        const response = await fetch(`${URL_API}/${id}`)
        if (!response.ok) {
            return null 
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getOneCard:", error)
        return null
    }
}