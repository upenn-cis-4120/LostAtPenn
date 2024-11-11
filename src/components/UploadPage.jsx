import React, { useState } from 'react'
import { Upload, ArrowLeft } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryRadioButtons from './CategoryRadioButtons'
import InlineRadioButtons from './InlineRadioButtons' 

export default function LostFoundForm() {
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
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <a href="#" className="text-dark text-decoration-none me-3">
                <ArrowLeft className="me-1 text-[#011F5B]" />
                <span className="text-[#011F5B]">Back</span>
            </a>
            <div className="col-12 col-md-6 offset-md-3">
                <h1 className="h3 mb-0 text-[#011F5B]">Item Details:</h1>
            </div>
        </div>
  
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <label className="d-block text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="d-none"
                  />
                  <div className="border border-2 border-dashed rounded p-4 hover:border-primary">
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: '300px', width: 'auto' }}
                      />
                    ) : (
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <Upload size={100} className="text-primary mb-2" />
                            <div className="h5 text-primary">Upload Image</div>
                        </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label h5" style={{ color: '#011F5B' }}>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
  
                <div className="mb-3">
                  <h5 className="card-title h5" style={{ color: '#011F5B' }}>Last Seen:</h5>
                  <div className="mb-2">
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
                  <div className="mb-2">
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
                  <div className="mb-2">
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
  
                <div>
                  <h5 className="card-title h5" style={{ color: '#011F5B' }}>Categories:</h5>
                  <CategoryRadioButtons 
                    selectedCategory={formData.category}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="card-body">
            <label htmlFor="comments" className="form-label h5" style={{ color: '#011F5B' }}>Add Additional Comments:</label>
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleInputChange}
            ></textarea>
        </div>
  
        <div className="text-center mt-4">
          <InlineRadioButtons
            selectedStatus={formData.status}
            onStatusChange={handleStatusChange}
          />
        </div>
  
        <div className="text-center mt-4">
            <button 
                type="submit" 
                className="btn btn-lg px-5" 
                style={{ backgroundColor: '#8C1A11', borderColor: '#8C1A11', color: 'white' }}
            >
            Submit Report
            </button>
        </div>
      </div>
    )
  }