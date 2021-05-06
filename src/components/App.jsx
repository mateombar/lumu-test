import React from 'react';
import {Header} from './Header';
import {Graph} from './Graph';
import {Paragraph} from './Paragraph';
const App = () => {
    return (
        <>
            <Header/>
            <main>
                <Graph/>
                <Paragraph/>
            </main>
        </>
    )
}
export default App;