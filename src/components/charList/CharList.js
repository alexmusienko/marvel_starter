import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CARD_PORTION = 6;

class CharList extends Component {


    state = {
        selectedId: null,
        chars: [],
        loading: true,
        error: false,
        offset: 0,
        charsEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateChars);
    }

    onCharsUpdated = (newChars) => {
        const ended = newChars.length < CARD_PORTION;
        this.setState((state) =>
        ({
            chars: [...state.chars, ...newChars],
            loading: false,
            error: false,
            offset: state.offset + CARD_PORTION,
            charsEnded: ended
        }));
    }

    onCharsLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onScroll = () => {
        if (this.state.loading) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.updateChars();
        }
    }

    updateChars = () => {
        this.onCharsLoading();
        this.marvelService.getAllCharacters(CARD_PORTION, this.state.offset)
            .then(this.onCharsUpdated)
            .catch(this.onError);
    }

    onCharClick = (id) => {
        this.setState({
            selectedId: id
        })
        this.props.onCharSelected(id);
    }

    render = () => {
        const { selectedId, chars, loading, error, charsEnded } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !error ? <ViewCharList chars={chars} selectedId={selectedId} onCharSelected={this.onCharClick} /> : null;

        return (
            <div className="char__list" >
                {errorMessage}
                {content}
                {spinner}
                <button className="button button__main button__long"
                    onClick={this.updateChars}
                    disabled={loading}
                    style={{'display': charsEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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