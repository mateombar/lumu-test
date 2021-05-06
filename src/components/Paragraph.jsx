import React from 'react';
import './styles/Paragraph.css';
export const Paragraph = () => {
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
            <article className="paragraph__text">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sequi facilis commodi harum molestiae laudantium autem temporibus fugit facere atque deserunt consectetur non reiciendis ea, quis delectus rem eveniet! Non!
                </p>
            </article>
        </section>
    )
}