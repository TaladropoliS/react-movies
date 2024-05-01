const API_KEY = '900f7056'
// const API_KEY = '900f7057' // API KEY incorrecta
// const URL = https://www.omdbapi.com/?apikey=900f7056&s&s=Batman // URL para probar la API

export const searchMovies = async ({search}) => {
    if (search === '') return null
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search // se usa el Search porque es el nombre del array que devuelve la API
        const errorSearchMovies = json.Error

        if (movies) {
            return movies.map(movie => ({
                id: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster
            }))
        }
        if (errorSearchMovies) {
            return {errorSearchMovies: errorSearchMovies}
        }
    } catch (e) {
        throw new Error('Error al buscar las películas')
    }
}