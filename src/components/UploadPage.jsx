import React, { useState } from 'react'
import { Upload, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/poppins'
import CategoryRadioButtons from './CategoryRadioButtons'
import InlineRadioButtons from './InlineRadioButtons' 

export default function LostFoundForm() {
    const navigate = useNavigate() // Initialize navigate function
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
      name: '',
      time: '',
      date: '',
      place: '',
      comments: '',
      category: '',
      status: '' // New field for InlineRadioButtons
    })
  
    const handleImageUpload = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImage(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  
    const handleCategoryChange = (category) => {
      setFormData(prev => ({
        ...prev,
        category
      }))
    }
  
    const handleStatusChange = (status) => {
      setFormData(prev => ({
        ...prev,
        status
      }))
    }
    
    return (
      <div className="container my-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <button onClick={() => navigate('/')} className="text-dark text-decoration-none me-3" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <ArrowLeft className="me-1" style={{ color: '#011F5B' }} />
                <span style={{ color: '#011F5B', fontWeight: 'bold' }}>Back</span>
            </button>
        </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <label className="d-block text-center cursor-pointer w-100">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="d-none"
                  />
                  <div className="border border-2 border-dashed rounded p-4 hover:border-primary w-100 text-center d-flex justify-content-center align-items-center" style={{ height: '285px' }}>
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: '100%', width: 'auto' }}
                      />
                    ) : (
                      <div className="text-center d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center" style={{ marginLeft: '110px' }}>
                          <Upload size={100} className="text-primary mb-2" />
                        </div>
                        <div className="h5 text-primary">Upload Image</div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className="card-body">
                <label htmlFor="comments" className="form-label h5" style={{ color: '#011F5B', fontWeight: 'bold' }}>Add Additional Comments:</label>
                <textarea
                  className="form-control"
                  id="comments"
                  name="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Status Options (I Lost This / I Found This) */}
              <div className="text-center mt-4">
                <InlineRadioButtons
                  selectedStatus={formData.status}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="card h-100 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#011F5B', fontWeight: 'bold' }}>Item Details:</h5>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: '#011F5B', fontWeight: 'bold' }}>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <h5 className="card-title" style={{ color: '#011F5B', fontWeight: 'bold' }}>Last Seen:</h5>
                <div className="row mb-2 mx-auto" style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '5px 10px', maxWidth: '99%' }}>
                  <div className="col-4">
                    <label htmlFor="time" className="form-label" style={{ color: '#011F5B' }}>Time:</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="date" className="form-label" style={{ color: '#011F5B' }}>Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="place" className="form-label" style={{ color: '#011F5B' }}>Place:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="place"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h5 className="card-title" style={{ color: '#011F5B', fontWeight: 'bold' }}>Categories:</h5>
                <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '10px' }}>
                  <CategoryRadioButtons 
                    selectedCategory={formData.category}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button 
              type="submit" 
              className="btn btn-lg px-5" 
              style={{ backgroundColor: '#8C1A11', borderColor: '#8C1A11', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
          >
            Submit Report
          </button>
        </div>
      </div>
    )
}