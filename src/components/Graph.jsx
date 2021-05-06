import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './styles/Graph.css';
const chartConfigBar = {
    type: "bar",
    data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "# of Votes",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
}
export const Graph = ({ onGetData }) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [charCounter, setChartCounter] = useState(0)
    const [wordCounter, setWordtCounter] = useState(0)
    useEffect(() => {
        if (chartRef && chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, chartConfigBar);
            setChartInstance(newChartInstance);
        }
    }, [chartRef]);
    useEffect(() => {
        // Data normalization
        const sentence = fixData(onGetData);
        setChartCounter(sentence.length);
        // Save the repeat words
        const wordMap = countRepeatedWords(sentence);
        delete wordMap[""];
        console.log(wordMap);
        // Get the number of words
        const n_words = getNumberWords(wordMap);
        setWordtCounter(n_words);

        if (chartInstance !== null) {
            updateDataset(0, [5, 1, 3]);
        }
    }, [onGetData]);

    const fixData = (onGetData) => {
        let sentence = onGetData.join(" ");
        sentence = sentence.replace(/\./g, '');
        sentence = sentence.replace(/\,/g, '');
        return sentence;
    }
    const updateDataset = (datasetIndex, newData) => {
        chartInstance.data.datasets[datasetIndex].data = newData;
        chartInstance.update();
    }
    const countRepeatedWords = (sentence) => {
        const words = sentence.split(" ");
        const wordMap = {};

        for (let i = 0; i < words.length; i++) {
            const currentWordCount = wordMap[words[i]];
            const count = currentWordCount ? currentWordCount : 0;
            wordMap[words[i]] = count + 1;
        }
        return wordMap;
    }
    const getNumberWords = (wordMap) => {
        const values = Object.values(wordMap)
        // let words = 0;
        // wordMap.forEach(item => {
        //     words += item;
        // })
        // return words;
        const reducer = (acc, cur) => acc + cur;
        const words = values.reduce(reducer, 0);
        return words;
    }
    return (
        <section className="graph">
            <div className="graph__container">
                <div className="graph__total">
                    <p>TOTAL WORDS: {wordCounter}</p>
                    <p className="last">TOTAL CHARACTERS: {charCounter}</p>
                </div>
                <p className="graph__histo-text">HISTOGRAM TOP 3 WORDS</p>
                <div className="graph__chart">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </section>
    )
}