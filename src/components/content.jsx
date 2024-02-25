import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Content() {
    const [data, setData] = useState([]);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedAuthor, setUpdatedAuthor] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/data/${id}`);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            // Find the item to update
            const itemToUpdate = data.find(item => item.id === id);
            // Update the item with the new data
            const updatedItem = { ...itemToUpdate, title: updatedTitle, author: updatedAuthor, content: updatedContent };
            // Send a PUT request to update the item
            await axios.put(`http://localhost:4000/data/${id}`, updatedItem);
            // Update the state with the updated data
            const updatedData = data.map(item => (item.id === id ? updatedItem : item));
            setData(updatedData);
            // Reset the state variables for updating
            setUpdatedTitle('');
            setUpdatedAuthor('');
            setUpdatedContent('');
            setEditingId(null);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const gotohome = () => {
        navigate('/');
    };

    return (
        <div>
            <h2 className='text-center bg-primary'>Data from data.json:</h2>
            <div className="row">
                {data.map((item, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Title: {item.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Author Name: {item.author}</h6>
                                <h3 className="card-subtitle mb-2 text-muted">Content</h3>
                                <p className="card-text">{item.content}</p>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger mx-3">Delete</button>
                                <button onClick={() => setEditingId(item.id)} className="btn btn-warning mx-3">Update</button>
                                <button onClick={gotohome} className="btn btn-primary mx-3">Post New Content</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Update form */}
            {editingId && (
                <div className="card">
                    <div className="card-header">Edit Post</div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title:</label>
                                <input type="text" className="form-control" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author:</label>
                                <input type="text" className="form-control" value={updatedAuthor} onChange={(e) => setUpdatedAuthor(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Content:</label>
                                <textarea className="form-control" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
                            </div>
                            <button type="button" onClick={() => handleUpdate(editingId)} className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Content;
