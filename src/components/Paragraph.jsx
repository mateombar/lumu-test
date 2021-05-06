import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import './styles/Paragraph.css';
export const Paragraph = () => {
    const [BASE_URL, setBASE_URL] = useState('https://baconipsum.com/api/?type=all-meat');
    const { data, loading, error } = useFetchData({ BASE_URL });
    const handleSubmitForm = (event) => {
        event.preventDefault();
        setBASE_URL('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1');

    }
    return (
        <section className="paragraph">
            <form onSubmit={handleSubmitForm} className="paragraph__options">
                <div className="options__form">
                    <label># PARAGRAPHS: </label>
                    <input className="input__number" type="number" />
                </div>
                <div className="options__form">
                    <label>STARTS WITH LOREM: </label>
                    <input className="input__check" type="checkbox" name="lorem" id="lorem" />
                </div>
                <div className="options__form">
                    <button className="input__button" type="submit">GENERATE!</button>
                </div>
            </form>
            {error ?
                <article className="paragraph__text ">
                    <p className="text--error">
                        {error}
                    </p>

                </article>
                :
                <article className="paragraph__text">
                    {loading ?
                        <p className="text">Loading...</p>
                        :
                        <>
                            {
                                data.map((p, index) => (
                                    <p key={index} className="text">
                                        {p}
                                    </p>
                                ))
                            }
                        </>
                    }
                </article>
            }
        </section>
    )
}