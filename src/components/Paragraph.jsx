import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import './styles/Paragraph.css';
export const Paragraph = () => {
    const BASE_URL = 'https://baconipsum.com/api/?type=meat-and-filler';
    const { data, loading, error } = useFetchData({ BASE_URL });
    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <section className="paragraph">
            <form className="paragraph__options">
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
                        <p className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sequi facilis commodi harum molestiae laudantium autem temporibus fugit facere atque deserunt consectetur non reiciendis ea, quis delectus rem eveniet! Non!
                    </p>
                    }
                </article>
            }
        </section>
    )
}