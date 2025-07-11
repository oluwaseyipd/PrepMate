import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Video, Image, Music, File, X, Check, AlertCircle, Home } from 'lucide-react';

const UploadNewResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    file: null,
    isPublic: true,
    allowDownload: true
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'guide', label: 'Guide' },
    { value: 'template', label: 'Template' },
    { value: 'tool', label: 'Tool' },
    { value: 'reference', label: 'Reference' },
    { value: 'documentation', label: 'Documentation' }
  ];

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'image/jpeg',
    'image/png',
    'image/gif',
    'audio/mpeg',
    'audio/wav',
    'text/plain',
    'application/zip',
    'application/x-zip-compressed'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type
    if (!allowedFileTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        file: 'File type not supported. Please upload PDF, DOC, video, image, or audio files.'
      }));
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setErrors(prev => ({
        ...prev,
        file: 'File size exceeds 50MB limit. Please choose a smaller file.'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      file: file
    }));
    
    setErrors(prev => ({
      ...prev,
      file: ''
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }));
  };

  const getFileIcon = (file) => {
    if (!file) return <File className="text-gray-400" size={24} />;
    
    const type = file.type;
    if (type.includes('pdf') || type.includes('document')) {
      return <FileText className="text-red-500" size={24} />;
    } else if (type.includes('video')) {
      return <Video className="text-purple-500" size={24} />;
    } else if (type.includes('image')) {
      return <Image className="text-green-500" size={24} />;
    } else if (type.includes('audio')) {
      return <Music className="text-orange-500" size={24} />;
    } else {
      return <File className="text-gray-500" size={24} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.file) {
      newErrors.file = 'Please select a file to upload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    // Simulate upload process
    simulateUpload();
    
    // Here you would typically send the data to your backend
    console.log('Form Data:', formData);
    console.log('File:', formData.file);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      file: null,
      isPublic: true,
      allowDownload: true
    });
    setErrors({});
    setUploadComplete(false);
    setUploadProgress(0);
  };

  if (uploadComplete) {
    return (
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Successful!</h2>
              <p className="text-gray-600">Your resource has been uploaded successfully.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                {getFileIcon(formData.file)}
                <span className="font-medium text-gray-800">{formData.title}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{formData.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Category: {formData.category}</span>
                <span>Size: {formData.file ? formatFileSize(formData.file.size) : 'N/A'}</span>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Upload Another Resource
              </button>
              <a
                href="/admin/resources"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 text-gray-700 mb-6">
        <h1 className="text-2xl font-bold text-black">Upload New Resource</h1>
        |
        <a href="/admin/resources"
          className="flex items-center gap-2 text-gray-500 text-sm ml-2 hover:text-blue-600 transition-colors">
          <ArrowLeft size={15} />
          Back to Resources
        </a>
        |
        <a href="/admin/dashboard"
          className="flex items-center gap-2 text-gray-500 text-sm ml-2 hover:text-blue-600 transition-colors">
          <Home size={15} />
          Dashboard 
        </a>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Resource Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter resource title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe what this resource is about..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>

          {/* Category and Tags Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g., react, javascript, tutorial"
              />
              <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File *
            </label>
            
            {!formData.file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : errors.file 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className={`mx-auto mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} size={48} />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop your file here, or{' '}
                  <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.jpg,.jpeg,.png,.gif,.mp3,.wav,.txt,.zip"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">
                  Supports: PDF, DOC, videos, images, audio files (max 50MB)
                </p>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(formData.file)}
                    <div>
                      <p className="font-medium text-gray-800">{formData.file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(formData.file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {errors.file && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.file}
              </p>
            )}
          </div>

          {/* Settings */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Resource Settings
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Make this resource public</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="allowDownload"
                  checked={formData.allowDownload}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Allow users to download this resource</span>
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading}
              className="px-6 py-3 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Resource
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNewResource;