import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserTable = ({ users }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const usersWithExtraData = await Promise.all(users.map(async (user) => {
                const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
                const albums = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
                return {
                    ...user,
                    nbtodos: todos.data.length,
                    nbalbums: albums.data.length
                };
            }));
            setUserData(usersWithExtraData);
        };

        if (users.length) {
            fetchUserData();
        }
    }, [users]);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Company</th>
                    <th>Number of Todos</th>
                    <th>Number of Albums</th>
                </tr>
            </thead>
            <tbody>
                {userData.map((user) => (
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.email}</td>
                        <td><a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></td>
                        <td>{user.company.name}</td>
                        <td>{user.nbtodos}</td>
                        <td>{user.nbalbums}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
