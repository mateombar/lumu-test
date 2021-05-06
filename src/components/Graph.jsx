import React from 'react';
import './styles/Graph.css';
export const Graph = () => {
    return(
        <section className="graph">
            <div className="graph__container">
                <div className="graph__total">
                    <p>TOTAL WORDS:</p>
                    <p className="last">TOTAL CHARACTERS:</p>
                </div>
                <p className="graph__histo-text">HISTOGRAM TOP 3 WORDS</p>
                <canvas></canvas>
            </div>
        </section>
    )
}