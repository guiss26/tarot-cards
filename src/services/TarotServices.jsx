//TarotServices.jsx
const URL_API = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot"

// Método GET para el READ
export async function getAllCards() {
    const response = await fetch(URL_API)//petición HTTP get a la URL de la API, espera a que llegue la respuesta antes de continuar y en response guarda la respuesta que devuelve el servidor 
    if (!response.ok) throw new Error('Error al obtener las cartas')
    return response.json()
}

export async function getOneCard(id) {
    // const response = await fetch(`${URL_API}/${id}`)
    // if (!response.ok) throw new Error('Error al obtener la carta')
    // return response.json()

    try {
        const response = await fetch(`${URL_API}/${id}`)
        if (!response.ok) {
            return null //null si no existe
        }

        return await response.json()
    } catch (error) {
        console.error("Error en getOneCard:", error)
        return null
    }
}