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
                data: [5, 2, 3],
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
export const Graph = () => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    useEffect(() => {
        if (chartRef && chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, chartConfigBar);
            setChartInstance(newChartInstance);
        }
    }, [chartRef]);
    return (
        <section className="graph">
            <div className="graph__container">
                <div className="graph__total">
                    <p>TOTAL WORDS:</p>
                    <p className="last">TOTAL CHARACTERS:</p>
                </div>
                <p className="graph__histo-text">HISTOGRAM TOP 3 WORDS</p>
                <div className="graph__chart">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </section>
    )
}