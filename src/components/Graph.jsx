import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './styles/Graph.css';
const chartConfigBar = {
    type: "bar",
    data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "# of Repeated Words",
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
        if (onGetData.length > 0) {
            // Data normalization
            const sentence = fixData(onGetData);
            setChartCounter(sentence.length);
            // Save the repeat words
            const wordMap = countRepeatedWords(sentence);
            // Delete this key that causes problems o.O!
            delete wordMap[""];
            // Get the number of words
            const n_words = getNumberWords(wordMap);
            setWordtCounter(n_words);

            // Find the top 3 rank
            const topRank = findTopRak(wordMap);

            if (topRank.length > 0) {
                // Update the Graph Dataset
                updateDataset(0, topRank);
            }
        }
    }, [onGetData]);

    const fixData = (onGetData) => {
        // Here I mix the array of strings in one string.
        let sentence = onGetData.join(" ");
        // Clean the string of "." and "," charaters
        sentence = sentence.replace(/\./g, '');
        sentence = sentence.replace(/\,/g, '');
        return sentence;
    }
    const updateDataset = (datasetIndex, newData) => {
        let nWords = [];
        let labels = [];
        // Separates the keys and the values of the newData array
        newData.forEach(data => {
            nWords.push(data[1]);
            labels.push(data[0]);
        });
        // Update the chart instance data
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[datasetIndex].data = nWords;
        chartInstance.update();
    }
    const countRepeatedWords = (sentence) => {
        // Separate the words
        const words = sentence.split(" ");
        const wordMap = {};
        // Save key = word, value = number of repetitions
        for (let i = 0; i < words.length; i++) {
            const currentWordCount = wordMap[words[i]];
            const count = currentWordCount ? currentWordCount : 0;
            wordMap[words[i]] = count + 1;
        }
        return wordMap;
    }
    const getNumberWords = (wordMap) => {
        // Sum the number of words of all the wordMap object with a reduce :D
        const values = Object.values(wordMap)
        const reducer = (acc, cur) => acc + cur;
        const words = values.reduce(reducer, 0);
        return words;
    }

    const findTopRak = (wordMap) => {
        // Here ... the headache
        if (wordMap) {

            const topRank = [];
            // Convert the object data to a array with two values [key, value]
            // Then, sort the array from smallest to largest
            // Finaly, revert the sort with
            const sortable = Object.entries(wordMap).sort(([, a], [, b]) => a - b).reverse();
            for (let i = 0; i < 3; i++) {
                topRank.push(sortable[i])
            }
            return (topRank)
        }
        return [];
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