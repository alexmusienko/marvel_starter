import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const COMICS_CARD_PORTION = 8;

const ComicsList = () => {

    const offsetSS = +sessionStorage.getItem('offset');
    const jsonComicsSS = sessionStorage.getItem('comics');
    const comicsSS = jsonComicsSS ? JSON.parse(jsonComicsSS) : [];

    const [comics, setComics] = useState(comicsSS);
    const [offset, setOffset] = useState(offsetSS ?? 0);
    const [needMore, setNeedMore] = useState(comicsSS.length === 0);
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

    const { loading, error, clearError, getAllComics } = useMarvelService();

    useEffect(() => {
        if (needMore) {
            updateComics();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needMore]);

    useEffect(() => {
        restoreScrollPosition();
    }, []);

    const restoreScrollPosition = () => {
        const pos = +sessionStorage.getItem('scrollPosition');
        if (pos) {
            //window.scrollTo({ top: pos - window.scrollY, behavior: 'smooth' });
            window.scrollTo(0, pos);
        }
    }

    const onComicsUpdated = (newComics) => {
        const receiveFullPortion = (newComics.length === COMICS_CARD_PORTION);
        setOffset(offset => {
            const resultOffset = offset + COMICS_CARD_PORTION;
            sessionStorage.setItem('offset', resultOffset);
            return resultOffset;
        });
        setComics(comics => {
            const resultComics = [...comics, ...newComics];
            sessionStorage.setItem('comics', JSON.stringify(resultComics));
            return resultComics;
        });

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

    const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    }

    const items = comics && comics.map((comic, i) => (
        <motion.li
            className="comics__item"
            key={comic.id * 1000000 + i}
            initial={{ opacity: 0, filter: 'grayscale(1)' }}
            animate={{ opacity: 1, filter: 'grayscale(0)' }}
            transition={{ delay: (i % COMICS_CARD_PORTION) * 0.2 }}>
            <Link to={`/comics/${comic.id}`} onClick={saveScrollPosition}>
                <img
                    src={comic.thumbnail}
                    alt={comic.title}
                    className="comics__item-img"
                    initial={{ opacity: 0, filter: 'grayscale(1)' }}
                    animate={{ opacity: 1, filter: 'grayscale(0)' }}
                    transition={{ delay: 0.2 }}/>
                <div className="comics__item-name">{comic.title}</div>
                <div className="comics__item-price">{comic.price.toFixed(2) + '$'}</div>
            </Link>
        </motion.li>
    ));

    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

export default ComicsList;