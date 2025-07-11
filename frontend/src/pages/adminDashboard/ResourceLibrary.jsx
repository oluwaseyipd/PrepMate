import React, { useState } from 'react';
import { PlusCircle, ArrowLeft, ArrowRight, Search, Filter, Download, Trash2, Eye, Calendar, FileText, Video, Image, Music, File, Home } from 'lucide-react';

const ResourceLibrary = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      description: "Comprehensive guide covering useState, useEffect, and custom hooks",
      category: "tutorial",
      type: "pdf",
      uploadDate: "2024-01-15",
      downloadCount: 234,
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      description: "Modern JavaScript features every developer should know",
      category: "guide",
      type: "video",
      uploadDate: "2024-01-10",
      downloadCount: 189,
      size: "15.2 MB"
    },
    {
      id: 3,
      title: "CSS Grid Layout Examples",
      description: "Practical examples of CSS Grid for responsive design",
      category: "template",
      type: "image",
      uploadDate: "2024-01-08",
      downloadCount: 156,
      size: "1.8 MB"
    },
    {
      id: 4,
      title: "API Design Best Practices",
      description: "Guidelines for designing RESTful APIs",
      category: "guide",
      type: "document",
      uploadDate: "2024-01-05",
      downloadCount: 298,
      size: "3.1 MB"
    },
    {
      id: 5,
      title: "Node.js Performance Tips",
      description: "Optimization techniques for Node.js applications",
      category: "tutorial",
      type: "pdf",
      uploadDate: "2024-01-03",
      downloadCount: 167,
      size: "2.7 MB"
    },
    {
      id: 6,
      title: "Database Design Patterns",
      description: "Common patterns for database architecture",
      category: "guide",
      type: "document",
      uploadDate: "2024-01-01",
      downloadCount: 203,
      size: "4.2 MB"
    },
    {
      id: 7,
      title: "React Component Library",
      description: "Reusable components for faster development",
      category: "template",
      type: "code",
      uploadDate: "2023-12-28",
      downloadCount: 445,
      size: "8.9 MB"
    },
    {
      id: 8,
      title: "Mobile App UI Kit",
      description: "Complete UI kit for mobile applications",
      category: "template",
      type: "image",
      uploadDate: "2023-12-25",
      downloadCount: 312,
      size: "12.3 MB"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "tutorial", label: "Tutorials" },
    { value: "guide", label: "Guides" },
    { value: "template", label: "Templates" },
    { value: "tool", label: "Tools" }
  ];

  const resourcesPerPage = 8;
  
  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const startIndex = (currentPage - 1) * resourcesPerPage;
  const currentResources = filteredResources.slice(startIndex, startIndex + resourcesPerPage);

  const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
      case 'document':
        return <FileText className="text-red-500" size={24} />;
      case 'video':
        return <Video className="text-purple-500" size={24} />;
      case 'image':
        return <Image className="text-green-500" size={24} />;
      case 'audio':
        return <Music className="text-orange-500" size={24} />;
      default:
        return <File className="text-gray-500" size={24} />;
    }
  };

  const handleDeleteResource = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      // Handle delete logic here
      console.log("Deleting resource with ID:", id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Heading */}
      <div className="flex items-center gap-3 text-gray-700 mb-6">
        <h1 className="text-2xl font-bold text-black">Resources Library</h1>
        |
        <a href="/admin/dashboard"
        className="flex items-center gap-2 text-gray-500 text-sm ml-2 hover:text-blue-600 transition-colors">
          <Home className="text-gray-500" size={15} />
          Dashboard 
        </a>
      </div>

      {/* Search, Filter, and Add Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-5 md:mt-0 mb-8">

          {/* Search Bar */}
          <div className="flex items-center relative w-full sm:w-auto bg-blue-50 border border-gray-300 rounded-full p-1">
            <Search size={20} className="mr-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by name or description..."
              className="w-full bg-blue-50 py-1 text-black mr-2 outline-none sm:w-auto"></input>
          </div>
          
          {/* Filter Button and Add New Resource Button*/}
          <div className='flex items-center relative w-full sm:w-auto gap-5'>

        
          <div className="relative w-auto sm:block">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-800 bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
            
            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setShowFilters(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
                  {/* Add New Resource Button */}
        <a
          href="/admin/uploadresource"
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        >
          <PlusCircle size={20} />
          <span>Add New Resource</span>
        </a>
        </div>  

        
      </div>

      {/* Active Filter Display */}
      {selectedCategory !== "all" && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Filtered by: {toTitleCase(selectedCategory)}
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getFileIcon(resource.type)}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {resource.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => console.log("Viewing resource:", resource.id)}
                  className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
                  title="View Resource"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                  title="Delete Resource"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {resource.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {resource.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDate(resource.uploadDate)}</span>
              </div>
              <span>{resource.size}</span>
            </div>
            
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Download size={12} />
                <span>{resource.downloadCount} downloads</span>
              </div>
              <button className="flex items-center cursor-pointer gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1} 
            className="cursor-pointer p-2 disabled:opacity-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className='text-blue-600' size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-3 py-1 rounded-full transition-colors ${
                currentPage === i + 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages} 
            className="p-2 cursor-pointer rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors"
          >
            <ArrowRight className='text-blue-600' size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;