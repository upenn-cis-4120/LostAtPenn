import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryRadioButtons from './CategoryRadioButtons';
import InlineRadioButtons from './InlineRadioButtons';
import { database } from './firebase';
import { ref as databaseRef, push } from 'firebase/database';

export default function LostFoundForm({ onSubmit }) {
  // State for the image file and its preview URL
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    time: '',
    date: '',
    place: '',
    comments: '',
    category: '',
    status: '',
  });

  // Handle image upload and set both file and preview URL
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the image file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Store the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category and status changes
  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (imagePreview) {
      // Image selected, use imagePreview as the photo URL
      saveDataToDatabase(imagePreview);
    } else {
      // No image selected, proceed to save data without image URL
      saveDataToDatabase('');
    }
  };

  const saveDataToDatabase = (photoURL) => {
    // Prepare data to save
    const dataToSave = {
      item: formData.name,
      photo: photoURL,
      status: formData.status === 'lost' ? 'Lost' : 'Found',
      when: formData.date,
      where: formData.place,
      comments: formData.comments,
      category: formData.category,
    };

    try {
      const cardsRef = databaseRef(database, 'cards');
      push(cardsRef, dataToSave);

      // Trigger the callback and navigate to the homepage
      onSubmit();
      navigate('/');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to submit report. Please try again.');
    }
  };
  
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="row mb-4">
        <div className="col-xs-12 col-sm-6">
          <a href="#" className="text-dark text-decoration-none">
            <ArrowLeft className="me-1" style={{ color: '#011F5B' }} />
            <span style={{ color: '#011F5B' }}>Back</span>
          </a>
        </div>
        <div className="col-xs-12 col-sm-6 text-center">
          <h1 className="h3" style={{ color: '#011F5B' }}>Item Details:</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body text-center">
              <label className="d-block" style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <div className="border border-2" style={{ borderStyle: 'dashed', borderRadius: '10px', padding: '20px' }}>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Uploaded preview"
                      className="img-responsive"
                      style={{ maxHeight: '300px', width: 'auto', borderRadius: '10px' }}
                    />
                  ) : (
                    <div className="text-center">
                      <Upload size={100} style={{ color: '#007bff', marginBottom: '10px' }} />
                      <div className="h5" style={{ color: '#007bff' }}>Upload Image</div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Additional Comments Section */}
          <div className="panel panel-default" style={{ marginTop: '20px' }}>
            <div className="panel-body">
              <label htmlFor="comments" className="control-label h5" style={{ color: '#011F5B' }}>Add Additional Comments:</label>
              <textarea
                className="form-control"
                id="comments"
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Status (I Lost This / I Found This) */}
          <div className="text-center" style={{ marginTop: '20px' }}>
            <InlineRadioButtons
              selectedStatus={formData.status}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="name" className="control-label h5" style={{ color: '#011F5B' }}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <h5 className="card-title h5" style={{ color: '#011F5B' }}>Last Seen:</h5>
                <label htmlFor="time" className="control-label" style={{ color: '#011F5B' }}>Time:</label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  style={{ paddingTop: '0.6rem', paddingBottom: '0.6rem', lineHeight: '1.5' }}
                />
                <label htmlFor="date" className="control-label" style={{ color: '#011F5B' }}>Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{ paddingTop: '0.6rem', paddingBottom: '0.6rem', lineHeight: '1.5' }}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="place" className="control-label" style={{ color: '#011F5B' }}>Place:</label>
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                />
              </div>

              <h5 className="card-title h5" style={{ color: '#011F5B' }}>Categories:</h5>
              <CategoryRadioButtons selectedCategory={formData.category} onCategoryChange={handleCategoryChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center" style={{ marginTop: '20px' }}>
        <button
          type="submit"
          className="btn btn-lg"
          style={{ backgroundColor: '#8C1A11', borderColor: '#8C1A11', color: 'white', padding: '10px 30px' }}
          onClick={handleFormSubmit}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
