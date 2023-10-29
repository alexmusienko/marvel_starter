import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        comics: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onCharUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.onCharUpdate();
        }
    }

    onCharLoaded = (char, comics) => {
        this.setState({
            char: char,
            comics: comics,
            loading: false,
            error: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        });
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    onCharUpdate = () => {
        const { charId } = this.props;
        if (!charId) return;
        this.onCharLoading();
        Promise.all([this.marvelService.getCharacter(charId), this.marvelService.getComicsListByChar(charId)])
            .then(([char, comics]) => this.onCharLoaded(char, comics))
            .catch(this.onError);
    }

    render = () => {
        const { char, comics, loading, error } = this.state;
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
}

const ViewCharInfo = ({ char, comics }) => {

    const comicsList = comics.slice(0, 10).map((item, i) => (
        <li className="char__comics-item" key={i}>
            <a href={item.url}>{item.title}</a>
        </li>
    ));
    const styleObjectFit = (char.thumbnail.indexOf('image_not_available.jpg') !== -1) ? 'contain' : 'cover';
    const noComicsMessage = comicsList.length ? null : 'There is no comics for this character';

    return (
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt="character's img" style={{objectFit: styleObjectFit}} />
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