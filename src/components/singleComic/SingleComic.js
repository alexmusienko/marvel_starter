import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const SingleComic = (props) => {

    const [comic, setComic] = useState(null);

    const { loading, error, clearError, getComic } = useMarvelService();

    useEffect(() => {
        updateComic(props.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const updateComic = (id) => {
        clearError();
        getComic(id)
            .then(setComic);
    }

    const viewContent = (comic) => {
        const homepageBtn = comic.homepage ?
            (
                <a href={comic.homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
            ) : null;

        return (
            <div className="single-comic">
                <img src={comic.thumbnail} alt={comic.title} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">{comic.pages}</p>
                    <p className="single-comic__descr">Language: {comic.language}</p>
                    <div className="single-comic__price">{comic.price.toFixed(2) + '$'}</div>
                    {homepageBtn}
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        );
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = (loading || error || !comic) ? null : viewContent(comic);

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleComic;