import React, {useState} from 'react';
import {Header} from './Header';
import {Graph} from './Graph';
import {Paragraph} from './Paragraph';
const App = () => {
    const [data, setData] = useState([]);
    const handleData = ({data}) =>{
        setData(data);
    }
    return (
        <>
            <Header/>
            <main>
                <Graph onGetData={data}/>
                <Paragraph onSubmitData={handleData}/>
            </main>
        </>
    )
}
export default App;