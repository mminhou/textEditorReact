import React, { Component } from 'react';
import Notepad from './component/Notepad';

interface Props {}

function App() {
    return (
        <div>
            <h1>TextEditor</h1>
            <Notepad />
        </div>
    )
}

export default App;
