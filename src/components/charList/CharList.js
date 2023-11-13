import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const CARD_PORTION = 6;

const CharList = (props) => {

    const [selectedId, setSelectedId] = useState(null);
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charsEnded, setCharsEnded] = useState(false);

    const marvelService = useMarvelService();

    useEffect(() => {
        //updateChars();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (loading) {
            updateChars();
        }
        // eslint-disable-next-line
    }, [loading]);

    const onCharsUpdated = (newChars) => {
        const ended = newChars.length < CARD_PORTION;
        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setError(false);
        setOffset(offset => offset + CARD_PORTION);
        setCharsEnded(ended);
    }

    const onCharsLoading = () => {
        setLoading(true);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onScroll = () => {
        //if (loading) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setLoading(true);
        }
    }

    const updateChars = () => {
        onCharsLoading();
        marvelService.getAllCharacters(CARD_PORTION, offset)
            .then(onCharsUpdated)
            .catch(onError)
            .finally(() => setLoading(false));
    }

    const onCharClick = (id) => {
        setSelectedId(id)
        props.onCharSelected(id);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !error ? <ViewCharList chars={chars} selectedId={selectedId} onCharSelected={onCharClick} /> : null;

    return (
        <div className="char__list" >
            {errorMessage}
            {content}
            {spinner}
            <button className="button button__main button__long"
                onClick={() => setLoading(true)}
                disabled={loading}
                style={{ 'display': charsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ViewCharList = ({ chars, selectedId, onCharSelected }) => {
    const cards = chars.map(char => {
        const classes = (char.id === selectedId) ? 'char__item char__item_selected' : 'char__item';
        const styleObjectFit = (char.thumbnail.indexOf('image_not_available.jpg') !== -1) ? 'contain' : 'cover';
        return (
            <li
                className={classes}
                key={char.id}
                onClick={() => onCharSelected(char.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        onCharSelected(char.id);
                    }
                }}>
                <img src={char.thumbnail} alt="abyss" style={{ objectFit: styleObjectFit }} />
                <div className="char__name">{char.name}</div>
            </li>
        )
    });

    return (
        <ul className="char__grid">
            {cards}
        </ul>
    );

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;