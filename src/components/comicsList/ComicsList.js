import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const COMICS_CARD_PORTION = 8;

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [needMore, setNeedMore] = useState(true);
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

    const { loading, error, clearError, getAllComics } = useMarvelService();

    useEffect(() => {
        if (needMore) {
            updateComics();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needMore]);

    const onComicsUpdated = (newComics) => {
        const receiveFullPortion = (newComics.length === COMICS_CARD_PORTION);
        setOffset(offset => offset + COMICS_CARD_PORTION);
        setComics(comics => [...comics, ...newComics]);
        setHasMoreToLoad(receiveFullPortion);
    }

    const updateComics = () => {
        clearError();
        getAllComics(COMICS_CARD_PORTION, offset)
            .then(onComicsUpdated)
            .finally(() => setNeedMore(false));
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = error ? null : <ViewComicsList comics={comics} />

    console.log('render');

    return (
        <div className="comics__list">
            {errorMessage}
            {content}
            {spinner}
            <button className="button button__main button__long"
                disabled={loading}
                style={{ 'display': hasMoreToLoad ? 'block' : 'none' }}
                onClick={() => setNeedMore(true)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ViewComicsList = ({ comics }) => {
    const items = comics && comics.map((comic, i) => (
        <li className="comics__item" key={comic.id*1000000 + i}>
            <a href={comic.homepage}>
                <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" />
                <div className="comics__item-name">{comic.title}</div>
                <div className="comics__item-price">{comic.price.toFixed(2) + '$'}</div>
            </a>
        </li>
    ));

    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

export default ComicsList;