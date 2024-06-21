import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Album from './components/Album';
import Home from './components/Home';
import User from './components/User';

function App() {
    return (
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/albums/:albumId" element={<Album />} />
            </Routes>
        </div>
    );
}

export default App;
