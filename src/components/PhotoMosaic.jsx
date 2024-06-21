import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PhotoMosaic = ({ photos }) => {
    return (
        <div className="row">
            {photos.map(photo => (
                <div key={photo.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <img src={photo.thumbnailUrl} alt={photo.title} className="img-fluid rounded" />
                </div>
            ))}
        </div>
    );
};

export default PhotoMosaic;
