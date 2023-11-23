import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [comics, setComics] = useState(null);

    const { loading, error, clearError, getCharacter, getComicsListByChar } = useMarvelService();

    useEffect(() => {
        onCharUpdate();
        // eslint-disable-next-line
    }, [props.charId]);

    const onCharLoaded = (char, comics) => {
        setChar(char);
        setComics(comics);
    }

    const onCharUpdate = () => {
        const { charId } = props;
        if (!charId) return;
        clearError();
        Promise.all([getCharacter(charId), getComicsListByChar(charId)])
            .then(([char, comics]) => {
                onCharLoaded(char, comics)
            });
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const skeleton = (char || error || loading) ? null : <Skeleton />;
    const content = (!error && !loading && char) ? <ViewCharInfo char={char} comics={comics} /> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {skeleton}
            {content}
        </div>
    )
}

const ViewCharInfo = ({ char, comics }) => {

    let comicsList = [];
    if (comics) {
        comicsList = comics.slice(0, 10).map((item, i) => (
            <li className="char__comics-item" key={i}>
                <Link to={`/comics/${item.id}`}>{item.title}</Link>
            </li>
        ));
    }
    const styleObjectFit = (char.thumbnail.indexOf('image_not_available.jpg') !== -1) ? 'contain' : 'cover';
    const noComicsMessage = comicsList.length ? null : 'There is no comics for this character';

    return (
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt="character's img" style={{ objectFit: styleObjectFit }} />
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
                {noComicsMessage}
            </ul>
        </>
    );
}

export default CharInfo;