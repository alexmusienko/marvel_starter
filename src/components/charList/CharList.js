import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CARD_PORTION = 6;

const CharList = (props) => {

    const [selectedId, setSelectedId] = useState(null);
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [charsEnded, setCharsEnded] = useState(false);
    const [needMore, setNeedMore] = useState(true);

    const { loading, error, clearError, getAllCharacters } = useMarvelService();

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    useEffect(() => {
        if (needMore) {
            updateChars();
        }
        // eslint-disable-next-line
    }, [needMore]);

    const onCharsUpdated = (newChars) => {
        const ended = newChars.length < CARD_PORTION;
        setChars(chars => [...chars, ...newChars]);
        setOffset(offset => offset + CARD_PORTION);
        setCharsEnded(ended);
    }

    const onScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setNeedMore(true);
        }
    }

    const updateChars = () => {
        clearError();
        getAllCharacters(CARD_PORTION, offset)
            .then(onCharsUpdated)
            .finally(() => setNeedMore(false));
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
                onClick={() => setNeedMore(true)}
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
            <CSSTransition
                key={char.id}
                classNames='char__item'
                timeout={2000}>
                <li
                    className={classes}
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
            </CSSTransition>
        )
    });

    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {cards}
            </TransitionGroup>
        </ul>
    );

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;