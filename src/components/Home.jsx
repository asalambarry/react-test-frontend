import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AddUserForm from '../components/AddUserForm';
import UserTable from '../components/UserTable';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage] = useState(5); // Nombre d'utilisateurs par page
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://jsonplaceholder.typicode.com/users');
            setUsers(result.data);
        };
        fetchData();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleAddUser = async (newUser) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
        setUsers([...users, response.data]);
        setShowAddUserForm(false);
    };

    const offset = currentPage * usersPerPage;
    const currentPageUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    return (
        <div>
            <h1 className="mb-4">La liste des utilisateurs </h1>
            <button className="btn btn-primary mb-4" onClick={() => setShowAddUserForm(true)}>Ajouter un utilisateur</button>
            {showAddUserForm && <AddUserForm onAddUser={handleAddUser} />}
            <UserTable users={currentPageUsers} />
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
            />
        </div>
    );
};

export default Home;
