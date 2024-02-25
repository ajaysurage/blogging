import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Define the fetchData function to fetch the latest data
 

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:4000/posts');
    console.log(response.data);
    // Handle the response data here
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!author.trim()) {
      newErrors.author = 'Author name is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/data', {
        title,
        author,
        content
      });

      console.log('Post successful:', response.data);
      // Clear form fields after successful submission
      setTitle('');
      setAuthor('');
      setContent('');
      setErrors({});

      // Fetch latest data after form submission
      fetchData();

      // Redirect to the content page
      navigate('/content');
    } catch (error) {
      console.error('Error posting data:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="card p-4 w-50">
        <h2 className="mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="text-danger">{errors.title}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Author:</label>
            <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
            {errors.author && <span className="text-danger">{errors.author}</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Content:</label>
            <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
            {errors.content && <span className="text-danger">{errors.content}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
