import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService"
import './singleChar.scss'
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleChar = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar(props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const updateChar = (id) => {
        clearError();
        getCharacter(id)
            .then(setChar);
    }

    const viewContent = (char) => {
        const homepageBtn = char.homepage ?
            (
                <a href={char.homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
            ) : null;

        return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Char info"
                    />
                    <title>Marvel information portal - {char.name}</title>
                </Helmet>
                <div className="single-char">
                    <img src={char.thumbnail} alt={char.name} className="single-char__img" />
                    <div className="single-char__info">
                        <h2 className="single-char__name">{char.name}</h2>
                        <p className="single-char__descr">{char.description}</p>
                        {homepageBtn}
                    </div>
                    <Link to="/" className="single-char__back">Back to all</Link>
                </div>
            </>
        );
    }    
    
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = (!loading && !error && char) ? viewContent(char) : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleChar;