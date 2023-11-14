import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=66d36fc3f95c968ef9197993d2061521';

    const getAllCharacters = async (limit, offset) => {
        if (!limit) limit = 6;
        if (!offset) offset = 0;
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        const chars = res.data.results.map(item => _transformCharacter(item));
        return chars;
    }

    const getAllComics = async (limit, offset) => {
        if (!limit) limit = 8;
        if (!offset) offset = 0;
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
        const comics = res.data.results.map(item => _transformComic(item));
        return comics;
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getComicsListByChar = async (id) => {
        const res = await request(`${_apiBase}characters/${id}/comics?${_apiKey}`);
        return res.data.results.map(item => {
            return {
                title: item.title,
                url: item.urls.filter(item => item.type === 'detail')[0].url
            }
        });
    }

    const _transformCharacter = (char) => {
        let homepage = null;
        let wiki = null;
        char.urls.forEach(item => {
            switch (item.type) {
                case 'detail':
                    homepage = item.url;
                    break;
                case 'wiki':
                    wiki = item.url;
                    break;
                default: { }
            }
        });
        if (char.description.length === 0)
            char.description = 'There is no description about this character.';
        else if (char.description.length > 225)
            char.description = char.description.substr(0, 225) + '...';

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: homepage,
            wiki: wiki
        };
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            homepage: comic.urls.find(item => item.type === 'detail')?.url,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices.find(item => item.type === 'printPrice')?.price || 0,
            pageCount: comic.pageCount,
            language: comic.textObjects[0]?.language
        }
    }

    return { loading, error, clearError, getAllCharacters, getAllComics, getCharacter, getComic, getComicsListByChar };

}

export default useMarvelService;