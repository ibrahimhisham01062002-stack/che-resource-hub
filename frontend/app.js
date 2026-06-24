const { useState, useEffect, useRef, useMemo } = React;

// Safe LocalStorage Wrapper to prevent crashes in private-browsing or restricted cookie environments
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("localStorage.getItem failed:", e);
      return null;
    }
  },
  setItem: (key, val) => {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      console.warn("localStorage.setItem failed:", e);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage.removeItem failed:", e);
    }
  }
};

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
    ),
    loader: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
      </svg>
    ),
    sparkles: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813zM19.071 4.929l-.707 1.414-1.414.707 1.414.707.707 1.414.707-1.414 1.414-.707-1.414-.707-.707-1.414z" />
      </svg>
    ),
    alertTriangle: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    eye: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  };
  return icons[name] || (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

const RENDER_BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://127.0.0.1:8000"
  : "https://che-resource-hub-2.onrender.com";
const API_BASE = RENDER_BACKEND_URL;

function App() {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  
  // Two primary sections: "books" or "slides"
  const [primarySection, setPrimarySection] = useState("books");

  // Academic Level & Term selections
  const [selectedLevel, setSelectedLevel] = useState(() => {
    return safeStorage.getItem("che_selected_level") || "Level-3";
  });
  const [selectedTerm, setSelectedTerm] = useState(() => {
    return safeStorage.getItem("che_selected_term") || "Term-2";
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
   const prevPreviewFileRef = useRef(null);
 
   // Reset preview states on file switch
   useEffect(() => {
     if (previewFile) {
       if (prevPreviewFileRef.current && prevPreviewFileRef.current.index === previewFile.index && prevPreviewFileRef.current.name === previewFile.name) {
         return;
       }
     }
     prevPreviewFileRef.current = previewFile;
   }, [previewFile]);
  
  // Book upload states
  const [bookUploadFile, setBookUploadFile] = useState([]);
  const [isBookUploading, setIsBookUploading] = useState(false);
  const [bookUploadProgress, setBookUploadProgress] = useState(0);
  const [bookUploadStatus, setBookUploadStatus] = useState({ type: "", message: "" });
  const bookFileInputRef = useRef(null);

  // Slide upload states
  const [slideUploadFile, setSlideUploadFile] = useState([]);
  const [isSlideUploading, setIsSlideUploading] = useState(false);
  const [slideUploadProgress, setSlideUploadProgress] = useState(0);
  const [slideUploadStatus, setSlideUploadStatus] = useState({ type: "", message: "" });
  const slideFileInputRef = useRef(null);

  // Term-Final Question upload states
  const [questionUploadFile, setQuestionUploadFile] = useState([]);
  const [isQuestionUploading, setIsQuestionUploading] = useState(false);
  const [questionUploadProgress, setQuestionUploadProgress] = useState(0);
  const [questionUploadStatus, setQuestionUploadStatus] = useState({ type: "", message: "" });
  const questionFileInputRef = useRef(null);

  // Solution Manual upload states
  const [solutionUploadFile, setSolutionUploadFile] = useState([]);
  const [isSolutionUploading, setIsSolutionUploading] = useState(false);
  const [solutionUploadProgress, setSolutionUploadProgress] = useState(0);
  const [solutionUploadStatus, setSolutionUploadStatus] = useState({ type: "", message: "" });
  const solutionFileInputRef = useRef(null);

  // Term-Final Solved upload states
  const [solvedUploadFile, setSolvedUploadFile] = useState([]);
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
  const [videoUploadFile, setVideoUploadFile] = useState([]);
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

  // Secure Download Passcode System States
  const [showDownloadAuthModal, setShowDownloadAuthModal] = useState(false);
  const [downloadPasswordInput, setDownloadPasswordInput] = useState("");
  const [downloadAuthError, setDownloadAuthError] = useState("");
  const [pendingDownloadCallback, setPendingDownloadCallback] = useState(null);

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
    safeStorage.setItem("che_selected_level", selectedLevel);
    safeStorage.setItem("che_selected_term", selectedTerm);
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
    
  }, [previewFile, activeCourse]);

  // Trigger MathJax typesetting whenever the preview file changes
  useEffect(() => {
    if (window.MathJax && previewFile && previewFile.summary) {
      // Allow the DOM to update first, then typeset
      const timer = setTimeout(() => {
        try {
          window.MathJax.typesetPromise();
        } catch (err) {
          console.error("MathJax typesetting failed:", err);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [previewFile]);

  // Restore active course from safeStorage once courses list is loaded
  useEffect(() => {
    if (courses.length > 0 && !activeCourse) {
      const savedCourseId = safeStorage.getItem("che_active_course_id");
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
      safeStorage.setItem("che_active_course_id", activeCourse.id);
    } else {
      safeStorage.removeItem("che_active_course_id");
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
      const firstFolder = (activeCourse.folders && activeCourse.folders.length > 0) ? activeCourse.folders[0] : "Root";
      setCurrentFolder(firstFolder);
      const firstVideoFolder = (activeCourse.video_folders && activeCourse.video_folders.length > 0) ? activeCourse.video_folders[0] : "Root";
      setCurrentVideoFolder(firstVideoFolder);
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
      const authTime = safeStorage.getItem("che_auth_until");
      setIsAuthorizedState(authTime && Date.now() < parseInt(authTime));
    };
    checkStatus();
    const interval = setInterval(checkStatus, 15000); // Check expiry every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Secure authorization wrapper for creating, editing, and deleting items
  const checkAuthAndExecute = (callback) => {
    const authTime = safeStorage.getItem("che_auth_until");
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
    if (authPasswordInput.trim() === "che@ddc") {
      const expiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours session
      safeStorage.setItem("che_auth_until", expiry.toString());
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

  // Secure authorization wrapper for downloading files/videos
  const checkDownloadAuthAndExecute = (callback) => {
    const authTime = safeStorage.getItem("che_download_auth_until");
    const isAuthorized = authTime && Date.now() < parseInt(authTime);
    if (isAuthorized) {
      callback();
    } else {
      setPendingDownloadCallback(() => callback);
      setDownloadPasswordInput("");
      setDownloadAuthError("");
      setShowDownloadAuthModal(true);
    }
  };

  // Passcode verification for downloads (supports designated and admin passcodes)
  const handleVerifyDownloadPassword = (e) => {
    if (e) e.preventDefault();
    const inputPass = downloadPasswordInput.trim();
    if (inputPass === "che@obe" || inputPass === "che@ddc") {
      const expiry = Date.now() + 6 * 60 * 60 * 1000; // Exactly 6 hours session
      safeStorage.setItem("che_download_auth_until", expiry.toString());
      setShowDownloadAuthModal(false);
      setDownloadAuthError("");
      if (pendingDownloadCallback) {
        pendingDownloadCallback();
        setPendingDownloadCallback(null);
      }
    } else {
      setDownloadAuthError("Incorrect download passcode. Access denied.");
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
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) {
            setActiveCourse(found);
            if (currentFolder === folderName) {
              const remaining = found.folders || [];
              setCurrentFolder(remaining.length > 0 ? remaining[0] : "Root");
            }
          }
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
          await fetchCourses();
          const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
          const coursesList = await updatedRes.json();
          const found = coursesList.find(c => c.id === activeCourse.id);
          if (found) {
            setActiveCourse(found);
            if (currentVideoFolder === folderName) {
              const remaining = found.video_folders || [];
              setCurrentVideoFolder(remaining.length > 0 ? remaining[0] : "Root");
            }
          }
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
    checkDownloadAuthAndExecute(async () => {
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
    });
  };

  // Handle downloading generated PDF summary as Markdown
  const handleDownloadSummary = (file) => {
    if (!file || !file.summary) return;
    const element = document.createElement("a");
    const fileContent = `# AI Study Summary: ${file.name}\n\n${file.summary}`;
    const fileBlob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8;' });
    element.href = URL.createObjectURL(fileBlob);
    
    const cleanCourseCode = activeCourse ? activeCourse.code.replace(/[^a-zA-Z0-9_-]/g, "_") : "course";
    const cleanFileName = file.name.replace(/\.[a-zA-Z0-9]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    element.download = `${cleanCourseCode}_${cleanFileName}_summary.md`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to update summary state across all arrays
  const updateSummaryState = (courseId, fileIndex, summaryText) => {
    setPreviewFile(prev => {
      if (prev && prev.index === fileIndex) {
        return { ...prev, summary: summaryText };
      }
      return prev;
    });

    setActiveCourse(prev => {
      if (!prev) return prev;
      if (prev.id !== courseId) return prev;
      const updatedFiles = prev.files.map((file, idx) => {
        if (idx === fileIndex) {
          return { ...file, summary: summaryText };
        }
        return file;
      });
      return { ...prev, files: updatedFiles };
    });

    setCourses(prev => {
      return prev.map(c => {
        if (c.id === courseId) {
          const updatedFiles = c.files.map((file, idx) => {
            if (idx === fileIndex) {
              return { ...file, summary: summaryText };
            }
            return file;
          });
          return { ...c, files: updatedFiles };
        }
        return c;
      });
    });
  };



  // PDF AI Summary Card disabled as requested

  // Reusable PDF viewer or placeholder renderer
  const renderPdfViewerOrPlaceholder = (file) => {
    if (!file) return null;

    if (previewLoading) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400">
          <div className="w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"></div>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-slate-300">Streaming PDF securely from Telegram cloud...</p>
            <p className="text-[10px] text-slate-500">This may take a moment if the server is waking up.</p>
          </div>
        </div>
      );
    }
    return (
      <iframe 
        src={previewUrl}
        className="w-full h-full border-none animate-fade-in"
        title="PDF Viewer Frame"
      ></iframe>
    );
  };
  // Handle file uploads recursively for multiple files sequentially
  const handleFileUpload = async (e, filesInput, category, setters) => {
    if (e) e.preventDefault();
    const files = Array.isArray(filesInput) ? filesInput : (filesInput ? [filesInput] : []);
    if (files.length === 0) return;
    
    checkAuthAndExecute(async () => {
      const { setIsUploading, setUploadProgress, setUploadStatus, setUploadFile, fileInputRef } = setters;
      
      setIsUploading(true);
      setUploadProgress(0);
      
      // Initialize files status map in state to show queue visual indicators
      const initialQueueStatus = files.map((f, index) => ({
        name: f.name,
        size: f.size,
        status: index === 0 ? "uploading" : "pending",
        progress: 0,
        error: ""
      }));
      setUploadStatus({ type: "batch", queue: initialQueueStatus });

      // Sequential Queue loop
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update state to highlight currently uploading file
        setUploadStatus(prev => {
          const queue = prev.queue ? prev.queue : initialQueueStatus;
          const newQueue = [...queue];
          if (newQueue[i]) {
            newQueue[i].status = "uploading";
          }
          return { type: "batch", queue: newQueue };
        });

        try {
          await new Promise((resolve) => {
            const isLargeFile = file.size > 4 * 1024 * 1024; // 4 MB threshold
            
            const updateProgress = (loaded, total) => {
              const percentage = Math.round((loaded / total) * 90);
              setUploadProgress(Math.round(((i * 100) + percentage) / files.length));
              setUploadStatus(prev => {
                const queue = prev.queue ? prev.queue : initialQueueStatus;
                const newQueue = [...queue];
                if (newQueue[i]) {
                  newQueue[i].progress = percentage;
                }
                return { type: "batch", queue: newQueue };
              });
            };

            const markSuccess = () => {
              setUploadStatus(prev => {
                const queue = prev.queue ? prev.queue : initialQueueStatus;
                const newQueue = [...queue];
                if (newQueue[i]) {
                  newQueue[i].status = "success";
                  newQueue[i].progress = 100;
                }
                return { type: "batch", queue: newQueue };
              });
              resolve();
            };

            const markError = (err) => {
              setUploadStatus(prev => {
                const queue = prev.queue ? prev.queue : initialQueueStatus;
                const newQueue = [...queue];
                if (newQueue[i]) {
                  newQueue[i].status = "error";
                  newQueue[i].error = err;
                }
                return { type: "batch", queue: newQueue };
              });
              resolve();
            };

            if (isLargeFile) {
              // Direct upload to Catbox.moe via CORS
              const xhr = new XMLHttpRequest();
              
              xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                  // Catbox upload represents 0-90% of the total progress
                  const loaded = event.loaded;
                  const total = event.total;
                  const percentage = Math.round((loaded / total) * 90);
                  setUploadProgress(Math.round(((i * 100) + percentage) / files.length));
                  setUploadStatus(prev => {
                    const queue = prev.queue ? prev.queue : initialQueueStatus;
                    const newQueue = [...queue];
                    if (newQueue[i]) {
                      newQueue[i].progress = percentage;
                    }
                    return { type: "batch", queue: newQueue };
                  });
                }
              });

              xhr.addEventListener("load", () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  const catboxUrl = xhr.responseText.trim();
                  
                  // Now register with our backend
                  const completeFormData = new FormData();
                  completeFormData.append("catbox_url", catboxUrl);
                  completeFormData.append("filename", file.name);
                  completeFormData.append("file_size", file.size);
                  completeFormData.append("category", category);
                  if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                    completeFormData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
                  }
                  
                  const completeXhr = new XMLHttpRequest();
                  completeXhr.addEventListener("load", () => {
                    if (completeXhr.status >= 200 && completeXhr.status < 300) {
                      markSuccess();
                    } else {
                      let err = "Registration failed";
                      try {
                        const data = JSON.parse(completeXhr.responseText);
                        err = data.detail || err;
                      } catch (e) {}
                      markError(err);
                    }
                  });
                  completeXhr.addEventListener("error", () => {
                    markError("Backend connection error");
                  });
                  
                  completeXhr.open("POST", `${API_BASE}/api/upload/${activeCourse.id}`);
                  completeXhr.send(completeFormData);
                  
                } else {
                  markError(`Catbox upload failed: ${xhr.statusText}`);
                }
              });

              xhr.addEventListener("error", () => {
                markError("Catbox network error");
              });

              const formData = new FormData();
              formData.append("reqtype", "fileupload");
              formData.append("fileToUpload", file);
              
              xhr.open("POST", "https://catbox.moe/user/api.php");
              xhr.send(formData);
            } else {
              // Direct upload for smaller files
              const xhr = new XMLHttpRequest();
              xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                  updateProgress(event.loaded, event.total);
                }
              });

              xhr.addEventListener("load", () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  markSuccess();
                } else {
                  let err = "Upload failed";
                  try {
                    const data = JSON.parse(xhr.responseText);
                    err = data.detail || err;
                  } catch (e) {}
                  markError(err);
                }
              });

              xhr.addEventListener("error", () => {
                markError("Network timeout");
              });

              const formData = new FormData();
              formData.append("file", file);
              formData.append("category", category);
              if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                formData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
              }

              xhr.open("POST", `${API_BASE}/api/upload/${activeCourse.id}`);
              xhr.send(formData);
            }
          });
        } catch (err) {
          console.error("Queue execution error:", err);
        }
      }

      // Finish entire batch upload
      setUploadProgress(100);
      setUploadFile(Array.isArray(filesInput) ? [] : null); // Clear queue state
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Reload course contents
      await fetchCourses();
      const updatedRes = await fetch(`${API_BASE}/api/courses?t=${Date.now()}`);
      const coursesList = await updatedRes.json();
      const found = coursesList.find(c => c.id === activeCourse.id);
      if (found) setActiveCourse(found);

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus({ type: "", message: "" });
      }, 2000);
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

  // Preprocess LaTeX math delimiters and mask math blocks to protect them from Markdown parsing
  const preprocessMarkdownMath = (text) => {
    if (!text) return { processed: "", mathBlocks: [] };
    let processed = text;
    const mathBlocks = [];

    // Helper to balance unescaped curly braces in math blocks
    const balanceMathBraces = (content) => {
      let openCount = 0;
      let closeCount = 0;
      for (let i = 0; i < content.length; i++) {
        if (content[i] === '{') {
          let backslashCount = 0;
          let j = i - 1;
          while (j >= 0 && content[j] === '\\') {
            backslashCount++;
            j--;
          }
          if (backslashCount % 2 === 0) {
            openCount++;
          }
        } else if (content[i] === '}') {
          let backslashCount = 0;
          let j = i - 1;
          while (j >= 0 && content[j] === '\\') {
            backslashCount++;
            j--;
          }
          if (backslashCount % 2 === 0) {
            closeCount++;
          }
        }
      }
      if (openCount > closeCount) {
        return content + '}'.repeat(openCount - closeCount);
      }
      return content;
    };

    // Auto-close unclosed display/inline math blocks at paragraph level
    let paragraphs = processed.split(/\n\n+/);
    for (let i = 0; i < paragraphs.length; i++) {
      let p = paragraphs[i].trim();
      
      // Case 1: starts with $$ and no other $$ or odd number of $$
      if (p.startsWith('$$')) {
        const dollarCount = (p.match(/\$\$/g) || []).length;
        if (dollarCount % 2 !== 0) {
          paragraphs[i] = paragraphs[i] + '\n$$';
        }
      }
      // Case 2: starts with \[ and no \]
      else if (p.startsWith('\\[') && !p.includes('\\]')) {
        paragraphs[i] = paragraphs[i] + '\n\\]';
      }
      // Case 3: starts with \( and no \)
      else if (p.startsWith('\\(') && !p.includes('\\)')) {
        paragraphs[i] = paragraphs[i] + '\n\\)';
      }
      // Case 4: starts with [ (not a link, checkbox, or task) and has math indicators but no ]
      else if (p.startsWith('[') && !p.includes(']')) {
        const isLinkOrCheckbox = p.startsWith('[ ]') || p.startsWith('[x]') || p.startsWith('[X]') || /^[a-zA-Z0-9\s]+\]\(/.test(p);
        const hasMath = /[\_=^\\+\-*\/]/.test(p) || p.includes('\\mathcal') || p.includes('\\frac');
        if (!isLinkOrCheckbox && hasMath) {
          paragraphs[i] = paragraphs[i] + '\n]';
        }
      }
    }
    processed = paragraphs.join('\n\n');

    const maskPattern = (regex) => {
      processed = processed.replace(regex, (match) => {
        const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
        mathBlocks.push({ placeholder, content: match });
        return placeholder;
      });
    };

    // Stage 1: Mask all existing standard math blocks (protecting them from any further replacements!)
    maskPattern(/\$\$[\s\S]*?\$\$/g);
    maskPattern(/\\\[[\s\S]*?\\\]/g);
    maskPattern(/\\begin\{([a-zA-Z\*]+)\}[\s\S]*?\\end\{\1\}/g);
    maskPattern(/\\\([\s\S]*?\\\)/g);
    
    // Mask single dollar math blocks (without paragraph breaks)
    processed = processed.replace(/\$[^\$]+?\$/g, (match) => {
      if (match.includes('\n\n') || match.includes('\r\n\r\n')) {
        return match;
      }
      const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
      mathBlocks.push({ placeholder, content: match });
      return placeholder;
    });
    // Stage 2: Process non-standard display delimiters (display blocks wrapped in [ ... ])
    const blockRegex = /(?<!\\)\[\s*((?:[^\[\]]|\[[^\[\]]*\])+?)\s*\]/g;
    processed = processed.replace(blockRegex, (match, content) => {
      const hasSpaces = match.startsWith('[ ') && match.endsWith(' ]');
      const hasMathChars = /[\_=^\\+\-*\/]/.test(content);
      const isCheckbox = content === ' ' || content === 'x' || content === 'X';
      
      if ((hasSpaces || hasMathChars) && !isCheckbox && content.length > 2) {
        return `\n$$\n${content.trim()}\n$$\n`;
      }
      return match;
    });

    // Mask newly created block display equations
    maskPattern(/\$\$[\s\S]*?\$\$/g);

    // Stage 2.5: Process raw mathematical equations LHS = RHS
    processed = processed.replace(/(?<![\w\$])([\w\(\)\[\]\/\\\{\}\+\-\^']+\s*=\s*[a-zA-Z\d_\{\}\(\)\[\]\+\-\*\/\\'\.\^\s\:\,\;\!\?\-\’]+)/g, (match, eqPart) => {
      const tokens = eqPart.split(/(\s+)/);
      let equationTokens = [];
      let textTokens = [];
      let foundText = false;
      const stopWords = new Set(['with', 'parameters', 'and', 'the', 'is', 'for', 'at', 'by', 'on', 'where', 'of', 'in', 'to', 'a', 'an']);
      
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim();
        if (!token) {
          if (!foundText) equationTokens.push(tokens[i]);
          else textTokens.push(tokens[i]);
          continue;
        }
        if (foundText) {
          textTokens.push(tokens[i]);
          continue;
        }
        const isWord = /^[a-z]{3,}$/.test(token) && !/^(ln|log|exp|sin|cos|tan|sqrt)$/.test(token);
        if (stopWords.has(token.toLowerCase()) || isWord) {
          foundText = true;
          if (equationTokens.length > 0 && /^\s+$/.test(equationTokens[equationTokens.length - 1])) {
            textTokens.push(equationTokens.pop());
          }
          textTokens.push(tokens[i]);
        } else {
          equationTokens.push(tokens[i]);
        }
      }
      
      const eqText = equationTokens.join('').trim();
      const remainingText = textTokens.join('');
      
      if (eqText.includes('=') && eqText.length > 3) {
        const hasMathIndicator = /[\_=^\\+\-*\/\[\]\d]/.test(eqText) || eqText.length > 8;
        if (hasMathIndicator) {
          return `$${eqText}$${remainingText}`;
        }
      }
      return match;
    });

    // Mask newly created raw equations
    maskPattern(/\$[^\$]+?\$/g);

    // Stage 3: Process inline equations/symbols wrapped in ( ... )
    const inlineRegex = /(?<![a-zA-Z0-9])\(\s*([^\(\)\r\n]+?)\s*\)(?=[\s\:\,\.\;\-\?\!\)]|$)/g;
    processed = processed.replace(inlineRegex, (match, content, offset, string) => {
      const trimmed = content.trim();
      const hasSpaces = match.startsWith('( ') && match.endsWith(' )');
      const isSingleChar = trimmed.length === 1 && /^[a-zA-Z\d]$/.test(trimmed);
      const hasMathSymbols = /[\_=^\\+\-*\/\[\]]/.test(trimmed);
      
      // Guard: do not replace if preceded by \left or followed by \right (with optional backslashes)
      const before = string.substring(0, offset);
      const after = string.substring(offset + match.length);
      const isStartOfLine = /^\s*$/.test(before) || /[\r\n]\s*$/.test(before);
      const isListItem = isStartOfLine && /^[a-d|i-j\d]$/i.test(trimmed);
      
      if (/\\?left\s*$/i.test(before) || /^\s*\\?right\b/i.test(after)) {
        return match;
      }
      
      if (trimmed.length <= 30 && (hasMathSymbols || (isSingleChar && !isListItem))) {
        return '$' + trimmed + '$';
      }
      return match;
    });

    // Mask newly created inline parenthesized blocks
    maskPattern(/\$[^\$]+?\$/g);

    // Stage 4: Process raw subscript variables, concentrations, and LaTeX keywords
    // a. Bracketed chemical concentrations/species, e.g. [S], [E], [ES], [P] (excluding markdown links)
    processed = processed.replace(/(?<!\\)\[\s*([a-zA-Z0-9\-\+]+)\s*\](?!\()/g, (match, content) => {
      if (content === ' ' || content === 'x' || content === 'X') {
        return match;
      }
      return `$[${content.trim()}]$`;
    });

    // b. Subscripted variables, e.g. V_max, V_{\text{max}}, K_m, k_d, C_A, C_{A0}, r_A
    const subscriptVarRegex = /\b([a-zA-Z\u0370-\u03ff\u1f00-\u1fff]+_(?:[a-zA-Z0-9]+|\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}))(?![a-zA-Z0-9])/g;
    processed = processed.replace(subscriptVarRegex, (match) => {
      if (match.startsWith('MATHBLOCKPLACEHOLDERXYZ')) return match;
      return `$${match}$`;
    });

    // c. Raw LaTeX commands/Greek letters (excluding left/right layout modifiers)
    const rawLatexRegex = /\\(?!n|r|t|left|right\b)[a-zA-Z]+(?:\{[^{}]*\})*/g;
    processed = processed.replace(rawLatexRegex, (match, offset, string) => {
      const before = string.substring(Math.max(0, offset - 1), offset);
      const after = string.substring(offset + match.length, offset + match.length + 1);
      if (before === '$' && after === '$') {
        return match;
      }
      return `$${match}$`;
    });

    // Mask the newly created math blocks from Stage 4
    maskPattern(/\$[^\$]+?\$/g);

    // 5. Correct malformed LaTeX commands inside the masked math blocks (100% safe from URLs)
    const malformedLayoutRegex = /[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
    const malformedSymbolRegex = /[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;

    mathBlocks.forEach(block => {
      block.content = block.content.replace(malformedLayoutRegex, '\\$1');
      block.content = block.content.replace(malformedSymbolRegex, '\\$1');
      
      // Auto-balance braces and \left/\right delimiters
      let delimStart = "";
      let delimEnd = "";
      let inner = block.content;
      
      if (block.content.startsWith('$$') && block.content.endsWith('$$')) {
        delimStart = '$$'; delimEnd = '$$';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\[') && block.content.endsWith('\\]')) {
        delimStart = '\\['; delimEnd = '\\]';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\(') && block.content.endsWith('\\)')) {
        delimStart = '\\('; delimEnd = '\\)';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('$') && block.content.endsWith('$')) {
        delimStart = '$'; delimEnd = '$';
        inner = block.content.slice(1, -1);
      }
      
      inner = inner.trim();
      inner = balanceMathBraces(inner);
      
      const leftCount = (inner.match(/\\left\b/g) || []).length;
      const rightCount = (inner.match(/\\right\b/g) || []).length;
      if (leftCount > rightCount) {
        inner += ' \\right.'.repeat(leftCount - rightCount);
      }
      
      if (delimStart === '$$' || delimStart === '\\[') {
        block.content = `${delimStart}\n${inner}\n${delimEnd}`;
      } else if (delimStart === '$' || delimStart === '\\(') {
        block.content = `${delimStart}${inner}${delimEnd}`;
      } else {
        block.content = inner;
      }
    });

    return { processed, mathBlocks };
  };

  // Render markdown text dynamically using Marked
  const renderMarkdown = (text) => {
    if (!text) return { __html: "" };
    
    const { processed, mathBlocks } = preprocessMarkdownMath(text);
    let parsedHtml = marked.parse(processed);
    
    // Restore math blocks in reverse order
    for (let i = mathBlocks.length - 1; i >= 0; i--) {
      parsedHtml = parsedHtml.replace(mathBlocks[i].placeholder, () => mathBlocks[i].content);
    }
    
    // Correct malformed LaTeX in the remaining text
    const globalLayoutRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+\\?(frac|overline|underline|sqrt|left|right|begin|end)\b/g;
    const globalSymbolRegex = /(?<![a-zA-Z0-9\:\.\/])[\|\/]+(text|mathrm|mu|alpha|beta|gamma|delta|epsilon|theta|lambda|pi|rho|sigma|tau|phi|omega|partial|sum|int|infty|times|div|pm|mp|le|ge|ne|approx|hat|bar|tilde|dot|ddot|matrix|array|sin|cos|tan|ln|log|exp|deg)\b/g;

    parsedHtml = parsedHtml.replace(globalLayoutRegex, '\\$1');
    parsedHtml = parsedHtml.replace(globalSymbolRegex, '\\$1');

    return { __html: parsedHtml };
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
      const defaultFolder = (activeCourse && activeCourse.folders && activeCourse.folders.length > 0) ? activeCourse.folders[0] : "Root";
      const fileFolder = f.folder || defaultFolder;
      return matchesSearch && fileFolder === currentFolder;
    });
  }, [slidesList, fileSearchQuery, currentFolder, activeCourse]);

  // Filtering videos inside active section
  const filteredVideos = useMemo(() => {
    return videosList.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
                            f.type.toLowerCase().includes(videoSearchQuery.toLowerCase());
      const defaultVideoFolder = (activeCourse && activeCourse.video_folders && activeCourse.video_folders.length > 0) ? activeCourse.video_folders[0] : "Root";
      const fileFolder = f.folder || defaultVideoFolder;
      return matchesSearch && fileFolder === currentVideoFolder;
    });
  }, [videosList, videoSearchQuery, currentVideoFolder, activeCourse]);

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
              className="absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
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

      {/* Premium Secure Download Authentication Modal */}
      {showDownloadAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30">
            <button 
              onClick={() => { setShowDownloadAuthModal(false); setPendingDownloadCallback(null); }}
              className="absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close"
              title="Close Panel"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-accent-sky mx-auto mb-2 animate-bounce">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h3 className="font-display font-bold text-lg text-white">Secure Download Lock</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                This asset requires download authorization. Enter the passcode to unlock all files and videos for the next 6 hours.
              </p>
              
              <form onSubmit={handleVerifyDownloadPassword} className="space-y-4 pt-2">
                <div>
                  <input 
                    type="password" 
                    required
                    placeholder="Enter download passcode..."
                    value={downloadPasswordInput}
                    onChange={(e) => setDownloadPasswordInput(e.target.value)}
                    className="glass-input w-full p-2.5 rounded-xl text-sm focus:border-accent-sky text-center text-white placeholder-slate-500 border border-white border-opacity-15 bg-white bg-opacity-5"
                    autoFocus
                  />
                </div>
                
                {downloadAuthError && (
                  <p className="text-xs text-rose-400 font-semibold">{downloadAuthError}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
                >
                  Verify and Unlock (6 Hours)
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
              className="md:hidden che-return-to-hub-btn px-3 py-1.5 rounded-xl text-[10px] font-display font-bold uppercase tracking-wider"
            >
              Return to Hub
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
                safeStorage.removeItem("che_auth_until");
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
                // Transition cleanly back to the dashboard filtered by the newly selected Level/Term
                setActiveCourse(null);
                setPreviewFile(null);
                setPreviewUrl("");
                setSearchQuery("");
                setFileSearchQuery("");
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
          <div className="space-y-8 flex-grow flex flex-col justify-start animate-section-entrance">
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
          <div className="space-y-6 flex-grow flex flex-col che-course-workspace animate-section-entrance">
            
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
                  <span>Slides</span>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">
                  
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
                          multiple
                          accept=".pdf,.docx,.doc,.xlsx,.xls"
                          onChange={(e) => setBookUploadFile(Array.from(e.target.files))}
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
                            {bookUploadFile && bookUploadFile.length > 0 ? (bookUploadFile.length === 1 ? `Selected: ${bookUploadFile[0].name}` : `Selected: ${bookUploadFile.length} files`) : "Upload reference textbooks or manuals directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {bookUploadFile && bookUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setBookUploadFile([]); if (bookFileInputRef.current) bookFileInputRef.current.value = ""; }}
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

                      {/* Active Queue Visual Feedback Panel */}
                      {bookUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {bookUploadStatus.queue.filter(q => q.status === "success").length} / {bookUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {bookUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
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
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
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
                          {renderPdfViewerOrPlaceholder(previewFile)}
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">
                  
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
                          multiple
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setQuestionUploadFile(Array.from(e.target.files))}
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
                            {questionUploadFile && questionUploadFile.length > 0 ? (questionUploadFile.length === 1 ? `Selected: ${questionUploadFile[0].name}` : `Selected: ${questionUploadFile.length} files`) : "Upload term-final exam question papers directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {questionUploadFile && questionUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setQuestionUploadFile([]); if (questionFileInputRef.current) questionFileInputRef.current.value = ""; }}
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

                      {/* Active Queue Visual Feedback Panel */}
                      {questionUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {questionUploadStatus.queue.filter(q => q.status === "success").length} / {questionUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {questionUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
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
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
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
                          {renderPdfViewerOrPlaceholder(previewFile)}
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">
                  
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
                          multiple
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setSolutionUploadFile(Array.from(e.target.files))}
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
                            {solutionUploadFile && solutionUploadFile.length > 0 ? (solutionUploadFile.length === 1 ? `Selected: ${solutionUploadFile[0].name}` : `Selected: ${solutionUploadFile.length} files`) : "Upload exam solutions or step-by-step guides directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {solutionUploadFile && solutionUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSolutionUploadFile([]); if (solutionFileInputRef.current) solutionFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSolutionUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSolutionUploading ? "Uploading..." : "Save to Solutions"}</span>
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

                      {/* Active Queue Visual Feedback Panel */}
                      {solutionUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {solutionUploadStatus.queue.filter(q => q.status === "success").length} / {solutionUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {solutionUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Search solutions */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search solution manuals..."
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
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
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
                          {renderPdfViewerOrPlaceholder(previewFile)}
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">

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
                          multiple
                          accept=".pdf,.docx,.doc"
                          onChange={(e) => setSolvedUploadFile(Array.from(e.target.files))}
                          className="hidden" 
                          id="solved-upload-input"
                          ref={solvedFileInputRef}
                        />
                        <label 
                          htmlFor="solved-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {solvedUploadFile && solvedUploadFile.length > 0 ? (solvedUploadFile.length === 1 ? `Selected: ${solvedUploadFile[0].name}` : `Selected: ${solvedUploadFile.length} files`) : "Upload exam solutions or solved answer keys directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {solvedUploadFile && solvedUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSolvedUploadFile([]); if (solvedFileInputRef.current) solvedFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSolvedUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSolvedUploading ? "Uploading..." : "Save to Solved"}</span>
                              <Icon name="plus" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </form>

                      {isSolvedUploading && (
                        <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse">
                          <div className="bg-[#5C061C] h-full transition-all duration-300" style={{ width: `${solvedUploadProgress}%` }}></div>
                        </div>
                      )}

                      {solvedUploadStatus.message && (
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${solvedUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {solvedUploadStatus.message}
                        </div>
                      )}

                      {/* Active Queue Visual Feedback Panel */}
                      {solvedUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {solvedUploadStatus.queue.filter(q => q.status === "success").length} / {solvedUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {solvedUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Search solved */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search solved answers..."
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* Solved list */}
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {filteredSolved.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="check" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
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

                        {filteredSolved.length === 0 && (
                          <div className="py-8 text-center text-slate-500 text-xs font-display">
                            No solved papers cataloged inside this folder yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: PDF Reader Pane */}
                  <div className="lg:col-span-2">
                    {previewFile && solvedList.some(f => f.index === previewFile.index) ? (
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
                          {renderPdfViewerOrPlaceholder(previewFile)}
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

              {/* SUBSECTION 2: Slides (Aggregated interactive learning space) */}
              {primarySection === 'slides' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">
                  
                  {/* Left Column: Slides List & Reference Links */}
                  <div className="lg:col-span-1 space-y-6">
                    
                    {/* Slides catalog */}
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Class Slides & Assets</h3>
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
                          {slidesList.length} files
                        </span>
                      </div>

                      {/* Virtual Folders Section */}
                      <div className="space-y-3 pb-3 border-b border-white border-opacity-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase">Folders</span>
                          <button
                            type="button"
                            onClick={handleCreateFolder}
                            className="flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
                          >
                            <Icon name="folderPlus" className="w-3 h-3" />
                            <span>Create</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                          {(activeCourse.folders || ["Root"]).map((folder) => {
                            const isSelected = currentFolder === folder;
                            return (
                              <button
                                key={folder}
                                type="button"
                                onClick={() => { setCurrentFolder(folder); setPreviewFile(null); }}
                                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' 
                                    : 'folder-btn-unselected'
                                }`}
                              >
                                <Icon name="folder" className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`} />
                                <span className="truncate max-w-[80px]">{folder}</span>
                                  <div className="flex items-center space-x-1 ml-1" onClick={(e) => e.stopPropagation()}>
                                    <span 
                                      onClick={(e) => handleRenameFolder(e, folder)}
                                      className="p-0.5 rounded hover:bg-black/10 transition-all text-black"
                                      title={`Rename ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </span>
                                    {folder !== "Root" && (
                                      <span 
                                        onClick={(e) => handleDeleteFolder(e, folder)}
                                        className="p-0.5 rounded hover:bg-black/10 transition-all text-black"
                                        title={`Delete ${folder}`}
                                      >
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Slides drag-and-drop upload zone */}
                      <form onSubmit={(e) => handleFileUpload(e, slideUploadFile, "slide", {
                        setIsUploading: setIsSlideUploading,
                        setUploadProgress: setSlideUploadProgress,
                        setUploadStatus: setSlideUploadStatus,
                        setUploadFile: setSlideUploadFile,
                        fileInputRef: slideFileInputRef
                      })} className="relative group">
                        <input 
                          type="file" 
                          multiple
                          accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip,.rar"
                          onChange={(e) => setSlideUploadFile(Array.from(e.target.files))}
                          className="hidden" 
                          id="slide-upload-input"
                          ref={slideFileInputRef}
                        />
                        <label 
                          htmlFor="slide-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {slideUploadFile && slideUploadFile.length > 0 ? (slideUploadFile.length === 1 ? `Selected: ${slideUploadFile[0].name}` : `Selected: ${slideUploadFile.length} files`) : "Upload lecture slides, notes, or spreadsheets."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {slideUploadFile && slideUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setSlideUploadFile([]); if (slideFileInputRef.current) slideFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isSlideUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isSlideUploading ? "Uploading..." : "Save to Slides"}</span>
                              <Icon name="plus" className="w-3 h-3" />
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
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${slideUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {slideUploadStatus.message}
                        </div>
                      )}

                      {/* Active Queue Visual Feedback Panel */}
                      {slideUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {slideUploadStatus.queue.filter(q => q.status === "success").length} / {slideUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {slideUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Search slides */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search slides..."
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* List of slide files */}
                      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {filteredSlides.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name={(file.type || "").toUpperCase().includes('PDF') || (file.name || "").toLowerCase().endsWith('.pdf') ? 'fileText' : 'layers'} className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; {file.type || "Class Slide"}
                                  </span>
                                </div>
                              </div>

                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
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

                    {/* Reference Links Column Stacked inside Sidebar */}
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <h3 className="font-display font-bold text-base text-glow text-white">Study Reference Links</h3>
                      
                      {/* Form to submit links */}
                      <form onSubmit={handleAddLink} className="space-y-3">
                        <div>
                          <label className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1">
                            Reference Title
                          </label>
                          <input 
                            type="text"
                            placeholder="e.g. Perry's Handbook Chapter 5"
                            value={newLink.title}
                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                            className="glass-input w-full px-3 py-1.5 rounded-lg text-xs"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1">
                            Hyperlink URL
                          </label>
                          <input 
                            type="url"
                            placeholder="https://example.com/resource"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            className="glass-input w-full px-3 py-1.5 rounded-lg text-xs"
                            required
                          />
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-[10px] uppercase tracking-wider rounded-lg transition-all shadow-md shadow-sky-950/20"
                        >
                          Add Reference Link
                        </button>
                      </form>

                      {/* Display of links */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {(activeCourse.reference_links || []).map((link, idx) => (
                          <div key={idx} className="glass-panel p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs border-white border-opacity-5 hover:bg-white/5 transition-colors">
                            <a 
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-display font-medium text-slate-300 hover:text-accent-sky truncate flex items-center space-x-1.5 max-w-[170px]"
                            >
                              <Icon name="externalLink" className="w-3.5 h-3.5 text-accent-sky flex-shrink-0" />
                              <span className="truncate">{link.title}</span>
                            </a>
                            <button
                              onClick={() => handleDeleteLink(idx)}
                              className="p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-all flex-shrink-0"
                              title="Remove Link"
                            >
                              <Icon name="trash" className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        {(activeCourse.reference_links || []).length === 0 && (
                          <div className="py-4 text-center text-slate-500 text-[10px] font-display">
                            No custom reference links added yet.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Slides Preview Pane or Placeholder Terminal */}
                  <div className="lg:col-span-2">
                    {previewFile && slidesList.some(f => f.index === previewFile.index) ? (
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
                            className="che-close-reader-btn"
                          >
                            Close Preview
                          </button>
                        </div>

                        {(previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf') ? (
                          <>
                            <div className="w-full bg-dark-900 rounded-xl overflow-hidden" style={{ height: "550px" }}>
                              {renderPdfViewerOrPlaceholder(previewFile)}
                            </div>
                          </>
                        ) : (previewFile.type || "").toUpperCase().includes('VIDEO') || (previewFile.type || "").toUpperCase().includes('RECORDED CLASS') || (previewFile.name || "").toLowerCase().endsWith('.mp4') || (previewFile.name || "").toLowerCase().endsWith('.webm') || (previewFile.name || "").toLowerCase().endsWith('.ogg') || (previewFile.name || "").toLowerCase().endsWith('.mov') || (previewFile.name || "").toLowerCase().endsWith('.mkv') ? (
                          <div className="w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center" style={{ height: "550px" }}>
                            <video 
                              src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`} 
                              controls 
                              preload="metadata"
                              playsInline
                            className="w-full h-full rounded-xl shadow-lg border border-white border-opacity-5" 
                            />
                          </div>
                        ) : (
                          <div className="p-16 text-center bg-dark-900 rounded-2xl space-y-4 border border-white border-opacity-5 flex flex-col items-center justify-center" style={{ height: "500px" }}>
                            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                              <Icon name="layers" className="w-8 h-8" />
                            </div>
                            <h4 className="font-display font-bold text-base text-white">Dynamic Preview Restricted</h4>
                            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                              Dynamic previewing is only optimized for PDF and video assets. For spreadsheet models (.xlsx), HYSYS setups (.hsc), Matlab scripts (.m), or archives (.zip), download the file directly to open locally.
                            </p>
                            <button 
                              onClick={() => handleDownloadFile(previewFile.index, previewFile.name)}
                              className="px-4 py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-950/20 flex items-center space-x-2"
                            >
                              <Icon name="download" className="w-4 h-4" />
                              <span>Download Asset</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                          <Icon name="layers" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Hub-Class Slides Terminal</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any slide, lecture note, or asset from the left catalog to launch our integrated interactive workspace.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {primarySection === 'videos' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance">
                  
                  {/* Left Column: Videos List & Folder/Search */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-base text-white">Recorded Class Videos</h3>
                        <span className="text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10">
                          {videosList.length} recordings
                        </span>
                      </div>

                      {/* Virtual Folders Section */}
                      <div className="space-y-3 pb-3 border-b border-white border-opacity-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase">Video Folders</span>
                          <button
                            type="button"
                            onClick={handleCreateVideoFolder}
                            className="flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
                          >
                            <Icon name="folderPlus" className="w-3 h-3" />
                            <span>Create</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                          {(activeCourse.video_folders || ["Root"]).map((folder) => {
                            const isSelected = currentVideoFolder === folder;
                            return (
                              <button
                                key={folder}
                                type="button"
                                onClick={() => { setCurrentVideoFolder(folder); setPreviewFile(null); }}
                                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' 
                                    : 'folder-btn-unselected'
                                }`}
                              >
                                <Icon name="folder" className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`} />
                                <span className="truncate max-w-[80px]">{folder}</span>
                                  <div className="flex items-center space-x-1 ml-1" onClick={(e) => e.stopPropagation()}>
                                    <span 
                                      onClick={(e) => handleRenameVideoFolder(e, folder)}
                                      className="p-0.5 rounded hover:bg-black/10 transition-all text-black"
                                      title={`Rename ${folder}`}
                                    >
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </span>
                                    {folder !== "Root" && (
                                      <span 
                                        onClick={(e) => handleDeleteVideoFolder(e, folder)}
                                        className="p-0.5 rounded hover:bg-black/10 transition-all text-black"
                                        title={`Delete ${folder}`}
                                      >
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
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
                          multiple
                          accept="video/*"
                          onChange={(e) => setVideoUploadFile(Array.from(e.target.files))}
                          className="hidden" 
                          id="video-upload-input"
                          ref={videoFileInputRef}
                        />
                        <label 
                          htmlFor="video-upload-input" 
                          className="glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
                        >
                          <Icon name="upload" className="w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-display font-semibold text-[10px] text-sky-300 text-center px-2">
                            {videoUploadFile && videoUploadFile.length > 0 ? (videoUploadFile.length === 1 ? `Selected: ${videoUploadFile[0].name}` : `Selected: ${videoUploadFile.length} files`) : "Upload recorded lectures, tutorials, or HYSYS demos directly."}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Drag & drop or click to browse</p>
                        </label>
                        
                        {videoUploadFile && videoUploadFile.length > 0 && (
                          <div className="flex items-center space-x-2 mt-2 justify-end animate-fade-in">
                            <button 
                              type="button" 
                              onClick={() => { setVideoUploadFile([]); if (videoFileInputRef.current) videoFileInputRef.current.value = ""; }}
                              className="px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={isVideoUploading}
                              className="px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
                            >
                              <span>{isVideoUploading ? "Uploading..." : "Save to Videos"}</span>
                              <Icon name="plus" className="w-3 h-3" />
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
                        <div className={`p-2 rounded-lg text-[10px] font-display font-medium ${videoUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`}>
                          {videoUploadStatus.message}
                        </div>
                      )}

                      {/* Active Queue Visual Feedback Panel */}
                      {videoUploadStatus.type === "batch" && (
                        <div className="glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left">
                          <div className="flex items-center justify-between border-b border-black/5 pb-2">
                            <span className="font-display font-bold text-xs text-slate-300">Upload Batch Queue</span>
                            <span className="text-[10px] text-accent-sky font-bold">
                              {videoUploadStatus.queue.filter(q => q.status === "success").length} / {videoUploadStatus.queue.length} completed
                            </span>
                          </div>
                          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                            {videoUploadStatus.queue.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <span className="truncate max-w-[180px] font-medium text-slate-400">{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  {item.status === "pending" && <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" />}
                                  {item.status === "uploading" && (
                                    <div className="flex items-center space-x-2 text-accent-violet">
                                      <Icon name="loader" className="w-3.5 h-3.5 animate-spin" />
                                      <span className="text-[10px] font-bold">{item.progress}%</span>
                                    </div>
                                  )}
                                  {item.status === "success" && <Icon name="check" className="w-4 h-4 text-emerald-500 font-bold" />}
                                  {item.status === "error" && (
                                    <span className="text-[9px] text-rose-500 font-semibold" title={item.error}>
                                      Failed
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Search videos */}
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search videos..."
                          value={videoSearchQuery}
                          onChange={(e) => setVideoSearchQuery(e.target.value)}
                          className="glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                        />
                        <Icon name="search" className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* List of video files */}
                      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                        {filteredVideos.map((file) => {
                          const isPreviewing = previewFile && previewFile.index === file.index;
                          return (
                            <div 
                              key={file.index}
                              onClick={() => setPreviewFile(file)}
                              className={`glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`}
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0">
                                  <Icon name="video" className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex flex-col items-start justify-center">
                                  <span className="che-book-title block line-clamp-2 leading-relaxed">
                                    {file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-display">
                                    {file.size} &bull; Recorded Class
                                  </span>
                                </div>
                              </div>

                              <div className="absolute bottom-3 right-3 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
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

                  {/* Right Column: Video Preview Pane or Placeholder Terminal */}
                  <div className="lg:col-span-2">
                    {previewFile && videosList.some(f => f.index === previewFile.index) ? (
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

                        <div className="w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center" style={{ height: "550px" }}>
                          <video 
                            src={`${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`} 
                            controls 
                            preload="metadata"
                            playsInline
                            className="w-full h-full rounded-xl shadow-lg border border-white border-opacity-5" 
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3" style={{ height: "500px" }}>
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2">
                          <Icon name="video" className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Hub-Class Video Terminal</h4>
                        <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                          Select any recorded class lecture or HYSYS tutorial from the left catalog to launch our high-performance stream player.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="glass-panel border-t border-white border-opacity-5 py-4 px-6 mt-auto text-center text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Chemical Engineering Hub Space. Designed for premium study acceleration.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center space-x-1.5">
            <span className="credit-developed-by text-[10px] uppercase tracking-wider">Developed by</span>
            <span className="credit-2102072 font-display text-xs">
              Ibrahim Hisham-2102072
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">&bull;</span>
          <span className="credit-presented-by text-[10px] uppercase tracking-wider">
            Presented by DDC
          </span>
        </div>
      </footer>
    </div>
  );
}

// Render React App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
