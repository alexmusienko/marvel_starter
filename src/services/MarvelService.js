class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=66d36fc3f95c968ef9197993d2061521';

    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}. Status: ${res.status} - ${res.statusText}`);
        }
        return await res.json();
    }

    getAllCharacters = async (limit, offset) => {
        if (!limit) limit = 9;
        if (!offset) offset = 0;
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        const chars = res.data.results.map(item => this._transformCharacter(item));
        return chars;
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    getComicsListByChar = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}/comics?${this._apiKey}`);
        return res.data.results.map(item => {
            return {
                title: item.title,
                url: item.urls.filter(item => item.type === 'detail')[0].url
            }
        });
    }

    _transformCharacter = (char) => {
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


}

export default MarvelService;