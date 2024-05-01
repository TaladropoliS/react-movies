import icoCamera from './assets/img/film-camera.svg'
import './App.css'
import {useMovies} from "./hooks/useMovies.js";
import {Movies} from "./components/Movies.jsx";
import {useCallback, useEffect, useState} from "react";
import debounce from "just-debounce-it";

function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    useEffect(() => {
        if (search.length < 3) {
            setError('Ingresar 2 o más caracteres para comenzar la búsqueda.')
            return
        }
        if (search.startsWith(' ') || search.endsWith(' ')) {
            setError('No se permiten espacios en blanco al inicio o al final de la búsqueda.')
            return
        }
        setError(null)
    }, [search]);
    return {search, updateSearch, error}
}

function App() {
    const [sort, setSort] = useState(false)
    const {search, updateSearch, error} = useSearch()
    const {movies, loading, errorMovies, getMovies} = useMovies({search, sort})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceGetMovies = useCallback(
        debounce(search => {
            getMovies({search})
        }, 400),
        [getMovies]
    )

    const handleSubmit = (e) => { // recupera todos los datos del formulario
        e.preventDefault()
        getMovies({search})
    }

    const handleSort = () => {
        setSort(!sort)
    }

    const handleChange = (e) => {
        const newSearch = e.target.value
        updateSearch(newSearch)
        debounceGetMovies(newSearch)
    }

    const handleClear = () => {
        updateSearch('')
    }

    return (
        <main className={'container-fluid text-center pt-3 pb-5'}>
            <header className={'col-sm-8 col-md-6 mx-auto py-3'}>
                <h1 className={'text-center'}>
                    Search Movies
                    <img src={icoCamera} className={'ico-camera ps-2 pb-3'} alt="ico film camera"/>
                </h1>
                <form onSubmit={handleSubmit}
                      className={'d-block d-sm-flex justify-content-center align-content-center'}>
                    <div className="form-floating py-2 pe-2 col-9">
                        <input onChange={handleChange} value={search}
                               type="text" className="form-control" name='name' id="filmInput" placeholder="..."/>
                        <label className={'ps-4'} htmlFor="filmInput">Movie name</label>
                    </div>
                    <div className={`form-check form-switch pt-sm-4 pe-sm-2 d-flex
                    ${(movies && (!movies.error && !errorMovies && !loading)) ? 'd-block' : 'd-none'}`}>
                        <input onChange={handleSort} checked={sort} className="form-check-input" type="checkbox"
                               role="switch" id="orderCheck"/>
                        <label className="form-check-label" htmlFor="orderCheck">&nbsp;Order</label>
                    </div>

                    <div className={'text-end pe-5 col-2 align-content-center text-center'}>
                        <button type="submit" className="btn btn-sm btn-outline-primary mb-1"
                                disabled={search.length < 3 || error}
                        >Search
                        </button>
                        <button onClick={handleClear} type="reset" className="btn btn-sm btn-outline-primary"
                                disabled={search.length < 1}
                        >Clear
                        </button>
                    </div>
                </form>
                {error && <small className={'text-info'}>{error}</small>}
            </header>
            <section>
                {
                    loading
                        ? <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : movies && < Movies movies={movies}/>
                }
                {
                    errorMovies && <small className={'text-danger'}>{errorMovies}</small>
                }
            </section>
        </main>
    )
}

export default App