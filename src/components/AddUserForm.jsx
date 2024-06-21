import React, { useState } from 'react';

const AddUserForm = ({ onAddUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [company, setCompany] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            website,
            company: {
                name: company,
            },
        };
        onAddUser(newUser);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                    type="text"
                    id="website"
                    className="form-control"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                    type="text"
                    id="company"
                    className="form-control"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-success mt-2">Add User</button>
        </form>
    );
};

export default AddUserForm;
