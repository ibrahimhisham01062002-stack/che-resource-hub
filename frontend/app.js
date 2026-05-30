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
    ),
    folder: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    folderPlus: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    check: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  const [selectedLevel, setSelectedLevel] = useState(() => {
    return localStorage.getItem("che_selected_level") || "Level-3";
  });
  const [selectedTerm, setSelectedTerm] = useState(() => {
    return localStorage.getItem("che_selected_term") || "Term-2";
  });
  
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
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  
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

  // Term-Final Question upload states
  const [questionUploadFile, setQuestionUploadFile] = useState(null);
  const [isQuestionUploading, setIsQuestionUploading] = useState(false);
  const [questionUploadProgress, setQuestionUploadProgress] = useState(0);
  const [questionUploadStatus, setQuestionUploadStatus] = useState({ type: "", message: "" });
  const questionFileInputRef = useRef(null);

  // Solution Manual upload states
  const [solutionUploadFile, setSolutionUploadFile] = useState(null);
  const [isSolutionUploading, setIsSolutionUploading] = useState(false);
  const [solutionUploadProgress, setSolutionUploadProgress] = useState(0);
  const [solutionUploadStatus, setSolutionUploadStatus] = useState({ type: "", message: "" });
  const solutionFileInputRef = useRef(null);

  // Term-Final Solved upload states
  const [solvedUploadFile, setSolvedUploadFile] = useState(null);
  const [isSolvedUploading, setIsSolvedUploading] = useState(false);
  const [solvedUploadProgress, setSolvedUploadProgress] = useState(0);
  const [solvedUploadStatus, setSolvedUploadStatus] = useState({ type: "", message: "" });
  const solvedFileInputRef = useRef(null);

  // Current active folder in slides section
  const [currentFolder, setCurrentFolder] = useState("Root");

  // Current active folder in recorded class section
  const [currentVideoFolder, setCurrentVideoFolder] = useState("Root");
  const [videoSearchQuery, setVideoSearchQuery] = useState("");

  // Recorded Class video upload states
  const [videoUploadFile, setVideoUploadFile] = useState(null);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [videoUploadStatus, setVideoUploadStatus] = useState({ type: "", message: "" });
  const videoFileInputRef = useRef(null);

  // Reference to track previous course ID to prevent tab resetting on same-course refresh
  const prevCourseIdRef = useRef(null);

  // Dynamic course creator states
  const [newCourse, setNewCourse] = useState({ code: "", title: "", description: "" });
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseError, setCourseError] = useState("");

  // Dynamic course editor states
  const [editingCourse, setEditingCourse] = useState(null);
  const [editCourseFields, setEditCourseFields] = useState({ code: "", title: "", description: "" });
  const [isSavingCourseEdit, setIsSavingCourseEdit] = useState(false);
  const [editCourseError, setEditCourseError] = useState("");

  // Administrative Passcode System States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPasswordInput, setAuthPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAuthCallback, setPendingAuthCallback] = useState(null);
  const [isAuthorizedState, setIsAuthorizedState] = useState(false);

  // Fetch all courses on mount
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
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

  // Persist Level & Term changes
  useEffect(() => {
    localStorage.setItem("che_selected_level", selectedLevel);
    localStorage.setItem("che_selected_term", selectedTerm);
  }, [selectedLevel, selectedTerm]);

  // Load PDF directly using standard streaming proxy endpoint
  useEffect(() => {
    if (!previewFile || !activeCourse) {
      setPreviewUrl("");
      setPreviewLoading(false);
      return;
    }
    
    const isPdf = (previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setPreviewUrl("");
      setPreviewLoading(false);
      return;
    }
    
    setPreviewLoading(true);
    
    // Set the preview URL directly to our secure streaming proxy endpoint.
    // This lets the browser natively stream and render the PDF (supporting range requests and fast page-by-page loading).
    const directUrl = `${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}?preview=true`;
    setPreviewUrl(directUrl);
    
    const timer = setTimeout(() => {
      setPreviewLoading(false);
    }, 1000); // Elegant 1-second overlay spinner for smooth transitions
    
    return () => {
      clearTimeout(timer);
    };
  }, [previewFile, activeCourse]);

  // Restore active course from localStorage once courses list is loaded
  useEffect(() => {
    if (courses.length > 0 && !activeCourse) {
      const savedCourseId = localStorage.getItem("che_active_course_id");
      if (savedCourseId) {
        const found = courses.find(c => c.id === savedCourseId);
        if (found) {
          setActiveCourse(found);
        }
      }
    }
  }, [courses]);

  // Persist active course ID when activeCourse changes
  useEffect(() => {
    if (activeCourse) {
      localStorage.setItem("che_active_course_id", activeCourse.id);
    } else {
      localStorage.removeItem("che_active_course_id");
    }
  }, [activeCourse]);

  // Fetch course-specific resources on active course change
  useEffect(() => {
    if (!activeCourse) return;
    
    // Only reset states if the student has switched to a different course
    const isNewCourse = prevCourseIdRef.current !== activeCourse.id;
    prevCourseIdRef.current = activeCourse.id;
    
    if (isNewCourse) {
      setPreviewFile(null);
      setFileSearchQuery("");
      setVideoSearchQuery("");
      setPrimarySection("books"); // Default to Books section
      setCurrentFolder("Root"); // Reset folder to Root
      setCurrentVideoFolder("Root"); // Reset video folder to Root
    }
    
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

  // Admin Session Expiry checker (12 hours duration)
  useEffect(() => {
    const checkStatus = () => {
      const authTime = localStorage.getItem("che_auth_until");
      setIsAuthorizedState(authTime && Date.now() < parseInt(authTime));
    };
    checkStatus();
    const interval = setInterval(checkStatus, 15000); // Check expiry every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Secure authorization wrapper for creating, editing, and deleting items
  const checkAuthAndExecute = (callback) => {
    const authTime = localStorage.getItem("che_auth_until");
    const isAuthorized = authTime && Date.now() < parseInt(authTime);
    
    if (isAuthorized) {
      callback();
    } else {
      setPendingAuthCallback(() => callback);
      setAuthPasswordInput("");
      setAuthError("");
      setShowAuthModal(true);
    }
  };

  // Passcode verification
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (authPasswordInput.trim() === "Chemical Engineering is Life") {
      const expiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours session
      localStorage.setItem("che_auth_until", expiry.toString());
      setIsAuthorizedState(true);
      setShowAuthModal(false);
      setAuthError("");
      
      if (pendingAuthCallback) {
        pendingAuthCallback();
        setPendingAuthCallback(null);
      }
    } else {
      setAuthError("Incorrect passcode. Access denied.");
    }
  };

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

  // Split files into Books, Solutions, Slides, Questions, Solved, and Videos
  const { booksList, solutionsList, slidesList, questionsList, solvedList, videosList } = useMemo(() => {
    if (!activeCourse || !activeCourse.files) return { booksList: [], solutionsList: [], slidesList: [], questionsList: [], solvedList: [], videosList: [] };
    const books = [];
    const solutions = [];
    const slides = [];
    const questions = [];
    const solved = [];
    const videos = [];

    activeCourse.files.forEach((file, index) => {
      const fileWithIndex = { ...file, index };
      const typeLower = (file.type || "").toLowerCase();

      if (typeLower.includes("video") || typeLower.includes("recorded class") || file.category === "video" || file.category === "recorded_class") {
        videos.push(fileWithIndex);
      } else if (typeLower.includes("reference book") || (typeLower.includes("book") && !typeLower.includes("manual") && !typeLower.includes("solved") && !typeLower.includes("solution"))) {
        books.push(fileWithIndex);
      } else if (typeLower.includes("solution manual") || typeLower.includes("manual")) {
        solutions.push(fileWithIndex);
      } else if (typeLower.includes("term-final question") || typeLower.includes("question")) {
        questions.push(fileWithIndex);
      } else if (typeLower.includes("term-final solved") || typeLower.includes("solved") || typeLower.includes("solve")) {
        solved.push(fileWithIndex);
      } else {
        slides.push(fileWithIndex);
      }
    });
    return { booksList: books, solutionsList: solutions, slidesList: slides, questionsList: questions, solvedList: solved, videosList: videos };
  }, [activeCourse]);



  // Handle dynamic course creation
  const handleCreateCourse = (e) => {
    if (e) e.preventDefault();
    if (!newCourse.code || !newCourse.title || !selectedLevel || !selectedTerm) {
      setCourseError("Please specify Course Code, Title, and select a Level & Term.");
      return;
    }
    checkAuthAndExecute(async () => {
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
          await fetchCourses();
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
    });
  };

  // Start course editing flow
  const handleStartEditCourse = (course) => {
    setEditingCourse(course);
    setEditCourseFields({
      code: course.code,
      title: course.title,
      description: course.description
    });
    setEditCourseError("");
  };

  // Save course updates
  const handleSaveCourseEdit = (e) => {
    if (e) e.preventDefault();
    if (!editCourseFields.code || !editCourseFields.title) {
      setEditCourseError("Course Code and Title are required.");
      return;
    }
    checkAuthAndExecute(async () => {
      setIsSavingCourseEdit(true);
      setEditCourseError("");
      try {
        const res = await fetch(`${API_BASE}/api/courses/${editingCourse.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editCourseFields)
        });
        if (res.ok) {
          await fetchCourses();
          setEditingCourse(null);
        } else {
          const errData = await res.json();
          setEditCourseError(errData.detail || "Failed to save course changes");
        }
      } catch (err) {
        setEditCourseError("Failed to save changes: connection error");
      } finally {
        setIsSavingCourseEdit(false);
      }
    });
  };

  // Handle adding a reference link
  const handleAddLink = (e) => {
    if (e) e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    checkAuthAndExecute(async () => {
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
    });
  };

  // Handle deleting a reference link
  const handleDeleteLink = (linkId) => {
    checkAuthAndExecute(async () => {
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
    });
  };

  // Handle deleting a course file
  const handleDeleteFile = (fileIndex) => {
    checkAuthAndExecute(async () => {
      if (!window.confirm("Are you sure you want to completely delete this file from the course catalog?")) {
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/files/${fileIndex}?t=${Date.now()}`, {
          method: "DELETE"
        });
        if (res.ok) {
          setPreviewFile(null);
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to delete file");
        }
      } catch (err) {
        alert("Delete failed: network error");
      }
    });
  };

  // Handle creating a virtual folder in the active course
  const handleCreateFolder = () => {
    checkAuthAndExecute(async () => {
      const folderName = window.prompt("Enter new folder name:");
      if (!folderName) return;
      const trimmed = folderName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/folders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: trimmed })
        });
        if (res.ok) {
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) {
            setActiveCourse(found);
            setCurrentFolder(trimmed); // Auto-select the newly created folder!
          }
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to create folder");
        }
      } catch (err) {
        alert("Failed to create folder: network error");
      }
    });
  };

  // Handle deleting a virtual folder and all its contents
  const handleDeleteFolder = (e, folderName) => {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking delete
    if (folderName === "Root") {
      alert("Cannot delete the Root folder");
      return;
    }
    checkAuthAndExecute(async () => {
      if (!window.confirm(`Are you sure you want to delete the folder "${folderName}"? This will completely purge all slides cataloged inside it!`)) {
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/folders/${encodeURIComponent(folderName)}?t=${Date.now()}`, {
          method: "DELETE"
        });
        if (res.ok) {
          if (currentFolder === folderName) {
            setCurrentFolder("Root");
          }
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to delete folder");
        }
      } catch (err) {
        alert("Failed to delete folder: network error");
      }
    });
  };

  // Handle renaming a virtual folder
  const handleRenameFolder = (e, oldName) => {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking rename
    if (oldName === "Root") {
      alert("Cannot rename the Root folder");
      return;
    }
    checkAuthAndExecute(async () => {
      const newName = window.prompt(`Enter new name for folder "${oldName}":`, oldName);
      if (!newName) return;
      const trimmed = newName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      if (trimmed === oldName) return;
      
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/folders/${encodeURIComponent(oldName)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ new_name: trimmed })
        });
        if (res.ok) {
          if (currentFolder === oldName) {
            setCurrentFolder(trimmed); // Preserves active folder view under the new name!
          }
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to rename folder");
        }
      } catch (err) {
        alert("Failed to rename folder: network error");
      }
    });
  };

  // Handle creating a virtual video folder in the active course
  const handleCreateVideoFolder = () => {
    checkAuthAndExecute(async () => {
      const folderName = window.prompt("Enter new video folder name:");
      if (!folderName) return;
      const trimmed = folderName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/video-folders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: trimmed })
        });
        if (res.ok) {
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) {
            setActiveCourse(found);
            setCurrentVideoFolder(trimmed); // Auto-select the newly created folder!
          }
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to create video folder");
        }
      } catch (err) {
        alert("Failed to create video folder: network error");
      }
    });
  };

  // Handle deleting a virtual video folder and all its contents
  const handleDeleteVideoFolder = (e, folderName) => {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking delete
    if (folderName === "Root") {
      alert("Cannot delete the Root folder");
      return;
    }
    checkAuthAndExecute(async () => {
      if (!window.confirm(`Are you sure you want to delete the video folder "${folderName}"? This will completely purge all recorded class videos cataloged inside it!`)) {
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/video-folders/${encodeURIComponent(folderName)}?t=${Date.now()}`, {
          method: "DELETE"
        });
        if (res.ok) {
          if (currentVideoFolder === folderName) {
            setCurrentVideoFolder("Root");
          }
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to delete video folder");
        }
      } catch (err) {
        alert("Failed to delete video folder: network error");
      }
    });
  };

  // Handle renaming a virtual video folder
  const handleRenameVideoFolder = (e, oldName) => {
    if (e) e.stopPropagation(); // Prevent selecting the folder chip when clicking rename
    if (oldName === "Root") {
      alert("Cannot rename the Root folder");
      return;
    }
    checkAuthAndExecute(async () => {
      const newName = window.prompt(`Enter new name for video folder "${oldName}":`, oldName);
      if (!newName) return;
      const trimmed = newName.trim();
      if (!trimmed) {
        alert("Folder name cannot be empty");
        return;
      }
      if (trimmed === oldName) return;
      
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/video-folders/${encodeURIComponent(oldName)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ new_name: trimmed })
        });
        if (res.ok) {
          if (currentVideoFolder === oldName) {
            setCurrentVideoFolder(trimmed); // Preserves active folder view under the new name!
          }
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          const data = await res.json();
          alert(data.detail || "Failed to rename video folder");
        }
      } catch (err) {
        alert("Failed to rename video folder: network error");
      }
    });
  };

  // Handle file downloads — fetches as blob to bypass cross-origin download attribute limitation
  // The HTML `download` attribute is silently ignored on cross-origin <a> tags by all browsers.
  // This function fetches the binary, creates a blob URL, and triggers a real download.
  const handleDownloadFile = async (fileIndex, fileName) => {
    if (!activeCourse) return;
    const url = `${API_BASE}/api/download/${activeCourse.id}/${fileIndex}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  // Handle file uploads
  const handleFileUpload = (e, file, category, setters) => {
    if (e) e.preventDefault();
    if (!file) return;
    
    checkAuthAndExecute(() => {
      const { setIsUploading, setUploadProgress, setUploadStatus, setUploadFile, fileInputRef } = setters;
      
      setIsUploading(true);
      setUploadStatus({ type: "", message: "" });
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category); // "book" or "slide" or "video"
      if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
        formData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
      }

      const xhr = new XMLHttpRequest();
      
      // Monitor upload progress in real-time!
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 90);
          setUploadProgress(percentage);
        }
      });

      xhr.addEventListener("load", async () => {
        setUploadProgress(95);
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus({ type: "success", message: "File uploaded successfully!" });
          setUploadFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) setActiveCourse(found);
        } else {
          let errorMessage = "Upload failed";
          try {
            const data = JSON.parse(xhr.responseText);
            errorMessage = data.detail || errorMessage;
          } catch (e) {}
          setUploadStatus({ type: "error", message: errorMessage });
        }
        
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 800);
      });

      xhr.addEventListener("error", () => {
        setUploadStatus({ type: "error", message: "Upload failed: network error" });
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 800);
      });

      xhr.open("POST", `${API_BASE}/api/upload/${activeCourse.id}`);
      xhr.send(formData);
    });
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
    return slidesList.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
                            f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
      const fileFolder = f.folder || "Root";
      return matchesSearch && fileFolder === currentFolder;
    });
  }, [slidesList, fileSearchQuery, currentFolder]);

  // Filtering videos inside active section
  const filteredVideos = useMemo(() => {
    return videosList.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
                            f.type.toLowerCase().includes(videoSearchQuery.toLowerCase());
      const fileFolder = f.folder || "Root";
      return matchesSearch && fileFolder === currentVideoFolder;
    });
  }, [videosList, videoSearchQuery, currentVideoFolder]);

  // Filtering questions inside active section
  const filteredQuestions = useMemo(() => {
    return questionsList.filter(f => 
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(fileSearchQuery.toLowerCase())
    );
  }, [questionsList, fileSearchQuery]);

  // Filtering solutions inside active section
  const filteredSolutions = useMemo(() => {
    return solutionsList.filter(f => 
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(fileSearchQuery.toLowerCase())
    );
  }, [solutionsList, fileSearchQuery]);

  // Filtering solved inside active section
  const filteredSolved = useMemo(() => {
    return solvedList.filter(f =>
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(fileSearchQuery.toLowerCase())
    );
  }, [solvedList, fileSearchQuery]);

  // Pre-compiled colorful stats dashboard counts
  const totalFilesCount = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.fileCount || 0), 0);
  }, [courses]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center flex-col space-y-4">
        <div className="w-12 h-12 border-4 border-accent-sky border-t-transparent rounded-full animate-spin"></div>
        <p className="text-glow text-accent-sky font-display font-medium tracking-wide">Loading Academic Space...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Course Editor Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30">
            <button 
              onClick={() => setEditingCourse(null)}
              className="absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent-sky">
                <Icon name="edit" className="w-5 h-5 animate-pulse" />
                <h3 className="font-display font-bold text-lg text-white">Edit Course Details</h3>
              </div>
              
              <form onSubmit={handleSaveCourseEdit} className="space-y-4 pt-2">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1">
                    Course Code
                  </label>
                  <input 
                    type="text" 
                    required
                    value={editCourseFields.code}
                    onChange={(e) => setEditCourseFields({ ...editCourseFields, code: e.target.value })}
                    className="glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1">
                    Course Title
                  </label>
                  <input 
                    type="text" 
                    required
                    value={editCourseFields.title}
                    onChange={(e) => setEditCourseFields({ ...editCourseFields, title: e.target.value })}
                    className="glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1">
                    Description
                  </label>
                  <textarea 
                    rows={3}
                    value={editCourseFields.description}
                    onChange={(e) => setEditCourseFields({ ...editCourseFields, description: e.target.value })}
                    className="glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500 resize-none"
                  />
                </div>
                
                {editCourseError && (
                  <p className="text-xs text-rose-400 font-semibold">{editCourseError}</p>
                )}
                
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="w-1/2 py-2.5 che-cancel-btn font-display font-semibold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCourseEdit}
                    className="w-1/2 py-2.5 che-submit-btn text-white font-display font-semibold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    {isSavingCourseEdit ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Premium Admin Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-rose border-opacity-30">
            <button 
              onClick={() => { setShowAuthModal(false); setPendingAuthCallback(null); }}
              className="absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-accent-rose mx-auto mb-2 animate-bounce">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="font-display font-bold text-lg text-white">Administrative Lock</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                This action requires administrative authorization. Enter the academic access passcode to unlock edits.
              </p>
              
              <form onSubmit={handleVerifyPassword} className="space-y-4 pt-2">
                <div>
                  <input 
                    type="password" 
                    required
                    placeholder="Enter session passcode..."
                    value={authPasswordInput}
                    onChange={(e) => setAuthPasswordInput(e.target.value)}
                    className="glass-input w-full p-2.5 rounded-xl text-sm focus:border-rose-500 text-center"
                    autoFocus
                  />
                </div>
                
                {authError && (
                  <p className="text-xs text-rose-400 font-semibold">{authError}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-accent-rose to-red-600 text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-rose-500/25 transition-transform hover:scale-[1.02]"
                >
                  Verify and Unlock (1 Hour)
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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
      <header className="glass-panel sticky top-0 z-40 border-b border-white border-opacity-10 px-4 md:px-6 py-3.5 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-0">
        
        {/* Row 1: Brand Logo & Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-2.5 md:space-x-3 cursor-pointer" onClick={() => { setActiveCourse(null); setSearchQuery(""); setFileSearchQuery(""); }}>
            <img 
              src="che_hub_logo.png" 
              alt="ChE StudySpace Logo" 
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl shadow-lg shadow-sky-500/20 object-cover flex-shrink-0 border border-white/10" 
            />
            <div className="min-w-0">
              <h1 className="font-display font-extrabold text-base md:text-lg tracking-wide text-glow"><span className="che-brand-text">ChE</span> <span className="gradient-text">StudySpace</span></h1>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-widest uppercase truncate">Department of Chemical Engineering</p>
            </div>
          </div>
          
          {activeCourse && (
            <button
              onClick={() => { setActiveCourse(null); setSearchQuery(""); setFileSearchQuery(""); }}
              className="md:hidden bg-dark-900 hover:bg-dark-800 border border-white border-opacity-10 px-3 py-1.5 rounded-xl text-[10px] font-display font-semibold text-slate-300"
            >
              Back to Hub
            </button>
          )}
        </div>
        
        {/* Row 2: Stats & Selector (Always Visible) */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4 md:space-x-8 text-sm border-t border-white/5 pt-2.5 md:pt-0 md:border-t-0">
          <div className="hidden md:block text-right">
            <span className="text-slate-400 block text-[11px] font-medium tracking-wider uppercase">Active Courses</span>
            <span className="font-display font-semibold text-white">{courses.length} courses</span>
          </div>
          <div className="hidden md:block h-8 w-px bg-white bg-opacity-10"></div>
          
          {/* Resources Loaded stat */}
          <div className="text-left md:text-right">
            <span className="text-slate-400 block text-[9px] md:text-[11px] font-semibold tracking-wider uppercase">Resources Loaded</span>
            <span className="font-display font-bold text-xs md:text-sm text-accent-sky">{totalFilesCount} files</span>
          </div>
          
          <div className="h-6 md:h-8 w-px bg-white bg-opacity-10"></div>

          {/* Padlock Session Status */}
          <div className="flex items-center space-x-1.5 cursor-pointer select-none" onClick={() => {
            if (isAuthorizedState) {
              if (window.confirm("Do you want to end your administrator session?")) {
                localStorage.removeItem("che_auth_until");
                setIsAuthorizedState(false);
              }
            } else {
              checkAuthAndExecute(() => {});
            }
          }}>
            <span className={`w-2 h-2 rounded-full ${isAuthorizedState ? 'bg-violet-400 animate-pulse' : 'bg-slate-500'}`}></span>
            <span className={`font-display text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isAuthorizedState ? 'text-violet-400' : 'text-slate-500'}`}>
              {isAuthorizedState ? '🔓 Admin Active' : '🔒 Guest'}
            </span>
          </div>

          <div className="h-6 md:h-8 w-px bg-white bg-opacity-10"></div>
          
          {/* Unified Level and Term Dropdown */}
          <div className="flex flex-col text-left">
            <span className="text-slate-400 block text-[9px] md:text-[10px] font-bold tracking-wider uppercase mb-1">Level and term</span>
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
              className="glass-input px-2.5 py-1.5 rounded-xl text-[10px] md:text-[11px] font-semibold bg-dark-900 cursor-pointer focus:border-sky-500 border border-white/10"
            >
              <option value="">All Levels & Terms</option>
              <option value="Level-1, Term-1">Level 1, Term 1</option>
              <option value="Level-1, Term-2">Level 1, Term 2</option>
              <option value="Level-2, Term-1">Level 2, Term 1</option>
              <option value="Level-2, Term-2">Level 2, Term 2</option>
              <option value="Level-3, Term-1">Level 3, Term 1</option>
              <option value="Level-3, Term-2">Level 3, Term 2</option>
              <option value="Level-4, Term-1">Level 4, Term 1</option>
              <option value="Level-4, Term-2">Level 4, Term 2</option>
            </select>
          </div>

        </div>
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
                  className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:border-sky-500"
                />
                <Icon name="search" className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              {/* Inline Course Creator Card */}
              {selectedLevel && selectedTerm && (
                <div className="glass-panel border-dashed border-2 border-sky-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] bg-sky-950/5 relative overflow-hidden group">
                  <div className="z-10 w-full space-y-3">
                    <div className="flex items-center space-x-2 text-sky-300">
                      <Icon name="plus" className="w-5 h-5 text-accent-sky animate-pulse" />
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
                        className="w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1"
                      >
                        <span>{isCreatingCourse ? "Adding Course..." : "Add Course"}</span>
                        <Icon name="chevronRight" className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {filteredCourses.map((course, idx) => {

                // Generates dynamic aesthetic gradient backgrounds by course code
                const gradients = [
                  "from-accent-sky to-sky-900/30",
                  "from-accent-violet to-violet-900/30",
                  "from-accent-violet to-violet-900/30",
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
                      {/* Course badge & Edit icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="che-course-badge inline-block px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/10 font-display">
                          {course.code}
                        </span>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEditCourse(course);
                          }}
                          className="che-edit-course-btn p-1.5 rounded-lg bg-white border border-slate-200 transition-all relative z-10"
                          title="Edit Course Details"
                        >
                          <Icon name="edit" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Course title */}
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-sky transition-colors line-clamp-1">
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
                        <Icon name="fileText" className="w-3.5 h-3.5 text-accent-sky" />
                        <span>{course.fileCount} resources</span>
                      </div>
                      <div className="flex items-center text-xs text-accent-sky font-medium group-hover:translate-x-1 transition-transform">
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
          </div>
        ) : (
          
          /* DETAILED COURSE SPACE */
          <div className="space-y-6 flex-grow flex flex-col che-course-workspace">
            
            {/* Top Workspace Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white border-opacity-5 pb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => { setActiveCourse(null); setSearchQuery(""); setFileSearchQuery(""); }}
                  className="che-back-btn p-2.5 rounded-xl transition-all hover:scale-105"
                  title="Back to Hub"
                >
                  <Icon name="arrowLeft" className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-sky/20 text-accent-sky border border-accent-sky/10 uppercase tracking-widest font-display">
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

              {/* Five Primary Subsection Switchers */}
              <div className="flex bg-dark-950 p-1 rounded-xl border border-white border-opacity-5 flex-wrap gap-1 self-start md:self-center">
                <button
                  onClick={() => { setPrimarySection("books"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'books' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="book" className="w-3.5 h-3.5" />
                  <span>Books</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("solutions"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'solutions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="edit" className="w-3.5 h-3.5" />
                  <span>Solution Manual</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("slides"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'slides' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="layers" className="w-3.5 h-3.5" />
                  <span>slides</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("videos"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'videos' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="video" className="w-3.5 h-3.5" />
                  <span>Recorded Class</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("questions"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'questions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="fileText" className="w-3.5 h-3.5" />
                  <span>Term-Final Question</span>
                </button>
                <button
                  onClick={() => { setPrimarySection("solved"); setPreviewFile(null); }}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'solved' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Icon name="check" className="w-3.5 h-3.5" />
                  <span>Term-Final Solved</span>
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
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
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
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {bookUploadFile ? `Selected: ${bookUploadFile.name}` : "Upload reference textbooks or manuals directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {bookUploadFile && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setBookUploadFile(null); if (bookFileInputRef.current) bookFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isBookUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isBookUploading ? "Uploading..." : "Save to Books"}</span>
                              <Icon name="plus" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isBookUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${bookUploadProgress}%` }}></div>
                        </div>
                      )}

                      {bookUploadStatus.message && (
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${bookUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
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
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="bookOpen" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; PDF Textbook
                                  </span>
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => handleDeleteFile(file.index)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Textbook"
                                >
                                  <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                </button>
                                <button 
                                  onClick={() => handleDownloadFile(file.index, file.name)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </button>
                              </div>
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
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-sky" />
                            <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                              Reading: {previewFile.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setPreviewFile(null)}
                            className="che-close-reader-btn"
                          >
                            Close Reader
                          </button>
                        </div>

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                          {previewLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
                              <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
                              <div className="text-center space-y-1">
                                <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
                                <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
                              </div>
                            </div>
                          ) : previewUrl ? (
                            <iframe 
                              src={previewUrl}
                              className="w-full h-full border-none"
                              title="PDF Viewer Frame"
                            ></iframe>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
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

              {/* SUBSECTION 3: TERM-FINAL QUESTIONS */}
              {primarySection === 'questions' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-fade-in">
                  
                  {/* Left Column: Questions List & Search */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Term-Final Questions</h3>
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
                          {questionsList.length} papers
                        </span>
                      </div>

                      {/* PDF drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, questionUploadFile, "question", {
                        setIsUploading: setIsQuestionUploading,
                        setUploadProgress: setQuestionUploadProgress,
                        setUploadStatus: setQuestionUploadStatus,
                        setUploadFile: setQuestionUploadFile,
                        fileInputRef: questionFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setQuestionUploadFile(e.target.files[0])}
                          className="hidden" 
                          id="question-upload-input"
                          ref={questionFileInputRef}
                        />
                        <label 
                          htmlFor="question-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {questionUploadFile ? `Selected: ${questionUploadFile.name}` : "Upload term-final exam question papers directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {questionUploadFile && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setQuestionUploadFile(null); if (questionFileInputRef.current) questionFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isQuestionUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isQuestionUploading ? "Uploading..." : "Save to Questions"}</span>
                              <Icon name="plus" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isQuestionUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${questionUploadProgress}%` }}></div>
                        </div>
                      )}

                      {questionUploadStatus.message && (
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${questionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {questionUploadStatus.message}
                        </div>
                      )}
                      
                      {/* Search questions */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search questions..."
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* Questions list */}
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {filteredQuestions.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="fileText" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; PDF Question Paper
                                  </span>
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => handleDeleteFile(file.index)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Question"
                                >
                                  <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                </button>
                                <button 
                                  onClick={() => handleDownloadFile(file.index, file.name)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {filteredQuestions.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No exam questions cataloged inside this folder.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Split Screen PDF Viewer */}
                  <div className="lg:col-span-2">
                    {previewFile ? (
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-sky" />
                            <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                              Reading: {previewFile.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setPreviewFile(null)}
                            className="che-close-reader-btn"
                          >
                            Close Reader
                          </button>
                        </div>

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                          {previewLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
                              <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
                              <div className="text-center space-y-1">
                                <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
                                <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
                              </div>
                            </div>
                          ) : previewUrl ? (
                            <iframe 
                              src={previewUrl}
                              className="w-full h-full border-none"
                              title="PDF Viewer Frame"
                            ></iframe>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                          <Icon name="fileText" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Term-Final Questions Reader</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any term-final question paper from the left catalog to launch our integrated full-screen PDF workspace.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* SUBSECTION 4: TERM-FINAL SOLVES */}
              {primarySection === 'solutions' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-fade-in">
                  
                  {/* Left Column: Solutions List & Search */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Solution Manuals</h3>
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
                          {solutionsList.length} manuals
                        </span>
                      </div>

                      {/* PDF drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, solutionUploadFile, "solution", {
                        setIsUploading: setIsSolutionUploading,
                        setUploadProgress: setSolutionUploadProgress,
                        setUploadStatus: setSolutionUploadStatus,
                        setUploadFile: setSolutionUploadFile,
                        fileInputRef: solutionFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setSolutionUploadFile(e.target.files[0])}
                          className="hidden" 
                          id="solution-upload-input"
                          ref={solutionFileInputRef}
                        />
                        <label 
                          htmlFor="solution-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {solutionUploadFile ? `Selected: ${solutionUploadFile.name}` : "Upload exam solutions or step-by-step guides directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {solutionUploadFile && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSolutionUploadFile(null); if (solutionFileInputRef.current) solutionFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSolutionUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSolutionUploading ? "Uploading..." : "Save to Solves"}</span>
                              <Icon name="plus" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isSolutionUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${solutionUploadProgress}%` }}></div>
                        </div>
                      )}

                      {solutionUploadStatus.message && (
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${solutionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {solutionUploadStatus.message}
                        </div>
                      )}
                      
                      {/* Search solutions */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search solves..."
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* Solutions list */}
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {filteredSolutions.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="edit" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; PDF Exam Solve
                                  </span>
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => handleDeleteFile(file.index)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Solve"
                                >
                                  <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                </button>
                                <button 
                                  onClick={() => handleDownloadFile(file.index, file.name)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {filteredSolutions.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No exam solutions cataloged inside this folder.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Split Screen PDF Viewer */}
                  <div className="lg:col-span-2">
                    {previewFile ? (
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-sky" />
                            <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                              Reading: {previewFile.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setPreviewFile(null)}
                            className="che-close-reader-btn"
                          >
                            Close Reader
                          </button>
                        </div>

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                          {previewLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
                              <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
                              <div className="text-center space-y-1">
                                <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
                                <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
                              </div>
                            </div>
                          ) : previewUrl ? (
                            <iframe 
                              src={previewUrl}
                              className="w-full h-full border-none"
                              title="PDF Viewer Frame"
                            ></iframe>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                          <Icon name="edit" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Solution Manuals Reader</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any solution manual or guide from the left catalog to launch our integrated full-screen PDF workspace.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* SUBSECTION 5: TERM-FINAL SOLVED */}
              {primarySection === 'solved' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-fade-in">

                  {/* Left Column: Solved List & Search */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Term-Final Solved</h3>
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
                          {solvedList.length} solved papers
                        </span>
                      </div>

                      {/* PDF drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, solvedUploadFile, "solved", {
                        setIsUploading: setIsSolvedUploading,
                        setUploadProgress: setSolvedUploadProgress,
                        setUploadStatus: setSolvedUploadStatus,
                        setUploadFile: setSolvedUploadFile,
                        fileInputRef: solvedFileInputRef
                      })} className="relative group">
                        <input
                          type="file"
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setSolvedUploadFile(e.target.files[0])}
                          className="hidden"
                          id="solved-upload-input"
                          ref={solvedFileInputRef}
                        />
                        <div
                          onClick={() => checkAuthAndExecute(() => solvedFileInputRef.current?.click())}
                          className="border-2 border-dashed border-white border-opacity-10 rounded-xl p-4 text-center cursor-pointer transition-all hover:border-accent-sky hover:bg-white/5 flex flex-col items-center justify-center space-y-2"
                        >
                          <div className="p-2 rounded-lg bg-sky-500/10 text-accent-sky">
                            <Icon name="upload" className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Drag & drop solved answer or click</p>
                            <p className="text-[9px] text-slate-400 mt-1">Supports PDF, DOCX (Max 2GB via Telegram)</p>
                          </div>
                        </div>

                        {solvedUploadFile && (
                          <div className="mt-3 p-3 bg-dark-900 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span className="text-xs font-semibold text-slate-200 truncate max-w-[150px]">{solvedUploadFile.name}</span>
                              <span className="text-[9px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{(solvedUploadFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                type="submit"
                                disabled={isSolvedUploading}
                                className="px-2.5 py-1 che-submit-btn disabled:opacity-50 text-[10px] font-bold text-white rounded-lg transition-all"
                              >
                                {isSolvedUploading ? "Saving..." : "Upload"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setSolvedUploadFile(null)}
                                className="px-2.5 py-1 che-cancel-btn text-[10px] rounded-lg transition-all font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {isSolvedUploading && (
                          <div className="space-y-1.5 mt-3">
                            <div className="flex justify-between text-[10px] font-semibold text-slate-300">
                              <span>Uploading to Private Telegram Storage...</span>
                              <span>{solvedUploadProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-[#5C061C] rounded-full transition-all duration-300" style={{ width: `${solvedUploadProgress}%` }}></div>
                            </div>
                          </div>
                        )}

                        {solvedUploadStatus.message && (
                          <div className={`mt-3 p-2.5 rounded-xl border text-[10px] font-semibold flex items-center justify-between ${solvedUploadStatus.type === 'success' ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                            <span>{solvedUploadStatus.message}</span>
                            <button type="button" onClick={() => setSolvedUploadStatus({ type: '', message: '' })} className="text-slate-400 hover:text-white ml-2 text-xs">×</button>
                          </div>
                        )}
                      </form>

                      {/* File Catalog List */}
                      <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                        {filteredSolved.length === 0 ? (
                          <div className="text-center py-8 text-slate-500 text-xs">
                            No solved answers uploaded yet.
                          </div>
                        ) : (
                          filteredSolved.map((file) => {
                            const isCurrentlyPreviewing = previewFile && previewFile.index === file.index;
                            return (
                              <div
                                key={file.index}
                                onClick={() => setPreviewFile(file)}
                                className={`group p-3 pr-24 relative rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isCurrentlyPreviewing ? 'bg-sky-500/10 border-accent-sky' : 'bg-dark-900/50 border-white/5 hover:border-white/10 hover:bg-dark-900'}`}
                              >
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div className="p-2 rounded-lg bg-sky-500/10 text-accent-sky group-hover:scale-110 transition-transform">
                                    <Icon name="check" className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="che-book-title truncate group-hover:text-white transition-colors">{file.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">{file.size} • {file.type}</p>
                                  </div>
                                </div>
                                <div className="absolute bottom-3 right-3 flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteFile(file.index)}
                                    className="p-1.5 bg-dark-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg border border-white/5 transition-all"
                                    title="Delete file"
                                  >
                                    <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(file.index, file.name)}
                                    className="p-1.5 bg-dark-900 hover:bg-sky-600 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-all"
                                    title="Download file"
                                  >
                                    <Icon name="download" className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: PDF Reader Pane */}
                  <div className="lg:col-span-2 space-y-6">
                    {previewFile && solvedList.some(f => f.index === previewFile.index) ? (
                      <div className="glass-panel p-6 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-base text-white truncate">{previewFile.name}</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">Size: {previewFile.size} • Category: {previewFile.type}</p>
                          </div>
                          <button
                            onClick={() => setPreviewFile(null)}
                            className="che-close-reader-btn"
                          >
                            Close Reader
                          </button>
                        </div>

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                          {previewLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
                              <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
                              <div className="text-center space-y-1">
                                <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
                                <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
                              </div>
                            </div>
                          ) : previewUrl ? (
                            <iframe 
                              src={previewUrl}
                              className="w-full h-full border-none"
                              title="PDF Viewer Frame"
                            ></iframe>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                          <Icon name="check" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Term-Final Solved Reader</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any term-final solved answer or guide from the left catalog to launch our integrated full-screen PDF workspace.
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

                      {/* Virtual Folders Section */}
                      <div className="space-y-3 pb-4 border-b border-white border-opacity-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase">Folders</span>
                          <button
                            type="button"
                            onClick={handleCreateFolder}
                            className="flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-md border border-sky-500/20"
                          >
                            <Icon name="folderPlus" className="w-3 h-3" />
                            <span>Create Folder</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(activeCourse.folders || ["Root"]).map((folder) => {
                            const isSelected = currentFolder === folder;
                            return (
                              <button
                                key={folder}
                                type="button"
                                onClick={() => { setCurrentFolder(folder); setPreviewFile(null); }}
                                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all border ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' 
                                    : 'bg-dark-900 border-white border-opacity-5 text-slate-400 hover:text-slate-200 hover:bg-sky-950/10'
                                }`}
                              >
                                <Icon name="folder" className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`} />
                                <span>{folder}</span>
                                {folder !== "Root" && (
                                  <div className="flex items-center space-x-1 ml-1.5">
                                    <span 
                                      onClick={(e) => handleRenameFolder(e, folder)}
                                      className={`p-0.5 rounded hover:bg-white/20 transition-all ${isSelected ? 'text-white' : 'text-slate-500 hover:text-sky-300'}`}
                                      title={`Rename ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </span>
                                    <span 
                                      onClick={(e) => handleDeleteFolder(e, folder)}
                                      className={`p-0.5 rounded hover:bg-white/20 transition-all ${isSelected ? 'text-white' : 'text-slate-500 hover:text-rose-400'}`}
                                      title={`Delete ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
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
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-8 h-8 text-accent-sky mb-3 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-xs text-sky-300 text-center max-w-lg px-4">
                            {slideUploadFile ? `Selected: ${slideUploadFile.name}` : "Upload slides, manuals, MATLAB/HYSYS scripts, or any other resources that might be helpful to the course."}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">Drag and drop or click to browse</p>
                        </label>
                        
                        {slideUploadFile && (
                          <div className="flex items-center space-x-3 mt-3 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSlideUploadFile(null); if (slideFileInputRef.current) slideFileInputRef.current.value = ""; }}
                              className="px-3 py-1.5 che-cancel-btn rounded-lg text-xs font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSlideUploading}
                              className="px-4 py-1.5 che-submit-btn text-white rounded-lg text-xs font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSlideUploading ? "Uploading..." : "Save to slides"}</span>
                              <Icon name="plus" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isSlideUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${slideUploadProgress}%` }}></div>
                        </div>
                      )}

                      {slideUploadStatus.message && (
                        <div className={`p-3 rounded-lg text-xs font-display font-medium ${slideUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
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
                              className={`glass-panel border-opacity-5 p-3 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name={(file.type || "").toUpperCase().includes('PDF') || (file.name || "").toLowerCase().endsWith('.pdf') ? 'fileText' : 'layers'} className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="che-book-title block line-clamp-1 leading-normal">
                                    {file.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-display">
                                    {file.type} &bull; {file.size}
                                  </span>
                                </div>
                              </div>

                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => setPreviewFile(file)}
                                  className="che-view-btn"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => handleDeleteFile(file.index)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Asset"
                                >
                                  <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                </button>
                                <button 
                                  onClick={() => handleDownloadFile(file.index, file.name)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </button>
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
                      <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky">
                        <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                          <div className="flex items-center space-x-2">
                            <Icon name="fileText" className="w-5 h-5 text-accent-sky" />
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
                            {previewLoading ? (
                              <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
                                <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
                                <div className="text-center space-y-1">
                                  <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
                                  <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
                                </div>
                              </div>
                            ) : previewUrl ? (
                              <iframe 
                                src={previewUrl}
                                className="w-full h-full border-none"
                                title="PDF Viewer Frame"
                              ></iframe>
                            ) : null}
                          </div>
                        ) : (previewFile.type || "").toUpperCase().includes('VIDEO') || (previewFile.type || "").toUpperCase().includes('RECORDED CLASS') || (previewFile.name || "").toLowerCase().endsWith('.mp4') || (previewFile.name || "").toLowerCase().endsWith('.webm') || (previewFile.name || "").toLowerCase().endsWith('.ogg') || (previewFile.name || "").toLowerCase().endsWith('.mov') || (previewFile.name || "").toLowerCase().endsWith('.mkv') ? (
                          <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ minHeight: "360px" }}>
                            <video 
                              src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`} 
                              controls 
                              preload="metadata"
                              playsInline
                              className="w-full h-full rounded-xl shadow-lg border border-white border-opacity-5" 
                              style={{ maxHeight: "480px" }}
                            />
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
                            <button 
                              onClick={() => handleDownloadFile(previewFile.index, previewFile.name)}
                              className="inline-block px-4 py-2 bg-accent-sky hover:bg-sky-600 transition-colors text-white font-display font-semibold text-xs rounded-lg mt-2"
                            >
                              Download Asset
                            </button>
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
                            className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-display font-semibold transition-colors flex items-center justify-center space-x-1"
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
                                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold font-display uppercase tracking-wider mb-2 border ${isYoutube ? 'bg-rose-500/10 text-rose-300 border-rose-500/10' : 'bg-accent-violet/10 text-accent-violet border-accent-violet/10'}`}>
                                    {link.category}
                                  </span>
                                  <h4 className="font-display font-semibold text-xs text-white line-clamp-2 leading-relaxed">
                                    {link.title}
                                  </h4>
                                </div>
                                <button 
                                  onClick={() => handleDeleteLink(link.id)}
                                  className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 p-1 rounded-md bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 transition-opacity"
                                  title="Delete Reference"
                                >
                                  <Icon name="trash" className="w-3 h-3 !text-rose-700 hover:!text-rose-900" />
                                </button>
                              </div>

                              {isYoutube && embedUrl ? (
                                <div 
                                  onClick={() => setPlayingVideoUrl(embedUrl)}
                                  className="cursor-pointer relative group/video rounded-lg overflow-hidden border border-white border-opacity-10 bg-dark-950 aspect-video w-full flex items-center justify-center"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/40 to-sky-900/30 group-hover/video:opacity-80 transition-opacity flex flex-col justify-end p-2.5">
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
                                  className="w-full py-1.5 bg-dark-950 hover:bg-dark-900 border border-white border-opacity-5 rounded-lg text-[10px] font-display font-semibold text-accent-violet flex items-center justify-center space-x-1"
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

              {primarySection === 'videos' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-fade-in">
                  
                  {/* Videos list */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <h3 className="font-display font-bold text-lg text-white">Recorded Class Videos</h3>
                        <div className="relative w-full sm:w-64">
                          <input 
                            type="text"
                            placeholder="Filter videos..."
                            value={videoSearchQuery}
                            onChange={(e) => setVideoSearchQuery(e.target.value)}
                            className="glass-input w-full pl-9 pr-3 py-1.5 rounded-lg text-xs"
                          />
                          <Icon name="search" className="absolute left-3 top-2.5 w-3 h-3 text-slate-400" />
                        </div>
                      </div>

                      {/* Virtual Folders Section */}
                      <div className="space-y-3 pb-4 border-b border-white border-opacity-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase">Video Folders</span>
                          <button
                            type="button"
                            onClick={handleCreateVideoFolder}
                            className="flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-md border border-sky-500/20"
                          >
                            <Icon name="folderPlus" className="w-3 h-3" />
                            <span>Create Folder</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(activeCourse.video_folders || ["Root"]).map((folder) => {
                            const isSelected = currentVideoFolder === folder;
                            return (
                              <button
                                key={folder}
                                type="button"
                                onClick={() => { setCurrentVideoFolder(folder); setPreviewFile(null); }}
                                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all border ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' 
                                    : 'bg-dark-900 border-white border-opacity-5 text-slate-400 hover:text-slate-200 hover:bg-sky-950/10'
                                }`}
                              >
                                <Icon name="folder" className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`} />
                                <span>{folder}</span>
                                {folder !== "Root" && (
                                  <div className="flex items-center space-x-1 ml-1.5">
                                    <span 
                                      onClick={(e) => handleRenameVideoFolder(e, folder)}
                                      className={`p-0.5 rounded hover:bg-white/20 transition-all ${isSelected ? 'text-white' : 'text-slate-500 hover:text-sky-300'}`}
                                      title={`Rename ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </span>
                                    <span 
                                      onClick={(e) => handleDeleteVideoFolder(e, folder)}
                                      className={`p-0.5 rounded hover:bg-white/20 transition-all ${isSelected ? 'text-white' : 'text-slate-500 hover:text-rose-400'}`}
                                      title={`Delete ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Video drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, videoUploadFile, "video", {
                        setIsUploading: setIsVideoUploading,
                        setUploadProgress: setVideoUploadProgress,
                        setUploadStatus: setVideoUploadStatus,
                        setUploadFile: setVideoUploadFile,
                        fileInputRef: videoFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          accept="video/*"
                          onChange={(e) => setVideoUploadFile(e.target.files[0])}
                          className="hidden" 
                          id="video-upload-input"
                          ref={videoFileInputRef}
                        />
                        <label 
                          htmlFor="video-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-8 h-8 text-accent-sky mb-3 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-xs text-sky-300 text-center max-w-lg px-4">
                            {videoUploadFile ? `Selected: ${videoUploadFile.name}` : "Upload recorded lectures, tutorials, HYSYS demos, or any other videos that might be helpful to the course."}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">Drag and drop or click to browse</p>
                        </label>
                        
                        {videoUploadFile && (
                          <div className="flex items-center space-x-3 mt-3 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setVideoUploadFile(null); if (videoFileInputRef.current) videoFileInputRef.current.value = ""; }}
                              className="px-3 py-1.5 che-cancel-btn rounded-lg text-xs font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isVideoUploading}
                              className="px-4 py-1.5 che-submit-btn text-white rounded-lg text-xs font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isVideoUploading ? "Uploading..." : "Save to videos"}</span>
                              <Icon name="plus" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isVideoUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${videoUploadProgress}%` }}></div>
                        </div>
                      )}

                      {videoUploadStatus.message && (
                        <div className={`p-3 rounded-lg text-xs font-display font-medium ${videoUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {videoUploadStatus.message}
                        </div>
                      )}

                      {/* List of video files */}
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {filteredVideos.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              className={`glass-panel border-opacity-5 p-3 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="video" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <span className="che-book-title block line-clamp-1 leading-normal">
                                    {file.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-display">
                                    {file.type} &bull; {file.size}
                                  </span>
                                </div>
                              </div>

                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => setPreviewFile(file)}
                                  className="che-view-btn"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => handleDeleteFile(file.index)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Video"
                                >
                                  <Icon name="trash" className="w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900" />
                                </button>
                                <button 
                                  onClick={() => handleDownloadFile(file.index, file.name)}
                                  className="p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white"
                                  title="Download"
                                >
                                  <Icon name="download" className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {filteredVideos.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No recorded videos cataloged inside this folder yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive File Preview Pane */}
                  {previewFile && (
                    <div className="glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky">
                      <div className="flex items-center justify-between border-b border-white border-opacity-5 pb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="video" className="w-5 h-5 text-accent-sky" />
                          <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                            Play Class: {previewFile.name}
                          </h4>
                        </div>
                        <button 
                          onClick={() => setPreviewFile(null)}
                          className="che-close-reader-btn"
                        >
                          Close Preview
                        </button>
                      </div>

                      <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ minHeight: "360px" }}>
                        <video 
                          src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`} 
                          controls 
                          preload="metadata"
                          playsInline
                          className="w-full h-full rounded-xl shadow-lg border border-white border-opacity-5" 
                          style={{ maxHeight: "480px" }}
                        />
                      </div>
                    </div>
                  )}
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
