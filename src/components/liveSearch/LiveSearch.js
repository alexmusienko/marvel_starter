import { useEffect, useState } from 'react';
import './liveSearch.scss';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const onFocus = (e) => {
    document.querySelector('.liveSearch__fog').classList.remove('liveSearch__fog_hide');
    document.querySelector('.liveSearch').classList.add('liveSearch_active');
}

const onBlur = (e) => {
    document.querySelector('.liveSearch__fog').classList.add('liveSearch__fog_hide');
    document.querySelector('.liveSearch').classList.remove('liveSearch_active');
}

const LiveSearch = () => {

    const [text, setText] = useState('');
    const [chars, setChars] = useState([]);

    const { getCharactersByName } = useMarvelService();

    useEffect(() => {
        document.querySelector('.liveSearch__name').addEventListener("focus", onFocus);
        document.querySelector('.liveSearch__name').addEventListener("blur", onBlur);
        return () => {
            document.querySelector('.liveSearch__name')?.removeEventListener("focus", onFocus);
            document.querySelector('.liveSearch__name')?.removeEventListener("blur", onBlur);
        }
    }, []);

    const onChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        doSearch(newText);
    }

    const doSearch = (name) => {
        if (name === '') {
            setChars([]);
        } else {
            getCharactersByName(name)
                .then(setChars);
        }
    }

    const viewChars = chars.map(char => (
        <>
            <hr />
            <li key={char.id}>
                <Link className='liveSearch__item' to={`/chars/${char.id}`}>
                    <img className='liveSearch__item-img' src={char.thumbnail} alt="char" />
                    <p className='liveSearch__item-name'>{char.name}</p>
                </Link>
            </li>
        </>

    ))

    return (
        <div className='liveSearchWrapper'>
            <div className='liveSearch'>
                <input
                    className='liveSearch__name'
                    id="liveSearchName"
                    name="liveSearchName"
                    placeholder='Enter start of name'
                    autoComplete='off'
                    onChange={onChange}
                    value={text} />
                <ul className="liveSearch__results">
                    {viewChars}
                </ul>
                <div className='liveSearch__fog liveSearch__fog_hide'></div>
            </div>
        </div>
    );


};

export default LiveSearch;