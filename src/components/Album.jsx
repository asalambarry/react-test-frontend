import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PhotoMosaic from '../components/PhotoMosaic';

const Album = () => {
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbumAndPhotos = async () => {
            try {
                setLoading(true);
                const [albumResult, photosResult] = await Promise.all([
                    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
                    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
                ]);
                setAlbum(albumResult.data);
                setPhotos(photosResult.data);
            } catch (err) {
                setError('Failed to fetch album or photos.');
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumAndPhotos();
    }, [albumId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="mb-4">{album.title}</h1>
            <PhotoMosaic photos={photos} />
            <Link to={`/users/${album.userId}`} className="btn btn-primary mt-4">Retour au profil users</Link>
        </div>
    );
};

export default Album;
