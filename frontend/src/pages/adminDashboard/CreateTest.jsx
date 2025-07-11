import React, { useState, useRef } from "react";
import { 
  PlusCircle, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  BookIcon, 
  Clock, 
  PictureInPicture, 
  MarsStroke, 
  X, 
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
  Save,
  Eye
} from "lucide-react";

const CreateTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    category: '',
    duration: '',
    totalQuestions: '',
    description: '',
    subjectContent: ['', '', '', '', '', ''],
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    image: null,
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [questionImage, setQuestionImage] = useState(null);
  const inputRef = useRef(null);
  const questionImageRef = useRef(null);

  const steps = [
    { id: 1, label: "Test Details" },
    { id: 2, label: "About Test" },
    { id: 3, label: "Create Quiz" },
    { id: 4, label: "Publish Test" },
  ];

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Test title is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.totalQuestions.trim()) newErrors.totalQuestions = "Total questions is required";
    if (!selectedImage) newErrors.image = "Thumbnail image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = "Test description is required";
    if (formData.subjectContent.every(content => !content.trim())) {
      newErrors.subjectContent = "At least one subject content is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.questions.length === 0) {
      newErrors.questions = "At least one question is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentQuestion = () => {
    const newErrors = {};
    if (!currentQuestion.question.trim()) newErrors.question = "Question is required";
    if (currentQuestion.options.some(opt => !opt.trim())) {
      newErrors.options = "All options are required";
    }
    if (!currentQuestion.correctAnswer.trim()) newErrors.correctAnswer = "Correct answer is required";
    if (!currentQuestion.explanation.trim()) newErrors.explanation = "Explanation is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubjectContentChange = (index, value) => {
    const newContent = [...formData.subjectContent];
    newContent[index] = value;
    setFormData(prev => ({ ...prev, subjectContent: newContent }));
    if (errors.subjectContent) {
      setErrors(prev => ({ ...prev, subjectContent: null }));
    }
  };

  const handleQuestionInputChange = (field, value) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
    if (errors.options) {
      setErrors(prev => ({ ...prev, options: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: null }));
      }
    } else {
      alert("Please upload a valid image file (PNG, JPEG) under 5MB.");
    }
  };

  const handleQuestionImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
      setQuestionImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file (PNG, JPEG) under 5MB.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: null }));
      }
    } else {
      alert("Please upload a valid image file (PNG, JPEG) under 5MB.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addQuestion = () => {
    if (validateCurrentQuestion()) {
      const newQuestion = {
        ...currentQuestion,
        id: Date.now(),
        image: questionImage
      };
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));
      clearCurrentQuestion();
      if (errors.questions) {
        setErrors(prev => ({ ...prev, questions: null }));
      }
    }
  };

  const clearCurrentQuestion = () => {
    setCurrentQuestion({
      question: '',
      image: null,
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: ''
    });
    setQuestionImage(null);
    setErrors({});
  };

  const removeQuestion = (id) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const ErrorMessage = ({ message }) => (
    <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  );

  const SuccessMessage = ({ message }) => (
    <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
      <CheckCircle size={14} />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Test</h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-200 transition duration-200">
              <Save size={16} className="inline mr-2" />
              Save as Draft
            </button>
            <button 
              className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                currentStep === steps.length
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={currentStep !== steps.length}
            >
              <Upload size={16} className="inline mr-2" />
              Publish Test
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep > step.id 
                      ? "bg-green-500 text-white" 
                      : currentStep === step.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                    }
                  `}>
                    {currentStep > step.id ? <CheckCircle size={20} /> : step.id}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                    }`}>
                      {step.label}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Step 1: Test Details */}
          {currentStep === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Details</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Thumbnail Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail Image <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        errors.image ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                      onClick={() => inputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {selectedImage ? (
                        <div className="relative">
                          <img
                            src={selectedImage}
                            alt="Thumbnail preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <PictureInPicture size={48} className="mx-auto text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPEG (max 5MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={inputRef}
                        className="hidden"
                      />
                    </div>
                    {errors.image && <ErrorMessage message={errors.image} />}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter test title"
                      className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.title ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.title && <ErrorMessage message={errors.title} />}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject/Course <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Enter subject"
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.subject ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.subject && <ErrorMessage message={errors.subject} />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        placeholder="Enter category"
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.category ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.category && <ErrorMessage message={errors.category} />}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (minutes) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="Enter duration"
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.duration ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.duration && <ErrorMessage message={errors.duration} />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Questions <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.totalQuestions}
                        onChange={(e) => handleInputChange('totalQuestions', e.target.value)}
                        placeholder="Enter total questions"
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.totalQuestions ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.totalQuestions && <ErrorMessage message={errors.totalQuestions} />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  Continue
                  <ArrowRight size={16} className="inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: About Test */}
          {currentStep === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">About Test</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter test description"
                    rows={4}
                    className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.description ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.description && <ErrorMessage message={errors.description} />}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Content
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.subjectContent.map((content, index) => (
                      <input
                        key={index}
                        type="text"
                        value={content}
                        onChange={(e) => handleSubjectContentChange(index, e.target.value)}
                        placeholder={`Content ${index + 1}`}
                        className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    ))}
                  </div>
                  {errors.subjectContent && <ErrorMessage message={errors.subjectContent} />}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                >
                  <ArrowLeft size={16} className="inline mr-2" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  Continue
                  <ArrowRight size={16} className="inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Create Quiz */}
          {currentStep === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Quiz</h2>
              
              {/* Added Questions List */}
              {formData.questions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Added Questions ({formData.questions.length})
                  </h3>
                  <div className="space-y-4">
                    {formData.questions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {index + 1}. {question.question}
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                              Correct Answer: {question.correctAnswer}
                            </p>
                          </div>
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-500 cursor-pointer hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Question Form */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Question</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.question}
                      onChange={(e) => handleQuestionInputChange('question', e.target.value)}
                      placeholder="Enter your question"
                      className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.question ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.question && <ErrorMessage message={errors.question} />}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Image <span className="text-gray-500 text-sm">(Optional)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQuestionImageChange}
                      ref={questionImageRef}
                      className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {questionImage && (
                      <div className="mt-2 relative inline-block">
                        <img src={questionImage} alt="Question preview" className="w-32 h-32 object-cover rounded-lg" />
                        <button
                          onClick={() => setQuestionImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['A', 'B', 'C', 'D'].map((letter, index) => (
                        <div key={letter}>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Option {letter}
                          </label>
                          <input
                            type="text"
                            value={currentQuestion.options[index]}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${letter}`}
                            className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                              errors.options ? "border-red-300" : "border-gray-300"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    {errors.options && <ErrorMessage message={errors.options} />}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correct Answer <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={currentQuestion.correctAnswer}
                        onChange={(e) => handleQuestionInputChange('correctAnswer', e.target.value)}
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.correctAnswer ? "border-red-300" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select correct answer</option>
                        {currentQuestion.options.map((option, index) => (
                          option.trim() && (
                            <option key={index} value={option}>
                              {String.fromCharCode(65 + index)}: {option}
                            </option>
                          )
                        ))}
                      </select>
                      {errors.correctAnswer && <ErrorMessage message={errors.correctAnswer} />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Explanation <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={currentQuestion.explanation}
                        onChange={(e) => handleQuestionInputChange('explanation', e.target.value)}
                        placeholder="Explain the correct answer"
                        rows={3}
                        className={`w-full px-4 py-3 border text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.explanation ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.explanation && <ErrorMessage message={errors.explanation} />}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={clearCurrentQuestion}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                  >
                    Clear Form
                  </button>
                  <button
                    onClick={addQuestion}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                  >
                    <PlusCircle size={16} className="inline mr-2" />
                    Add Question
                  </button>
                </div>
              </div>

              {errors.questions && <ErrorMessage message={errors.questions} />}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                >
                  <ArrowLeft size={16} className="inline mr-2" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                  Continue
                  <ArrowRight size={16} className="inline ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Overview</h2>
              
              <div className="space-y-8">
                {/* Test Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <BookIcon size={16} className="text-blue-500" />
                        <span>{formData.questions.length} Questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <span>{formData.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {formData.category}
                  </span>
                </div>

                {/* Test Image */}
                {selectedImage && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Test thumbnail"
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                )}

                {/* Test Description */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">About the Test</h4>
                  <p className="text-gray-700 leading-relaxed">{formData.description}</p>
                </div>

                {/* Subject Content */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Subject Content</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.subjectContent.filter(content => content.trim()).map((content, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{content}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions Preview */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Questions Preview</h4>
                  <div className="space-y-4">
                    {formData.questions.slice(0, 3).map((question, index) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">
                            {index + 1}. {question.question}
                          </h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 rounded ${
                              option === question.correctAnswer 
                                ? "bg-green-100 text-green-800 font-medium" 
                                : "bg-white text-gray-700"
                            }`}>
                              {String.fromCharCode(65 + optIndex)}: {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {formData.questions.length > 3 && (
                      <div className="text-center py-4">
                        <p className="text-gray-500">
                          ... and {formData.questions.length - 3} more questions
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Test Stats */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Test Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formData.questions.length}</div>
                      <div className="text-sm text-gray-600">Total Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formData.duration}</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formData.questions.length * 2}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formData.questions.length > 0 ? Math.round(formData.duration / formData.questions.length) : 0}
                      </div>
                      <div className="text-sm text-gray-600">Avg. Time/Question</div>
                    </div>
                  </div>
                </div>

                {/* Publish Confirmation */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle size={20} className="text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800">Ready to Publish</h4>
                  </div>
                  <p className="text-green-700 mb-4">
                    Your test is complete and ready to be published. Students will be able to access it once published.
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-green-700">
                      <input type="checkbox" className="rounded border-green-300" />
                      Make test available immediately
                    </label>
                    <label className="flex items-center gap-2 text-sm text-green-700">
                      <input type="checkbox" className="rounded border-green-300" />
                      Send notifications to students
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-gray-100 text-gray-700 px-6 py-3 cursor-pointer rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                >
                  <ArrowLeft size={16} className="inline mr-2" />
                  Back
                </button>
                <div className="flex gap-4">
                  <button className="bg-blue-100 text-blue-600 px-6 py-3 cursor-pointer rounded-lg font-medium hover:bg-blue-200 transition duration-200">
                    <Eye size={16} className="inline mr-2" />
                    Preview Test
                  </button>
                  <button className="bg-green-600 text-white px-6 py-3 cursor-pointer rounded-lg font-medium hover:bg-green-700 transition duration-200">
                    <Upload size={16} className="inline mr-2" />
                    Publish Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTest;