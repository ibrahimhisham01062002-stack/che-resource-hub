const { useState, useEffect, useRef, useMemo } = React;

// In-React high-fidelity SVG icon system
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    book: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    fileText: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    video: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    plus: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    search: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    arrowLeft: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    ),
    trash: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    upload: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    download: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    externalLink: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    layers: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    clock: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    edit: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    save: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
    bookOpen: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    chevronRight: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    ),
    play: (
      <svg fill="currentColor" viewBox="0 0 24 24" className={className} {...props}>
        <path d="M8 5v14l11-7z" />
      </svg>
    )
  };
  return icons[name] || (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "" 
  : "https://che-resource-hub-2.onrender.com"; // Render production API

function App() {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  
  // Two primary sections: "books" or "slides"
  const [primarySection, setPrimarySection] = useState("books");

  // Academic Level & Term selections
  const [selectedLevel, setSelectedLevel] = useState("Level-3");
  const [selectedTerm, setSelectedTerm] = useState("Term-2");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [fileSearchQuery, setFileSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);



  // Links state
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "", category: "YouTube" });
  const [isSavingLink, setIsSavingLink] = useState(false);
  const [playingVideoUrl, setPlayingVideoUrl] = useState(null);

  // Files & Preview states
  const [previewFile, setPreviewFile] = useState(null); // {name, path, size, type}
  
  // Book upload states
  const [bookUploadFile, setBookUploadFile] = useState(null);
  const [isBookUploading, setIsBookUploading] = useState(false);
  const [bookUploadProgress, setBookUploadProgress] = useState(0);
  const [bookUploadStatus, setBookUploadStatus] = useState({ type: "", message: "" });
  const bookFileInputRef = useRef(null);

  // Slide upload states
  const [slideUploadFile, setSlideUploadFile] = useState(null);
  const [isSlideUploading, setIsSlideUploading] = useState(false);
  const [slideUploadProgress, setSlideUploadProgress] = useState(0);
  const [slideUploadStatus, setSlideUploadStatus] = useState({ type: "", message: "" });
  const slideFileInputRef = useRef(null);

  // Dynamic course creator states
  const [newCourse, setNewCourse] = useState({ code: "", title: "", description: "" });
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseError, setCourseError] = useState("");

  // Fetch all courses on mount
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/courses`);
      if (!res.ok) throw new Error("Failed to load courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch course-specific resources on active course change
  useEffect(() => {
    if (!activeCourse) return;
    
    // Reset states
    setPreviewFile(null);
    setFileSearchQuery("");
    setPrimarySection("books"); // Default to Books section
    
    // Load reference links
    const loadLinks = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/links`);
        const data = await res.json();
        setReferenceLinks(data);
      } catch (err) {
        console.error("Links load failed", err);
      }
    };

    loadLinks();
  }, [activeCourse]);

  // Dynamic book classifier
  const isBookFile = (file) => {
    const name = file.name.toLowerCase();
    return name.includes("book") || 
           name.includes("edition") || 
           name.includes("manual") || 
           name.includes("solution") || 
           name.includes("levenspiel") || 
           name.includes("fogler") || 
           name.includes("geankopolis") || 
           name.includes("wankat") || 
           name.includes("cussler") || 
           name.includes("brennan") || 
           name.includes("foust") || 
           name.includes("coulson") || 
           name.includes("rhodes") || 
           name.includes("chopra") ||
           file.bytes > 5 * 1024 * 1024; // Files > 5MB are highly likely books
  };

  // Split files into Books and Slides
  const { booksList, slidesList } = useMemo(() => {
    if (!activeCourse || !activeCourse.files) return { booksList: [], slidesList: [] };
    const books = [];
    const slides = [];
    activeCourse.files.forEach((file, index) => {
      const fileWithIndex = { ...file, index };
      const typeLower = (file.type || "").toLowerCase();
      if (typeLower.includes("book") || typeLower.includes("manual")) {
        books.push(fileWithIndex);
      } else {
        slides.push(fileWithIndex);
      }
    });
    return { booksList: books, slidesList: slides };
  }, [activeCourse]);



  // Handle dynamic course creation
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title || !selectedLevel || !selectedTerm) {
      setCourseError("Please specify Course Code, Title, and select a Level & Term.");
      return;
    }
    setIsCreatingCourse(true);
    setCourseError("");
    try {
      const res = await fetch(`${API_BASE}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCourse.code,
          title: newCourse.title,
          description: newCourse.description || `Study materials for ${newCourse.code}`,
          level: selectedLevel,
          term: selectedTerm
        })
      });
      
      if (res.ok) {
        // Refresh the courses list
        await fetchCourses();
        // Reset form
        setNewCourse({ code: "", title: "", description: "" });
      } else {
        const errData = await res.json();
        setCourseError(errData.detail || "Failed to create course");
      }
    } catch (err) {
      setCourseError("Network error. Failed to connect to server.");
    } finally {
      setIsCreatingCourse(false);
    }
  };

  // Handle adding a reference link
  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    setIsSavingLink(true);
    try {
      const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLink)
      });
      if (res.ok) {
        const data = await res.json();
        setReferenceLinks(data);
        setNewLink({ title: "", url: "", category: "YouTube" });
      }
    } catch (err) {
      console.error("Failed to add link", err);
    } finally {
      setIsSavingLink(false);
    }
  };

  // Handle deleting a reference link
  const handleDeleteLink = async (linkId) => {
    try {
      const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/links/${linkId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const data = await res.json();
        setReferenceLinks(data);
      }
    } catch (err) {
      console.error("Failed to delete link", err);
    }
  };

  // Handle file uploads
  const handleFileUpload = async (e, file, category, setters) => {
    e.preventDefault();
    if (!file) return;
    
    const { setIsUploading, setUploadProgress, setUploadStatus, setUploadFile, fileInputRef } = setters;
    
    setIsUploading(true);
    setUploadStatus({ type: "", message: "" });
    setUploadProgress(20);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category); // "book" or "slide"

    try {
      setUploadProgress(50);
      const res = await fetch(`${API_BASE}/api/upload/${activeCourse.id}`, {
        method: "POST",
        body: formData
      });
      setUploadProgress(85);
      if (res.ok) {
        setUploadStatus({ type: "success", message: "File uploaded successfully!" });
        setUploadFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh courses to scan new files
        await fetchCourses();
        
        // Re-locate updated course to preserve reference
        const updatedRes = await fetch(`${API_BASE}/api/courses`);
        const coursesList = await updatedRes.json();
        const found = coursesList.find(c => c.id === activeCourse.id);
        if (found) setActiveCourse(found);
      } else {
        const data = await res.json();
        setUploadStatus({ type: "error", message: data.detail || "Upload failed" });
      }
    } catch (err) {
      setUploadStatus({ type: "error", message: "Upload failed: network error" });
    } finally {
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 800);
    }
  };

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  // Render markdown text dynamically using Marked
  const renderMarkdown = (text) => {
    if (!text) return "";
    return { __html: marked.parse(text) };
  };

  // Filtering courses by search bar, level, and term
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLevel = !selectedLevel || c.level === selectedLevel;
      const matchesTerm = !selectedLevel || !selectedTerm || c.term === selectedTerm;
      
      return matchesSearch && matchesLevel && matchesTerm;
    });
  }, [courses, searchQuery, selectedLevel, selectedTerm]);

  // Filtering books inside active section
  const filteredBooks = useMemo(() => {
    return booksList.filter(f => 
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(fileSearchQuery.toLowerCase())
    );
  }, [booksList, fileSearchQuery]);

  // Filtering slides inside active section
  const filteredSlides = useMemo(() => {
    return slidesList.filter(f => 
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(fileSearchQuery.toLowerCase())
    );
  }, [slidesList, fileSearchQuery]);

  // Pre-compiled colorful stats dashboard counts
  const totalFilesCount = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.fileCount || 0), 0);
  }, [courses]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center flex-col space-y-4">
        <div className="w-12 h-12 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin"></div>
        <p className="text-glow text-accent-indigo font-display font-medium tracking-wide">Loading Academic Space...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Overlay Video Player Modal */}
      {playingVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative border-brand">
            <button 
              onClick={() => setPlayingVideoUrl(null)}
              className="absolute top-4 right-4 bg-dark-900 bg-opacity-80 p-2 rounded-full border border-white border-opacity-10 text-slate-300 hover:text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe 
                src={playingVideoUrl} 
                className="w-full h-full"
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Primary Navigation & Hub Logo */}
      <header className="glass-panel sticky top-0 z-40 border-b border-white border-opacity-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveCourse(null)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-indigo to-accent-violet flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Icon name="layers" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-wide text-glow">ChE <span className="gradient-text">StudySpace</span></h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Department of Chemical Engineering</p>
          </div>
        </div>
        
        {/* Hub stats on Dashboard */}
        {!activeCourse && (
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <div className="text-right">
              <span className="text-slate-400 block text-[11px] font-medium tracking-wider uppercase">Active Courses</span>
              <span className="font-display font-semibold text-white">{courses.length} courses</span>
            </div>
            <div className="h-8 w-px bg-white bg-opacity-10"></div>
            <div className="text-right">
              <span className="text-slate-400 block text-[11px] font-medium tracking-wider uppercase">Resources Loaded</span>
              <span className="font-display font-semibold text-accent-indigo">{totalFilesCount} files</span>
            </div>
            <div className="h-8 w-px bg-white bg-opacity-10"></div>
            
            {/* Unified Level and Term Dropdown */}
            <div className="flex flex-col text-left">
              <span className="text-slate-400 block text-[10px] font-bold tracking-wider uppercase mb-1">Level and term</span>
              <select 
                value={selectedLevel && selectedTerm ? `${selectedLevel}, ${selectedTerm}` : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) {
                    setSelectedLevel("");
                    setSelectedTerm("");
                  } else {
                    const [lvl, trm] = val.split(", ");
                    setSelectedLevel(lvl);
                    setSelectedTerm(trm);
                  }
                }}
                className="glass-input px-4 py-2 rounded-xl text-xs font-semibold bg-dark-900 cursor-pointer focus:border-indigo-500 border border-white/10"
              >
                <option value="">All Levels & Terms</option>
                <option value="Level-3, Term-1">Level 3, Term 1</option>
                <option value="Level-3, Term-2">Level 3, Term 2</option>
                <option value="Level-4, Term-1">Level 4, Term 1</option>
                <option value="Level-4, Term-2">Level 4, Term 2</option>
              </select>
            </div>

          </div>
        )}
      </header>

      {/* Main Workspace Body */}
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
        
        {/* DASHBOARD PAGE */}
        {!activeCourse ? (
          <div className="space-y-8 flex-grow flex flex-col justify-between">
            {/* Elegant Greeting and Global search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
                  Welcome to Your <span className="gradient-text text-glow">Study Hub</span>
                </h2>
                <p className="text-slate-400 mt-2 text-sm max-w-xl">
                  Centralized academic hub for Chemical Engineering slides, textbooks, and interactive study notes.
                </p>
              </div>
              
              {/* Dynamic search bar */}
              <div className="relative w-full md:w-80">
                <input 
                  type="text"
                  placeholder="Search active courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:border-indigo-500"
                />
                <Icon name="search" className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              {/* Inline Course Creator Card */}
              {selectedLevel && selectedTerm && (
                <div className="glass-panel border-dashed border-2 border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] bg-indigo-950/5 relative overflow-hidden group">
                  <div className="z-10 w-full space-y-3">
                    <div className="flex items-center space-x-2 text-indigo-300">
                      <Icon name="plus" className="w-5 h-5 text-accent-indigo animate-pulse" />
                      <span className="font-display font-semibold text-xs uppercase tracking-wider">Create Course Segment</span>
                    </div>
                    
                    <form onSubmit={handleCreateCourse} className="space-y-2">
                      <input 
                        type="text" 
                        required
                        placeholder="Course Code (e.g. ChE 403)"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                        className="glass-input w-full px-3 py-1.5 rounded-lg text-xs"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="Course Title (e.g. Process Control)"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="glass-input w-full px-3 py-1.5 rounded-lg text-xs"
                      />
                      <textarea 
                        placeholder="Description (optional)"
                        rows={1}
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="glass-input w-full px-3 py-1.5 rounded-lg text-xs resize-none"
                      />
                      
                      {courseError && (
                        <p className="text-[10px] text-rose-400 font-medium">{courseError}</p>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isCreatingCourse}
                        className="w-full py-2 bg-gradient-to-r from-accent-indigo to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1"
                      >
                        <span>{isCreatingCourse ? "Linking to Telegram..." : "Link Course to Telegram"}</span>
                        <Icon name="chevronRight" className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {filteredCourses.map((course, idx) => {

                // Generates dynamic aesthetic gradient backgrounds by course code
                const gradients = [
                  "from-accent-indigo to-indigo-900/30",
                  "from-accent-violet to-violet-900/30",
                  "from-accent-teal to-teal-900/30",
                  "from-accent-blue to-blue-900/30",
                  "from-accent-rose to-rose-900/30",
                ];
                const grad = gradients[idx % gradients.length];
                
                return (
                  <div 
                    key={course.id}
                    onClick={() => setActiveCourse(course)}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer min-h-[220px] relative overflow-hidden group"
                  >
                    {/* Visual accent backdrop glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${grad} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                    
                    <div>
                      {/* Course badge */}
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/10 mb-4 font-display">
                        {course.code}
                      </span>
                      {/* Course title */}
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-indigo transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      {/* Course description */}
                      <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Bottom Stats details */}
                    <div className="flex items-center justify-between border-t border-white border-opacity-5 pt-4 mt-6">
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <Icon name="fileText" className="w-3.5 h-3.5 text-accent-indigo" />
                        <span>{course.fileCount} resources</span>
                      </div>
                      <div className="flex items-center text-xs text-accent-indigo font-medium group-hover:translate-x-1 transition-transform">
                        <span>Enter Space</span>
                        <Icon name="chevronRight" className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-16 text-center glass-panel rounded-2xl border-dashed border-2 border-white border-opacity-10">
                  <Icon name="layers" className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 font-display">No courses match your active search filter.</p>
                </div>
              )}
            </div>

            {/* Quick study references info banner */}
            <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-accent-indigo">
                  <Icon name="bookOpen" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-white text-base">Chemical Engineering Formula Guides</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Explore each course space to access pre-populated formulas with live interactive timelines.</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-display font-semibold text-xs rounded-xl cursor-pointer shadow-md shadow-indigo-600/10 uppercase tracking-wider" onClick={() => setActiveCourse(courses[0])}>
                Quick Study: CRE
              </span>
            </div>
          </div>
        ) : (
          
          /* DETAILED COURSE SPACE */
          <div className="space-y-6 flex-grow flex flex-col">
            
            {/* Top Workspace Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white border-opacity-5 pb-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveCourse(null)}
                  className="bg-dark-900 hover:bg-dark-800 border border-white border-opacity-10 p-2.5 rounded-xl transition-all hover:scale-105"
                >
                  <Icon name="arrowLeft" className="w-5 h-5 text-slate-300" />
                </button>
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/10 uppercase tracking-widest font-display">
                      {activeCourse.code}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl text-glow text-white">
                      {activeCourse.title}
                    </h2>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
                    {activeCourse.description}
                  </p>
                </div>
              </div>

              {/* Two Primary Subsection Switchers as required */}
              <div className="flex bg-dark-950 p-1 rounded-xl border border-white border-opacity-5 self-start md:self-center">
                <button
                  onClick={() => { setPrimarySection("books"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'books' ? 'bg-gradient-to-tr from-accent-indigo to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="book" className="w-3.5 h-3.5" />
                  <span>Books</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("slides"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'slides' ? 'bg-gradient-to-tr from-accent-indigo to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="layers" className="w-3.5 h-3.5" />
                  <span>slides</span>
                </button>
              </div>
            </div>

            {/* TWO PRIMARY SUBSECTIONS */}
            <div className="flex-grow flex flex-col">
              
              {/* SUBSECTION 1: BOOKS */}
              {primarySection === 'books' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start">
                  
                  {/* Left Column: Books List & Search */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Reference Books</h3>
                        <span className="text-[10px] text-accent-indigo font-bold bg-accent-indigo/10 px-2 py-0.5 rounded border border-accent-indigo/10">
                          {booksList.length} volumes
                        </span>
                      </div>

                      {/* PDF & Books drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, bookUploadFile, "book", {
                        setIsUploading: setIsBookUploading,
                        setUploadProgress: setBookUploadProgress,
                        setUploadStatus: setBookUploadStatus,
                        setUploadFile: setBookUploadFile,
                        fileInputRef: bookFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc,.xlsx,.xls"
                          onChange={(e) => setBookUploadFile(e.target.files[0])}
                          className="hidden" 
                          id="book-upload-input"
                          ref={bookFileInputRef}
                        />
                        <label 
                          htmlFor="book-upload-input" 
                          className="glass-panel border-dashed border-2 border-indigo-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-colors group-hover:bg-indigo-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-indigo mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-indigo-300 text-center px-2">
                            {bookUploadFile ? `Selected: ${bookUploadFile.name}` : "Upload reference textbooks or manuals directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {bookUploadFile && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setBookUploadFile(null); if (bookFileInputRef.current) bookFileInputRef.current.value = ""; }}
                              className="px-2 py-1 border border-white border-opacity-10 text-slate-400 rounded-lg text-[10px] font-display hover:text-white"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isBookUploading}
                              className="px-3 py-1 bg-accent-indigo hover:bg-indigo-600 text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isBookUploading ? "Uploading..." : "Save to Books"}</span>
                              <Icon name="plus" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isBookUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-gradient-to-r from-accent-indigo to-accent-violet h-full transition-all duration-300" style={{ width: `${bookUploadProgress}%` }}></div>
                        </div>
                      )}

                      {bookUploadStatus.message && (
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${bookUploadStatus.type === 'success' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {bookUploadStatus.message}
                        </div>
                      )}
                      
                      {/* Search books */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search textbooks..."
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* Books Catalog list */}
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {filteredBooks.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-indigo-950/5 cursor-pointer ${isPreviewing ? 'border-accent-indigo border-opacity-40 bg-indigo-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-accent-indigo flex-shrink-0">
                                  <Icon name="bookOpen" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="block text-xs font-semibold text-white line-clamp-2 leading-relaxed">
                                    {file.name}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; PDF Textbook
                                  </span>
                                </div>
                              </div>
                              <a 
                                href={`${API_BASE}/api/download/${activeCourse.id}/${file.index}`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-indigo-600 rounded-lg text-slate-400 hover:text-white flex-shrink-0"
                                title="Download"
                              >
                                <Icon name="download" className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          );
                        })}

                        {filteredBooks.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No books cataloged inside this folder.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Split Screen PDF Viewer */}
                  <div className="lg:col-span-2">
                    {previewFile ? (
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-indigo">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-indigo" />
                            <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                              Reading: {previewFile.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setPreviewFile(null)}
                            className="text-slate-400 hover:text-white text-xs font-semibold"
                          >
                            Close Reader
                          </button>
                        </div>

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                          <iframe 
                            src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`}
                            className="w-full h-full border-none"
                            title="PDF Viewer Frame"
                          ></iframe>
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-accent-indigo border border-indigo-500/20 mb-2">
                          <Icon name="bookOpen" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Distraction-Free Textbook Reader</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any textbook or reference manual from the left catalog to launch our integrated full-screen PDF workspace.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* SUBSECTION 2: slides (Aggregated interactive learning space) */}
              {primarySection === 'slides' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
                  
                  {/* Slides list */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <h3 className="font-display font-bold text-lg text-white">Class Slides & Assets</h3>
                        <div className="relative w-full sm:w-64">
                          <input 
                            type="text"
                            placeholder="Filter slides..."
                            value={fileSearchQuery}
                            onChange={(e) => setFileSearchQuery(e.target.value)}
                            className="glass-input w-full pl-9 pr-3 py-1.5 rounded-lg text-xs"
                          />
                          <Icon name="search" className="absolute left-3 top-2.5 w-3 h-3 text-slate-400" />
                        </div>
                      </div>

                      {/* PDF & Slides drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, slideUploadFile, "slide", {
                        setIsUploading: setIsSlideUploading,
                        setUploadProgress: setSlideUploadProgress,
                        setUploadStatus: setSlideUploadStatus,
                        setUploadFile: setSlideUploadFile,
                        fileInputRef: slideFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf,.hsc,.bk0,.docx,.doc,.xlsx,.xls"
                          onChange={(e) => setSlideUploadFile(e.target.files[0])}
                          className="hidden" 
                          id="file-upload-input"
                          ref={slideFileInputRef}
                        />
                        <label 
                          htmlFor="file-upload-input" 
                          className="glass-panel border-dashed border-2 border-indigo-500/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-colors group-hover:bg-indigo-950/10 block"
                        >
                          <Icon name="upload" className="w-8 h-8 text-accent-indigo mb-3 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-xs text-indigo-300 text-center max-w-lg px-4">
                            {slideUploadFile ? `Selected: ${slideUploadFile.name}` : "Upload slides, manuals, MATLAB/HYSYS scripts, or any other resources that might be helpful to the course."}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">Drag and drop or click to browse</p>
                        </label>
                        
                        {slideUploadFile && (
                          <div className="flex items-center space-x-3 mt-3 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSlideUploadFile(null); if (slideFileInputRef.current) slideFileInputRef.current.value = ""; }}
                              className="px-3 py-1.5 border border-white border-opacity-10 text-slate-400 rounded-lg text-xs font-display hover:text-white"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSlideUploading}
                              className="px-4 py-1.5 bg-accent-indigo hover:bg-indigo-600 text-white rounded-lg text-xs font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSlideUploading ? "Uploading..." : "Save to slides"}</span>
                              <Icon name="plus" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isSlideUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-gradient-to-r from-accent-indigo to-accent-violet h-full transition-all duration-300" style={{ width: `${slideUploadProgress}%` }}></div>
                        </div>
                      )}

                      {slideUploadStatus.message && (
                        <div className={`p-3 rounded-lg text-xs font-display font-medium ${slideUploadStatus.type === 'success' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {slideUploadStatus.message}
                        </div>
                      )}

                      {/* List of non-book slide files */}
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {filteredSlides.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              className={`glass-panel border-opacity-5 p-3 rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-indigo-950/5 ${isPreviewing ? 'border-accent-indigo border-opacity-40 bg-indigo-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-accent-indigo flex-shrink-0">
                                  <Icon name={(file.type || "").toUpperCase().includes('PDF') || (file.name || "").toLowerCase().endsWith('.pdf') ? 'fileText' : 'layers'} className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="block text-xs font-semibold text-white line-clamp-1 leading-normal">
                                    {file.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-display">
                                    {file.type} &bull; {file.size}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => setPreviewFile(file)}
                                  className="px-2.5 py-1.5 bg-dark-900 border border-white border-opacity-5 hover:border-accent-indigo hover:text-accent-indigo rounded-lg text-[10px] font-display font-semibold text-slate-300"
                                >
                                  View
                                </button>
                                <a 
                                  href={`${API_BASE}/api/download/${activeCourse.id}/${file.index}`}
                                  download
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-indigo-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}

                        {filteredSlides.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No slide materials cataloged inside this folder yet.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive File Preview Pane */}
                    {previewFile && (
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-indigo">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-indigo" />
                            <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                              Preview: {previewFile.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setPreviewFile(null)}
                            className="text-slate-400 hover:text-white text-xs font-semibold"
                          >
                            Close Preview
                          </button>
                        </div>

                        {(previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf') ? (
                          <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "450px" }}>
                            <iframe 
                              src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`}
                              className="w-full h-full border-none"
                              title="PDF Viewer Frame"
                            ></iframe>
                          </div>
                        ) : (
                          <div className="p-8 text-center bg-dark-900 rounded-xl space-y-3">
                            <Icon name="layers" className="w-10 h-10 text-slate-500 mx-auto" />
                            <p className="text-slate-300 font-display font-semibold text-xs">
                              Dynamic preview is only supported for PDF assets.
                            </p>
                            <p className="text-[10px] text-slate-500 max-w-sm mx-auto">
                              For HYSYS files (.hsc), Matlab files (.m) or spreadsheets (.xlsx), please download the file directly to launch locally.
                            </p>
                            <a 
                              href={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`}
                              download
                              className="inline-block px-4 py-2 bg-accent-indigo hover:bg-indigo-600 transition-colors text-white font-display font-semibold text-xs rounded-lg mt-2"
                            >
                              Download Asset
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Reference Links Column */}
                  <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-6">
                      <h3 className="font-display font-bold text-base text-glow text-white">Study Reference Links</h3>
                      
                      {/* Form to submit links */}
                      <form onSubmit={handleAddLink} className="space-y-3">
                        <div>
                          <label className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1">
                            Reference Title
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Batch Reactor Heat Exchange video"
                            value={newLink.title}
                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                            className="glass-input w-full p-2 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1">
                            Paste URL (YouTube / website)
                          </label>
                          <input 
                            type="url" 
                            required
                            placeholder="https://..."
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            className="glass-input w-full p-2 rounded-lg text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 items-end">
                          <div>
                            <label className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1">
                              Category type
                            </label>
                            <select 
                              value={newLink.category}
                              onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                              className="glass-input w-full p-2 rounded-lg text-xs"
                            >
                              <option value="YouTube">YouTube</option>
                              <option value="Research Article">Research Article</option>
                              <option value="Reference Website">Reference Website</option>
                              <option value="Azeotropic Data">Azeotropic Data</option>
                            </select>
                          </div>
                          
                          <button 
                            type="submit"
                            disabled={isSavingLink}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-display font-semibold transition-colors flex items-center justify-center space-x-1"
                          >
                            <span>Add Reference</span>
                            <Icon name="plus" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>

                      {/* Reference links list */}
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 pt-1">
                        {referenceLinks.map((link) => {
                          const embedUrl = getYouTubeEmbedUrl(link.url);
                          const isYoutube = embedUrl !== null || link.category === 'YouTube';
                          
                          return (
                            <div key={link.id} className="glass-panel p-3.5 rounded-xl space-y-3 relative group">
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold font-display uppercase tracking-wider mb-2 border ${isYoutube ? 'bg-rose-500/10 text-rose-300 border-rose-500/10' : 'bg-accent-teal/10 text-accent-teal border-accent-teal/10'}`}>
                                    {link.category}
                                  </span>
                                  <h4 className="font-display font-semibold text-xs text-white line-clamp-2 leading-relaxed">
                                    {link.title}
                                  </h4>
                                </div>
                                <button 
                                  onClick={() => handleDeleteLink(link.id)}
                                  className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 p-1 rounded-md bg-dark-900 border border-white border-opacity-5 hover:text-accent-rose text-slate-500 transition-opacity"
                                  title="Delete Reference"
                                >
                                  <Icon name="trash" className="w-3 h-3" />
                                </button>
                              </div>

                              {isYoutube && embedUrl ? (
                                <div 
                                  onClick={() => setPlayingVideoUrl(embedUrl)}
                                  className="cursor-pointer relative group/video rounded-lg overflow-hidden border border-white border-opacity-10 bg-dark-950 aspect-video w-full flex items-center justify-center"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/40 to-indigo-900/30 group-hover/video:opacity-80 transition-opacity flex flex-col justify-end p-2.5">
                                    <span className="text-[9px] text-rose-300 font-semibold tracking-wide flex items-center space-x-1">
                                      <svg className="w-3 h-3 fill-rose-500 animate-pulse" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                      <span>Watch on Hub player</span>
                                    </span>
                                  </div>
                                  <div className="w-10 h-10 rounded-full bg-rose-600 bg-opacity-90 group-hover/video:scale-110 shadow-lg shadow-rose-600/30 transition-transform flex items-center justify-center text-white z-10">
                                    <Icon name="play" className="w-5 h-5 ml-0.5" />
                                  </div>
                                </div>
                              ) : (
                                <a 
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-1.5 bg-dark-950 hover:bg-dark-900 border border-white border-opacity-5 rounded-lg text-[10px] font-display font-semibold text-accent-teal flex items-center justify-center space-x-1"
                                >
                                  <span>Launch Reference</span>
                                  <Icon name="externalLink" className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          );
                        })}

                        {referenceLinks.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No reference links loaded.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="glass-panel border-t border-white border-opacity-5 py-4 px-6 mt-auto text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Chemical Engineering Hub Space. Designed for premium study acceleration.</p>
      </footer>
    </div>
  );
}

// Render React App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
