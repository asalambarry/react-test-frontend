import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUser(userResult.data);
            const albumsResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
            setAlbums(albumsResult.data);
        };
        fetchUser();
    }, [userId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="mb-4">{user.name}</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <h2 className="mt-4">Albums</h2>
            <ul className="list-group mb-4">
                {albums.map((album) => (
                    <li key={album.id} className="list-group-item">
                        <Link to={`/albums/${album.id}`}>{album.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/" className="btn btn-primary">Retour à la liste des users</Link>
        </div>
    );
};

export default User;
