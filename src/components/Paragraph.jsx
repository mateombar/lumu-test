import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { useInputValue } from '../hooks/useInputValue';
import './styles/Paragraph.css';
export const Paragraph = ({ onSubmitData }) => {
    const [BASE_URL, setBASE_URL] = useState('https://baconipsum.com/api/?type=all-meat');
    const { data, loading, error } = useFetchData({ BASE_URL });
    const nParagraphs = useInputValue(1)
    const startLorem = useInputValue(0)
    useEffect(() => {
        onSubmitData({data});
    }, [data])
    const handleSubmitForm = (event) => {
        event.preventDefault();
        const lorem = !startLorem.value || 0 ? 0 : 1;
        setBASE_URL(`https://baconipsum.com/api/?type=all-meat&paras=${nParagraphs.value}&start-with-lorem=${lorem}`);
    }
    return (
        <section className="paragraph">
            <form onSubmit={handleSubmitForm} className="paragraph__options">
                <div className="options__form">
                    <label htmlFor="n_paragraphs"># PARAGRAPHS: </label>
                    <input className="input__number" min="0" type="number" name="n_paragraphs" {...nParagraphs} disabled={loading} />
                </div>
                <div className="options__form">
                    <label htmlFor="lorem">STARTS WITH LOREM: </label>
                    <input className="input__check" type="checkbox" name="lorem" id="lorem" {...startLorem} disabled={loading} />
                </div>
                <div className="options__form">
                    <button className="input__button" type="submit" disabled={loading}>GENERATE!</button>
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