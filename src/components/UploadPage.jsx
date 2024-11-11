import React, { useState } from 'react'
import { ArrowLeft, Upload } from 'react-bootstrap/icons'
import Image from 'next/image'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryRadioButtons from './CategoryRadioButtons'
import InlineRadioButtons from './InlineRadioButtons'

export default function LostFoundForm({
  RadioButtonComponent = () => <div className="min-h-50px bg-light rounded p-3"><CategoryRadioButtons /></div>,
  CheckboxComponent = () => <div className="min-h-200px bg-light rounded p-3"><InlineRadioButtons /></div>
}) {
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    date: '',
    place: '',
    comments: ''
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

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center mb-4">
        <Link href="#" className="text-dark text-decoration-none me-3">
          <ArrowLeft className="me-1" />
          <span className="text-dark">Back</span>
        </Link>
      </div>

      <h1 className="h3 mb-4 text-dark">Item Details:</h1>

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
                    <Image
                      src={image}
                      alt="Uploaded preview"
                      width={300}
                      height={300}
                      className="img-fluid rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="display-1 text-primary mb-2" />
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
                <label htmlFor="name" className="form-label">Name:</label>
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
                <h5 className="card-title">Last Seen:</h5>
                <div className="mb-2">
                  <label htmlFor="time" className="form-label">Time:</label>
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
                  <label htmlFor="date" className="form-label">Date:</label>
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
                  <label htmlFor="place" className="form-label">Place:</label>
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
                <h5 className="card-title">Categories:</h5>
                <CheckboxComponent />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <label htmlFor="comments" className="form-label h5">Add Additional Comments:</label>
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

      <div className="mt-4">
        <RadioButtonComponent />
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-danger btn-lg px-5">Submit Report</button>
      </div>
    </div>
  )
}