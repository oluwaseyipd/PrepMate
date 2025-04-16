import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Search,
  Folder,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
} from "lucide-react";
import { resourceContents } from "../../constants/resources";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  };

  const width = useWindowWidth();
  const isMediumUp = width >= 768;
  const rowsPerPage = isMediumUp ? 3 : 1;

  const allResources = resourceContents;

  const filteredResources = allResources.filter((item) => {
    const matchesCategory = selectedCategory ? item.type === selectedCategory : true;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedItems = chunkArray(filteredResources, 12);
  const totalPages = Math.ceil(chunkedItems.length / rowsPerPage);
  const paginatedRows = chunkedItems.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };


  const handleDownloadSelected = () => {
    const selectedFiles = filteredResources.filter(item => checkedItems[item.id]);
    selectedFiles.forEach(item => {
      handleDownload(item.path);
    });
  };

  const [message, setMessage] = useState(null);

  const handleShare = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage({ text: 'Link copied', type: 'success' });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setMessage({ text: 'Failed to copy link', type: 'error' });
      setTimeout(() => setMessage(null), 2000);
    }
  };
  

  const hasCheckedItems = Object.values(checkedItems).some(Boolean);

  return (
    <div className="p-4">
            {/* Floating Message */}
      {message && (
  <div
    className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-3 md:px-6 py-2 shadow-lg text-white ${
      message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`}
  >
    {message.text}
  </div>
)}


      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Resources</h1>
        <div className="flex items-center justify-between gap-4 mt-5 md:mt-0">
          <div className="flex items-center relative w-full sm:w-auto bg-blue-50 border border-gray-300 rounded-full p-1">
            <Search size={18} className="mr-2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by name..."
              className="w-full bg-blue-50 text-black mr-2 outline-none sm:w-auto"
            />
          </div>

          <div className="relative w-auto hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-full text-gray-700 focus:ring-0"
            >
              <option value="">All Categories</option>
              <option value="folder">Folder</option>
              <option value="pdf">PDF</option>
              <option value="xls">XLS</option>
              <option value="doc">DOC</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
              <ChevronDown size={18} />
            </div>
          </div>

          <div className="sm:hidden">
            <button className="p-2 bg-blue-100 rounded-full text-blue-600 border border-gray-300">
              <Folder size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Download Selected Button */}
      {hasCheckedItems && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownloadSelected}
            className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-all duration-200"
          >
            <Download size={18} />
            Download Selected
          </button>
        </div>
      )}

      {/* Resource Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl">No matching files found</p>
          <p className="text-sm mt-2">Try checking your spelling or using different keywords.</p>
        </div>
      ) : (
        paginatedRows.map((row, index) => (
          <div key={index} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-5 bg-white p-5 mb-1 rounded-xl">
            {row.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start min-h-[200px] relative group"
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                <button onClick={() => toggleCheckbox(item.id)}>
                  {checkedItems[item.id] ? (
                    <CheckSquare size={20} className="text-blue-600 cursor-pointer" />
                  ) : (
                    <Square size={20} className="text-gray-400 cursor-pointer" />
                  )}
                </button>

                <div className="relative my-5">
                  <img src={item.icon} alt="" className="w-15" />
                  {hoveredItemId === item.id && (
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-30 flex items-center justify-center gap-2 rounded-md">
                      <button
                        onClick={() => handleDownload(item.path)}
                        className="cursor-pointer bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
                      >
                        <Download size={16} className='text-blue-600' />
                      </button>
                      <button
                        onClick={() => handleShare(item.path)}
                        className="cursor-pointer bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
                        title="Copy link"
                      >
                        <Copy size={16} className="text-blue-600 " />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-black text-lg">{item.title}</p>
                <span className="text-gray-500">{item.files} Files</span>
              </div>
            ))}
          </div>
        ))
      )}

      {/* Pagination Controls */}
      {filteredResources.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-blue-300 disabled:opacity-50"
          >
            <ChevronLeft size={18} className="text-blue-600" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-blue-300 disabled:opacity-50"
          >
            <ChevronRight size={18} className="text-blue-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Resources;
