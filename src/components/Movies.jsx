import icoCamera from "../assets/img/film-camera.svg";

// eslint-disable-next-line react/prop-types
function MoviesResult({movies}) {
    return (

        <div className={'row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 justify-content-center'}>
            {/* eslint-disable-next-line react/prop-types */}
            {movies.map(movie => (
                <div key={movie.id} className="col">
                    <div className="card h-100">
                        {
                            movie.poster !== 'N/A'
                                ? <img src={movie.poster} className="card-img-top" alt={movie.title}/>
                                : <img src={icoCamera} className={'ico-camera ps-2 pb-3 mx-auto mt-5 pt-5'}
                                       alt="ico film camera"/>
                        }
                        <div className="card-body">
                            <h6 className="card-title">{movie.title}</h6>
                            <p className="card-text">Año {movie.year}.</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function NoMoviesResult() {
    return (
        <div className="card col-md-6 mx-auto py-3">
            <img src={icoCamera} className="ico-camera d-block card-img-top mx-auto"
                 alt="ico film camera"/>
            <div className="card-body">
                <h5 className="card-title">No results</h5>
                <p className="card-text">
                    No se encontraron resultados para la búsqueda realizada
                </p>
            </div>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export function Movies({movies}) {
    // eslint-disable-next-line react/prop-types
    const hasMovies = movies?.length > 0
    return (
        hasMovies
            ? <MoviesResult movies={movies}/>
            : <NoMoviesResult/>
    )
}