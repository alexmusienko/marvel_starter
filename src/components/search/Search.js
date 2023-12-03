import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './search.scss';
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

const Search = () => {

    const [searchResult, setSearchResult] = useState({
        char: null,
        code: 0
    })

    const { loading, getCharacterByName } = useMarvelService();

    const doSearch = async (values) => {
        const char = await getCharacterByName(values.name);
        if (char) {
            setSearchResult({
                char,
                code: 1
            })
        } else {
            setSearchResult({
                char: null,
                code: -1
            })
        }
    }

    const viewSearchResult = (searchResult) => {
        switch (searchResult.code) {
            case 1:
                return (
                    <div className="search__good" >
                        <div className="search__message">There is! Visit {searchResult.char.name} page?</div>
                        <a href={`/chars/${searchResult.char.id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </a>
                    </div>
                );
            case -1:
                return (
                    <div className="search__error">
                        <div className="search__message">The character was not found. Check the name and try again</div>
                    </div>
                );
            default:
                return null;
        }
    }

    const spinner = loading ? <Spinner /> : null;
    const content = loading ? null : viewSearchResult(searchResult);

    return (
        <div className="search">
            <div className="search__title">Or find a character by name:</div>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Minimum 2 symbols')
                        .required('This field is required')
                })}
                onSubmit={doSearch}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="search__form">
                            <Field className="search__field" id="name" name="name" type="text" placeholder="Enter name" />
                            <button className="button button__main" type='submit' disabled={isSubmitting} >
                                <div className="inner">Find</div>
                            </button>
                        </div>
                        <ErrorMessage name='name' component='div' className="search__error search__message" />
                        {spinner}
                        {content}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Search;