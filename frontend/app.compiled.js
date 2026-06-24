const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// Safe LocalStorage Wrapper to prevent crashes in private-browsing or restricted cookie environments
const safeStorage = {
  getItem: key => {
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
  removeItem: key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage.removeItem failed:", e);
    }
  }
};

// In-React high-fidelity SVG icon system
const Icon = ({
  name,
  className = "w-5 h-5",
  ...props
}) => {
  const icons = {
    book: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })),
    fileText: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })),
    video: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    })),
    plus: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 4v16m8-8H4"
    })),
    search: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    })),
    arrowLeft: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
    })),
    trash: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })),
    upload: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })),
    download: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    })),
    externalLink: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    })),
    layers: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    })),
    clock: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    edit: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })),
    save: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    })),
    bookOpen: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    })),
    chevronRight: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 5l7 7-7 7"
    })),
    play: /*#__PURE__*/React.createElement("svg", {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5v14l11-7z"
    })),
    folder: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    })),
    folderPlus: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })),
    check: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    loader: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
    })),
    sparkles: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813zM19.071 4.929l-.707 1.414-1.414.707 1.414.707.707 1.414.707-1.414 1.414-.707-1.414-.707-.707-1.414z"
    })),
    alertTriangle: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })),
    eye: /*#__PURE__*/React.createElement("svg", {
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2,
      className: className,
      ...props
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    }), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    }))
  };
  return icons[name] || /*#__PURE__*/React.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    className: className,
    ...props
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }));
};
const RENDER_BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://127.0.0.1:8000" : ""; // Use Vercel backend directly to bypass Render's 50-second cold starts
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
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    category: "YouTube"
  });
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
  const [bookUploadStatus, setBookUploadStatus] = useState({
    type: "",
    message: ""
  });
  const bookFileInputRef = useRef(null);

  // Slide upload states
  const [slideUploadFile, setSlideUploadFile] = useState([]);
  const [isSlideUploading, setIsSlideUploading] = useState(false);
  const [slideUploadProgress, setSlideUploadProgress] = useState(0);
  const [slideUploadStatus, setSlideUploadStatus] = useState({
    type: "",
    message: ""
  });
  const slideFileInputRef = useRef(null);

  // Term-Final Question upload states
  const [questionUploadFile, setQuestionUploadFile] = useState([]);
  const [isQuestionUploading, setIsQuestionUploading] = useState(false);
  const [questionUploadProgress, setQuestionUploadProgress] = useState(0);
  const [questionUploadStatus, setQuestionUploadStatus] = useState({
    type: "",
    message: ""
  });
  const questionFileInputRef = useRef(null);

  // Solution Manual upload states
  const [solutionUploadFile, setSolutionUploadFile] = useState([]);
  const [isSolutionUploading, setIsSolutionUploading] = useState(false);
  const [solutionUploadProgress, setSolutionUploadProgress] = useState(0);
  const [solutionUploadStatus, setSolutionUploadStatus] = useState({
    type: "",
    message: ""
  });
  const solutionFileInputRef = useRef(null);

  // Term-Final Solved upload states
  const [solvedUploadFile, setSolvedUploadFile] = useState([]);
  const [isSolvedUploading, setIsSolvedUploading] = useState(false);
  const [solvedUploadProgress, setSolvedUploadProgress] = useState(0);
  const [solvedUploadStatus, setSolvedUploadStatus] = useState({
    type: "",
    message: ""
  });
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
  const [videoUploadStatus, setVideoUploadStatus] = useState({
    type: "",
    message: ""
  });
  const videoFileInputRef = useRef(null);

  // Reference to track previous course ID to prevent tab resetting on same-course refresh
  const prevCourseIdRef = useRef(null);

  // Dynamic course creator states
  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    description: ""
  });
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseError, setCourseError] = useState("");

  // Dynamic course editor states
  const [editingCourse, setEditingCourse] = useState(null);
  const [editCourseFields, setEditCourseFields] = useState({
    code: "",
    title: "",
    description: ""
  });
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

  // Load PDF directly — prefer Catbox URL (zero Render bandwidth) with fallback to streaming proxy
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

    // Use Catbox URL directly if available (bypasses Render, zero bandwidth cost, supports range requests for progressive loading)
    const file = activeCourse.files[previewFile.index];
    const catboxUrl = file && file.catbox_url;
    if (catboxUrl) {
      setPreviewUrl(catboxUrl);
    } else {
      // Fallback to Render streaming proxy for files not yet cached on Catbox
      const directUrl = `${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}?preview=true`;
      setPreviewUrl(directUrl);
    }
    const safetyTimer = setTimeout(() => {
      setPreviewLoading(false);
    }, 15000); // 15-second safety fallback to hide spinner on errors

    return () => clearTimeout(safetyTimer);
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
      const firstFolder = activeCourse.folders && activeCourse.folders.length > 0 ? activeCourse.folders[0] : "Root";
      setCurrentFolder(firstFolder);
      const firstVideoFolder = activeCourse.video_folders && activeCourse.video_folders.length > 0 ? activeCourse.video_folders[0] : "Root";
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
  const checkAuthAndExecute = callback => {
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
  const handleVerifyPassword = e => {
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
  const checkDownloadAuthAndExecute = callback => {
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
  const handleVerifyDownloadPassword = e => {
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
  const isBookFile = file => {
    const name = file.name.toLowerCase();
    return name.includes("book") || name.includes("edition") || name.includes("manual") || name.includes("solution") || name.includes("levenspiel") || name.includes("fogler") || name.includes("geankopolis") || name.includes("wankat") || name.includes("cussler") || name.includes("brennan") || name.includes("foust") || name.includes("coulson") || name.includes("rhodes") || name.includes("chopra") || file.bytes > 5 * 1024 * 1024; // Files > 5MB are highly likely books
  };

  // Split files into Books, Solutions, Slides, Questions, Solved, and Videos
  const {
    booksList,
    solutionsList,
    slidesList,
    questionsList,
    solvedList,
    videosList
  } = useMemo(() => {
    if (!activeCourse || !activeCourse.files) return {
      booksList: [],
      solutionsList: [],
      slidesList: [],
      questionsList: [],
      solvedList: [],
      videosList: []
    };
    const books = [];
    const solutions = [];
    const slides = [];
    const questions = [];
    const solved = [];
    const videos = [];
    activeCourse.files.forEach((file, index) => {
      const fileWithIndex = {
        ...file,
        index
      };
      const typeLower = (file.type || "").toLowerCase();
      if (typeLower.includes("video") || typeLower.includes("recorded class") || file.category === "video" || file.category === "recorded_class") {
        videos.push(fileWithIndex);
      } else if (typeLower.includes("reference book") || typeLower.includes("book") && !typeLower.includes("manual") && !typeLower.includes("solved") && !typeLower.includes("solution")) {
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
    return {
      booksList: books,
      solutionsList: solutions,
      slidesList: slides,
      questionsList: questions,
      solvedList: solved,
      videosList: videos
    };
  }, [activeCourse]);

  // Handle dynamic course creation
  const handleCreateCourse = e => {
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
          headers: {
            "Content-Type": "application/json"
          },
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
          setNewCourse({
            code: "",
            title: "",
            description: ""
          });
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
  const handleStartEditCourse = course => {
    setEditingCourse(course);
    setEditCourseFields({
      code: course.code,
      title: course.title,
      description: course.description
    });
    setEditCourseError("");
  };

  // Save course updates
  const handleSaveCourseEdit = e => {
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
          headers: {
            "Content-Type": "application/json"
          },
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
  const handleAddLink = e => {
    if (e) e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    checkAuthAndExecute(async () => {
      setIsSavingLink(true);
      try {
        const res = await fetch(`${API_BASE}/api/courses/${activeCourse.id}/links`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newLink)
        });
        if (res.ok) {
          const data = await res.json();
          setReferenceLinks(data);
          setNewLink({
            title: "",
            url: "",
            category: "YouTube"
          });
        }
      } catch (err) {
        console.error("Failed to add link", err);
      } finally {
        setIsSavingLink(false);
      }
    });
  };

  // Handle deleting a reference link
  const handleDeleteLink = linkId => {
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
  const handleDeleteFile = fileIndex => {
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
          body: JSON.stringify({
            name: trimmed
          })
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
          body: JSON.stringify({
            new_name: trimmed
          })
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
          body: JSON.stringify({
            name: trimmed
          })
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
          body: JSON.stringify({
            new_name: trimmed
          })
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
  const handleDownloadFile = async (fileIndex, fileName) => {
    if (!activeCourse) return;
    checkDownloadAuthAndExecute(async () => {
      const file = activeCourse.files[fileIndex];
      const catboxUrl = file && file.catbox_url;
      // Use Catbox URL directly to bypass Render bandwidth (zero cost).
      // Falls back to Render proxy for files not yet on Catbox.
      const url = catboxUrl || `${API_BASE}/api/download/${activeCourse.id}/${fileIndex}`;
      window.open(url, '_blank');
    });
  };

  // Handle downloading generated PDF summary as Markdown
  const handleDownloadSummary = file => {
    if (!file || !file.summary) return;
    const element = document.createElement("a");
    const fileContent = `# AI Study Summary: ${file.name}\n\n${file.summary}`;
    const fileBlob = new Blob([fileContent], {
      type: 'text/markdown;charset=utf-8;'
    });
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
        return {
          ...prev,
          summary: summaryText
        };
      }
      return prev;
    });
    setActiveCourse(prev => {
      if (!prev) return prev;
      if (prev.id !== courseId) return prev;
      const updatedFiles = prev.files.map((file, idx) => {
        if (idx === fileIndex) {
          return {
            ...file,
            summary: summaryText
          };
        }
        return file;
      });
      return {
        ...prev,
        files: updatedFiles
      };
    });
    setCourses(prev => {
      return prev.map(c => {
        if (c.id === courseId) {
          const updatedFiles = c.files.map((file, idx) => {
            if (idx === fileIndex) {
              return {
                ...file,
                summary: summaryText
              };
            }
            return file;
          });
          return {
            ...c,
            files: updatedFiles
          };
        }
        return c;
      });
    });
  };

  // PDF AI Summary Card disabled as requested

  // Reusable PDF viewer or placeholder renderer
  const renderPdfViewerOrPlaceholder = file => {
    if (!file) return null;
    return React.createElement('div', {
      className: "w-full h-full relative bg-dark-900"
    }, previewLoading && React.createElement('div', {
      className: "absolute inset-0 z-10 flex flex-col items-center justify-center space-y-4 bg-dark-900 text-slate-400"
    }, React.createElement('div', {
      className: "w-10 h-10 rounded-full border-4 border-[#5C061C] border-t-transparent animate-spin"
    }), React.createElement('div', {
      className: "text-center space-y-1"
    }, React.createElement('p', {
      className: "text-xs font-bold text-slate-300"
    }, "Loading PDF pages progressively..."), React.createElement('p', {
      className: "text-[10px] text-slate-500"
    }, "First pages will appear shortly."))), previewUrl && React.createElement(PdfJsViewer, {
      url: previewUrl,
      onFirstPageReady: () => setPreviewLoading(false)
    }));
  };

  // PDF.js Progressive Viewer Component — renders pages lazily as user scrolls
  // Only fetches bytes needed for visible pages (Catbox supports HTTP Range requests)
  const PdfJsViewer = ({
    url,
    onFirstPageReady
  }) => {
    const containerRef = useRef(null);
    const pdfDocRef = useRef(null);
    const renderedPagesRef = useRef(new Set());
    const renderingRef = useRef(new Set());
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    useEffect(() => {
      if (!url || !window.pdfjsLib) {
        setError("PDF viewer library not loaded. Try refreshing the page.");
        return;
      }
      let cancelled = false;
      renderedPagesRef.current = new Set();
      renderingRef.current = new Set();
      const loadPdf = async () => {
        try {
          // PDF.js will use range requests automatically when the server supports Accept-Ranges
          // This means only the bytes for the requested pages are downloaded, not the whole file
          const loadingTask = pdfjsLib.getDocument({
            url: url,
            rangeChunkSize: 65536,
            // 64KB chunks for progressive loading
            disableAutoFetch: true,
            // Don't prefetch the entire PDF — only fetch on demand
            disableStream: false // Allow streaming
          });
          const pdf = await loadingTask.promise;
          if (cancelled) return;
          pdfDocRef.current = pdf;
          setTotalPages(pdf.numPages);

          // Render first 3 pages immediately for instant preview
          const initialPages = Math.min(3, pdf.numPages);
          for (let i = 1; i <= initialPages; i++) {
            if (cancelled) return;
            await renderPage(pdf, i);
            if (i === 1 && onFirstPageReady) onFirstPageReady();
          }
        } catch (err) {
          if (!cancelled) {
            console.error("PDF.js loading error:", err);
            setError("Failed to load PDF. The file may be temporarily unavailable.");
          }
        }
      };
      const renderPage = async (pdf, pageNum) => {
        if (renderedPagesRef.current.has(pageNum) || renderingRef.current.has(pageNum)) return;
        renderingRef.current.add(pageNum);
        try {
          const page = await pdf.getPage(pageNum);
          if (cancelled) return;
          const container = containerRef.current;
          if (!container) return;
          const canvasId = `pdf-page-${pageNum}`;
          let canvas = container.querySelector(`#${canvasId}`);
          if (!canvas) return;
          const containerWidth = container.clientWidth - 32; // 16px padding each side
          const viewport = page.getViewport({
            scale: 1
          });
          const scale = containerWidth / viewport.width;
          const scaledViewport = page.getViewport({
            scale
          });
          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;
          canvas.style.width = scaledViewport.width + 'px';
          canvas.style.height = scaledViewport.height + 'px';
          const ctx = canvas.getContext('2d');
          await page.render({
            canvasContext: ctx,
            viewport: scaledViewport
          }).promise;
          renderedPagesRef.current.add(pageNum);
          renderingRef.current.delete(pageNum);

          // Remove placeholder styling
          const wrapper = canvas.parentElement;
          if (wrapper) {
            wrapper.style.minHeight = 'auto';
            const placeholder = wrapper.querySelector('.page-placeholder');
            if (placeholder) placeholder.style.display = 'none';
          }
        } catch (err) {
          renderingRef.current.delete(pageNum);
          console.error(`Failed to render page ${pageNum}:`, err);
        }
      };
      loadPdf();
      return () => {
        cancelled = true;
        if (pdfDocRef.current) {
          pdfDocRef.current.destroy();
          pdfDocRef.current = null;
        }
      };
    }, [url]);

    // Set up IntersectionObserver for lazy loading remaining pages
    useEffect(() => {
      if (totalPages === 0 || !containerRef.current) return;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.dataset.page);
            if (pdfDocRef.current && !renderedPagesRef.current.has(pageNum) && !renderingRef.current.has(pageNum)) {
              const renderPage = async () => {
                renderingRef.current.add(pageNum);
                try {
                  const page = await pdfDocRef.current.getPage(pageNum);
                  const container = containerRef.current;
                  if (!container) return;
                  const canvas = container.querySelector(`#pdf-page-${pageNum}`);
                  if (!canvas) return;
                  const containerWidth = container.clientWidth - 32;
                  const viewport = page.getViewport({
                    scale: 1
                  });
                  const scale = containerWidth / viewport.width;
                  const scaledViewport = page.getViewport({
                    scale
                  });
                  canvas.width = scaledViewport.width;
                  canvas.height = scaledViewport.height;
                  canvas.style.width = scaledViewport.width + 'px';
                  canvas.style.height = scaledViewport.height + 'px';
                  const ctx = canvas.getContext('2d');
                  await page.render({
                    canvasContext: ctx,
                    viewport: scaledViewport
                  }).promise;
                  renderedPagesRef.current.add(pageNum);
                  renderingRef.current.delete(pageNum);
                  const wrapper = canvas.parentElement;
                  if (wrapper) {
                    wrapper.style.minHeight = 'auto';
                    const placeholder = wrapper.querySelector('.page-placeholder');
                    if (placeholder) placeholder.style.display = 'none';
                  }
                } catch (err) {
                  renderingRef.current.delete(pageNum);
                }
              };
              renderPage();
            }
          }
        });
      }, {
        root: containerRef.current,
        rootMargin: '200px'
      }); // Pre-load pages 200px before they're visible

      const wrappers = containerRef.current.querySelectorAll('[data-page]');
      wrappers.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, [totalPages]);
    if (error) {
      return React.createElement('div', {
        className: "w-full h-full flex items-center justify-center text-slate-400 text-sm p-8 text-center"
      }, error);
    }

    // Render canvas placeholders for all pages
    const pageElements = [];
    for (let i = 1; i <= totalPages; i++) {
      pageElements.push(React.createElement('div', {
        key: i,
        'data-page': i,
        className: "relative mb-4 flex flex-col items-center",
        style: {
          minHeight: i > 3 ? '800px' : 'auto'
        }
      }, React.createElement('canvas', {
        id: `pdf-page-${i}`,
        className: "shadow-lg rounded",
        style: {
          maxWidth: '100%'
        }
      }), i > 3 && React.createElement('div', {
        className: "page-placeholder absolute inset-0 flex items-center justify-center text-slate-500 text-xs"
      }, `Loading page ${i}...`)));
    }
    return React.createElement('div', {
      ref: containerRef,
      className: "w-full h-full overflow-y-auto p-4 bg-[#2a2a2a]",
      style: {
        scrollBehavior: 'smooth'
      }
    }, totalPages > 0 && React.createElement('div', {
      className: "text-center text-slate-400 text-xs mb-3 font-semibold"
    }, `${totalPages} pages • Scroll to load more`), ...pageElements);
  };
  // Handle file uploads recursively for multiple files sequentially
  const handleFileUpload = async (e, filesInput, category, setters) => {
    if (e) e.preventDefault();
    const files = Array.isArray(filesInput) ? filesInput : filesInput ? [filesInput] : [];
    if (files.length === 0) return;
    checkAuthAndExecute(async () => {
      const {
        setIsUploading,
        setUploadProgress,
        setUploadStatus,
        setUploadFile,
        fileInputRef
      } = setters;
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
      setUploadStatus({
        type: "batch",
        queue: initialQueueStatus
      });

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
          return {
            type: "batch",
            queue: newQueue
          };
        });
        try {
          await new Promise(resolve => {
            const isLargeFile = file.size > 4 * 1024 * 1024; // 4 MB threshold

            const updateProgress = (loaded, total) => {
              const percentage = Math.round(loaded / total * 90);
              setUploadProgress(Math.round((i * 100 + percentage) / files.length));
              setUploadStatus(prev => {
                const queue = prev.queue ? prev.queue : initialQueueStatus;
                const newQueue = [...queue];
                if (newQueue[i]) {
                  newQueue[i].progress = percentage;
                }
                return {
                  type: "batch",
                  queue: newQueue
                };
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
                return {
                  type: "batch",
                  queue: newQueue
                };
              });
              resolve();
            };
            const markError = err => {
              setUploadStatus(prev => {
                const queue = prev.queue ? prev.queue : initialQueueStatus;
                const newQueue = [...queue];
                if (newQueue[i]) {
                  newQueue[i].status = "error";
                  newQueue[i].error = err;
                }
                return {
                  type: "batch",
                  queue: newQueue
                };
              });
              resolve();
            };
            if (isLargeFile) {
              // Chunked upload to our backend API
              const chunkSize = 2 * 1024 * 1024; // 2MB chunks
              const totalChunks = Math.ceil(file.size / chunkSize);
              const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
              let nextChunkIndex = 0;
              let activeUploads = 0;
              let hasFailed = false;
              const chunkProgress = new Array(totalChunks).fill(0);
              const sendCompleteRequest = () => {
                const completeFormData = new FormData();
                completeFormData.append("session_id", sessionId);
                completeFormData.append("filename", file.name);
                completeFormData.append("total_chunks", totalChunks);
                completeFormData.append("category", category);
                if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                  completeFormData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
                }
                const completeXhr = new XMLHttpRequest();
                completeXhr.addEventListener("load", () => {
                  if (completeXhr.status >= 200 && completeXhr.status < 300) {
                    markSuccess();
                  } else {
                    let err = "Merge and upload failed";
                    try {
                      const data = JSON.parse(completeXhr.responseText);
                      err = data.detail || err;
                    } catch (e) {}
                    markError(err);
                  }
                });
                completeXhr.addEventListener("error", () => {
                  markError("Backend completion connection error");
                });
                completeXhr.open("POST", `${API_BASE}/api/upload/complete/${activeCourse.id}`);
                completeXhr.send(completeFormData);
              };
              const uploadChunk = chunkIdx => {
                const start = chunkIdx * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);
                const chunkFormData = new FormData();
                chunkFormData.append("file_chunk", chunk, file.name);
                chunkFormData.append("session_id", sessionId);
                chunkFormData.append("chunk_index", chunkIdx);
                chunkFormData.append("total_chunks", totalChunks);
                chunkFormData.append("filename", file.name);
                const chunkXhr = new XMLHttpRequest();
                chunkXhr.upload.addEventListener("progress", event => {
                  if (event.lengthComputable && !hasFailed) {
                    chunkProgress[chunkIdx] = event.loaded;
                    const totalLoaded = chunkProgress.reduce((sum, val) => sum + val, 0);
                    const percentage = Math.round(totalLoaded / file.size * 90);
                    setUploadProgress(Math.round((i * 100 + percentage) / files.length));
                    setUploadStatus(prev => {
                      const queue = prev.queue ? prev.queue : initialQueueStatus;
                      const newQueue = [...queue];
                      if (newQueue[i]) {
                        newQueue[i].progress = percentage;
                      }
                      return {
                        type: "batch",
                        queue: newQueue
                      };
                    });
                  }
                });
                chunkXhr.addEventListener("load", () => {
                  if (hasFailed) return;
                  if (chunkXhr.status >= 200 && chunkXhr.status < 300) {
                    chunkProgress[chunkIdx] = end - start;
                    activeUploads--;
                    startUpload();
                  } else {
                    hasFailed = true;
                    let err = `Chunk ${chunkIdx + 1} upload failed`;
                    try {
                      const data = JSON.parse(chunkXhr.responseText);
                      err = data.detail || err;
                    } catch (e) {}
                    markError(err);
                  }
                });
                chunkXhr.addEventListener("error", () => {
                  hasFailed = true;
                  markError(`Network error on chunk ${chunkIdx + 1}`);
                });
                chunkXhr.open("POST", `${API_BASE}/api/upload/chunk`);
                chunkXhr.send(chunkFormData);
              };
              const startUpload = () => {
                if (hasFailed) return;
                if (nextChunkIndex >= totalChunks) {
                  if (activeUploads === 0) {
                    sendCompleteRequest();
                  }
                  return;
                }
                while (activeUploads < 3 && nextChunkIndex < totalChunks && !hasFailed) {
                  const chunkIdx = nextChunkIndex++;
                  activeUploads++;
                  uploadChunk(chunkIdx);
                }
              };
              startUpload();
            } else {
              // Direct upload for smaller files
              const xhr = new XMLHttpRequest();
              xhr.upload.addEventListener("progress", event => {
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
        setUploadStatus({
          type: "",
          message: ""
        });
      }, 2000);
    });
  };

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  // Preprocess LaTeX math delimiters and mask math blocks to protect them from Markdown parsing
  const preprocessMarkdownMath = text => {
    if (!text) return {
      processed: "",
      mathBlocks: []
    };
    let processed = text;
    const mathBlocks = [];

    // Helper to balance unescaped curly braces in math blocks
    const balanceMathBraces = content => {
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
    const maskPattern = regex => {
      processed = processed.replace(regex, match => {
        const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
        mathBlocks.push({
          placeholder,
          content: match
        });
        return placeholder;
      });
    };

    // Stage 1: Mask all existing standard math blocks (protecting them from any further replacements!)
    maskPattern(/\$\$[\s\S]*?\$\$/g);
    maskPattern(/\\\[[\s\S]*?\\\]/g);
    maskPattern(/\\begin\{([a-zA-Z\*]+)\}[\s\S]*?\\end\{\1\}/g);
    maskPattern(/\\\([\s\S]*?\\\)/g);

    // Mask single dollar math blocks (without paragraph breaks)
    processed = processed.replace(/\$[^\$]+?\$/g, match => {
      if (match.includes('\n\n') || match.includes('\r\n\r\n')) {
        return match;
      }
      const placeholder = `MATHBLOCKPLACEHOLDERXYZ${mathBlocks.length}`;
      mathBlocks.push({
        placeholder,
        content: match
      });
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
          if (!foundText) equationTokens.push(tokens[i]);else textTokens.push(tokens[i]);
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
      if (trimmed.length <= 30 && (hasMathSymbols || isSingleChar && !isListItem)) {
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
    processed = processed.replace(subscriptVarRegex, match => {
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
        delimStart = '$$';
        delimEnd = '$$';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\[') && block.content.endsWith('\\]')) {
        delimStart = '\\[';
        delimEnd = '\\]';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('\\(') && block.content.endsWith('\\)')) {
        delimStart = '\\(';
        delimEnd = '\\)';
        inner = block.content.slice(2, -2);
      } else if (block.content.startsWith('$') && block.content.endsWith('$')) {
        delimStart = '$';
        delimEnd = '$';
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
    return {
      processed,
      mathBlocks
    };
  };

  // Render markdown text dynamically using Marked
  const renderMarkdown = text => {
    if (!text) return {
      __html: ""
    };
    const {
      processed,
      mathBlocks
    } = preprocessMarkdownMath(text);
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
    return {
      __html: parsedHtml
    };
  };

  // Filtering courses by search bar, level, and term
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = !selectedLevel || c.level === selectedLevel;
      const matchesTerm = !selectedLevel || !selectedTerm || c.term === selectedTerm;
      return matchesSearch && matchesLevel && matchesTerm;
    });
  }, [courses, searchQuery, selectedLevel, selectedTerm]);

  // Filtering books inside active section
  const filteredBooks = useMemo(() => {
    return booksList.filter(f => f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase()));
  }, [booksList, fileSearchQuery]);

  // Filtering slides inside active section
  const filteredSlides = useMemo(() => {
    return slidesList.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase());
      const defaultFolder = activeCourse && activeCourse.folders && activeCourse.folders.length > 0 ? activeCourse.folders[0] : "Root";
      const fileFolder = f.folder || defaultFolder;
      return matchesSearch && fileFolder === currentFolder;
    });
  }, [slidesList, fileSearchQuery, currentFolder, activeCourse]);

  // Filtering videos inside active section
  const filteredVideos = useMemo(() => {
    return videosList.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(videoSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(videoSearchQuery.toLowerCase());
      const defaultVideoFolder = activeCourse && activeCourse.video_folders && activeCourse.video_folders.length > 0 ? activeCourse.video_folders[0] : "Root";
      const fileFolder = f.folder || defaultVideoFolder;
      return matchesSearch && fileFolder === currentVideoFolder;
    });
  }, [videosList, videoSearchQuery, currentVideoFolder, activeCourse]);

  // Filtering questions inside active section
  const filteredQuestions = useMemo(() => {
    return questionsList.filter(f => f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase()));
  }, [questionsList, fileSearchQuery]);

  // Filtering solutions inside active section
  const filteredSolutions = useMemo(() => {
    return solutionsList.filter(f => f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase()));
  }, [solutionsList, fileSearchQuery]);

  // Filtering solved inside active section
  const filteredSolved = useMemo(() => {
    return solvedList.filter(f => f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) || f.type.toLowerCase().includes(fileSearchQuery.toLowerCase()));
  }, [solvedList, fileSearchQuery]);

  // Pre-compiled colorful stats dashboard counts
  const totalFilesCount = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.fileCount || 0), 0);
  }, [courses]);
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-grow flex items-center justify-center flex-col space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 border-4 border-accent-sky border-t-transparent rounded-full animate-spin"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-glow text-accent-sky font-display font-medium tracking-wide"
    }, "Loading Academic Space..."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, editingCourse && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingCourse(null),
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-slate-300 hover:text-white transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-sky"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-5 h-5 animate-pulse"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Edit Course Details")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveCourseEdit,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Course Code"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: editCourseFields.code,
    onChange: e => setEditCourseFields({
      ...editCourseFields,
      code: e.target.value
    }),
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Course Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: editCourseFields.title,
    onChange: e => setEditCourseFields({
      ...editCourseFields,
      title: e.target.value
    }),
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider font-display block mb-1"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    value: editCourseFields.description,
    onChange: e => setEditCourseFields({
      ...editCourseFields,
      description: e.target.value
    }),
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-sky-500 resize-none"
  })), editCourseError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, editCourseError), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setEditingCourse(null),
    className: "w-1/2 py-2.5 che-cancel-btn font-display font-semibold text-xs rounded-xl"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSavingCourseEdit,
    className: "w-1/2 py-2.5 che-submit-btn text-white font-display font-semibold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
  }, isSavingCourseEdit ? "Saving..." : "Save Changes")))))), showAuthModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-rose border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowAuthModal(false);
      setPendingAuthCallback(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-accent-rose mx-auto mb-2 animate-bounce"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Administrative Lock"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, "This action requires administrative authorization. Enter the academic access passcode to unlock edits."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleVerifyPassword,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    placeholder: "Enter session passcode...",
    value: authPasswordInput,
    onChange: e => setAuthPasswordInput(e.target.value),
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-rose-500 text-center",
    autoFocus: true
  })), authError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, authError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2.5 bg-gradient-to-r from-accent-rose to-red-600 text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-rose-500/25 transition-transform hover:scale-[1.02]"
  }, "Verify and Unlock (1 Hour)"))))), showDownloadAuthModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-accent-sky border-opacity-30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowDownloadAuthModal(false);
      setPendingDownloadCallback(null);
    },
    className: "absolute top-4 right-4 bg-dark-900 p-2 rounded-full border border-white/10 text-black hover:text-black transition-colors che-admin-auth-close",
    title: "Close Panel"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-accent-sky mx-auto mb-2 animate-bounce"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-lg text-white"
  }, "Secure Download Lock"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, "This asset requires download authorization. Enter the passcode to unlock all files and videos for the next 6 hours."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleVerifyDownloadPassword,
    className: "space-y-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    placeholder: "Enter download passcode...",
    value: downloadPasswordInput,
    onChange: e => setDownloadPasswordInput(e.target.value),
    className: "glass-input w-full p-2.5 rounded-xl text-sm focus:border-accent-sky text-center text-white placeholder-slate-500 border border-white border-opacity-15 bg-white bg-opacity-5",
    autoFocus: true
  })), downloadAuthError && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-400 font-semibold"
  }, downloadAuthError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2.5 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
  }, "Verify and Unlock (6 Hours)"))))), playingVideoUrl && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative border-brand"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlayingVideoUrl(null),
    className: "absolute top-4 right-4 bg-dark-900 bg-opacity-80 p-2 rounded-full border border-white border-opacity-10 text-slate-300 hover:text-white transition-colors z-10"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "aspect-video w-full"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: playingVideoUrl,
    className: "w-full h-full",
    title: "YouTube Video Player",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true
  })))), /*#__PURE__*/React.createElement("header", {
    className: "glass-panel sticky top-0 z-40 border-b border-white border-opacity-10 px-4 md:px-6 py-3.5 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between w-full md:w-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2.5 md:space-x-3 cursor-pointer",
    onClick: () => {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "che_hub_logo.png",
    alt: "ChE StudySpace Logo",
    className: "w-9 h-9 md:w-10 md:h-10 rounded-xl shadow-lg shadow-sky-500/20 object-cover flex-shrink-0 border border-white/10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display font-extrabold text-base md:text-lg tracking-wide text-glow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "che-brand-text"
  }, "ChE"), " ", /*#__PURE__*/React.createElement("span", {
    className: "gradient-text"
  }, "StudySpace")), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] md:text-[10px] text-slate-400 font-medium tracking-widest uppercase truncate"
  }, "Department of Chemical Engineering"))), activeCourse && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    },
    className: "md:hidden che-return-to-hub-btn px-3 py-1.5 rounded-xl text-[10px] font-display font-bold uppercase tracking-wider"
  }, "Return to Hub")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between md:justify-end w-full md:w-auto space-x-4 md:space-x-8 text-sm border-t border-white/5 pt-2.5 md:pt-0 md:border-t-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[11px] font-medium tracking-wider uppercase"
  }, "Active Courses"), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold text-white"
  }, courses.length, " courses")), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-left md:text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[9px] md:text-[11px] font-semibold tracking-wider uppercase"
  }, "Resources Loaded"), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs md:text-sm text-accent-sky"
  }, totalFilesCount, " files")), /*#__PURE__*/React.createElement("div", {
    className: "h-6 md:h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 cursor-pointer select-none",
    onClick: () => {
      if (isAuthorizedState) {
        if (window.confirm("Do you want to end your administrator session?")) {
          safeStorage.removeItem("che_auth_until");
          setIsAuthorizedState(false);
        }
      } else {
        checkAuthAndExecute(() => {});
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `w-2 h-2 rounded-full ${isAuthorizedState ? 'bg-violet-400 animate-pulse' : 'bg-slate-500'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `font-display text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isAuthorizedState ? 'text-violet-400' : 'text-slate-500'}`
  }, isAuthorizedState ? '🔓 Admin Active' : '🔒 Guest')), /*#__PURE__*/React.createElement("div", {
    className: "h-6 md:h-8 w-px bg-white bg-opacity-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 block text-[9px] md:text-[10px] font-bold tracking-wider uppercase mb-1"
  }, "Level and term"), /*#__PURE__*/React.createElement("select", {
    value: selectedLevel && selectedTerm ? `${selectedLevel}, ${selectedTerm}` : "",
    onChange: e => {
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
    },
    className: "glass-input px-2.5 py-1.5 rounded-xl text-[10px] md:text-[11px] font-semibold bg-dark-900 cursor-pointer focus:border-sky-500 border border-white/10"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Levels & Terms"), /*#__PURE__*/React.createElement("option", {
    value: "Level-1, Term-1"
  }, "Level 1, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-1, Term-2"
  }, "Level 1, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-2, Term-1"
  }, "Level 2, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-2, Term-2"
  }, "Level 2, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-3, Term-1"
  }, "Level 3, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-3, Term-2"
  }, "Level 3, Term 2"), /*#__PURE__*/React.createElement("option", {
    value: "Level-4, Term-1"
  }, "Level 4, Term 1"), /*#__PURE__*/React.createElement("option", {
    value: "Level-4, Term-2"
  }, "Level 4, Term 2"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col"
  }, !activeCourse ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 flex-grow flex flex-col justify-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight"
  }, "Welcome to Your ", /*#__PURE__*/React.createElement("span", {
    className: "gradient-text text-glow"
  }, "Study Hub")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 mt-2 text-sm max-w-xl"
  }, "Centralized academic hub for Chemical Engineering slides, textbooks, and interactive study notes.")), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full md:w-80"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search active courses...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    className: "glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:border-sky-500"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3.5 top-3 w-4 h-4 text-slate-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
  }, selectedLevel && selectedTerm && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] bg-sky-950/5 relative overflow-hidden group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "z-10 w-full space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-sky-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-5 h-5 text-accent-sky animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-display font-semibold text-xs uppercase tracking-wider"
  }, "Create Course Segment")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreateCourse,
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "Course Code (e.g. ChE 403)",
    value: newCourse.code,
    onChange: e => setNewCourse({
      ...newCourse,
      code: e.target.value
    }),
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "Course Title (e.g. Process Control)",
    value: newCourse.title,
    onChange: e => setNewCourse({
      ...newCourse,
      title: e.target.value
    }),
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Description (optional)",
    rows: 1,
    value: newCourse.description,
    onChange: e => setNewCourse({
      ...newCourse,
      description: e.target.value
    }),
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs resize-none"
  }), courseError && /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-rose-400 font-medium"
  }, courseError), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isCreatingCourse,
    className: "w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet text-white font-display font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isCreatingCourse ? "Adding Course..." : "Add Course"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    className: "w-3.5 h-3.5"
  }))))), filteredCourses.map((course, idx) => {
    // Generates dynamic aesthetic gradient backgrounds by course code
    const gradients = ["from-accent-sky to-sky-900/30", "from-accent-violet to-violet-900/30", "from-accent-violet to-violet-900/30", "from-accent-blue to-blue-900/30", "from-accent-rose to-rose-900/30"];
    const grad = gradients[idx % gradients.length];
    return /*#__PURE__*/React.createElement("div", {
      key: course.id,
      onClick: () => setActiveCourse(course),
      className: "glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer min-h-[220px] relative overflow-hidden group"
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${grad} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-course-badge inline-block px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/10 font-display"
    }, course.code), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        handleStartEditCourse(course);
      },
      className: "che-edit-course-btn p-1.5 rounded-lg bg-white border border-slate-200 transition-all relative z-10",
      title: "Edit Course Details"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      className: "w-3.5 h-3.5"
    }))), /*#__PURE__*/React.createElement("h3", {
      className: "font-display font-bold text-xl text-white group-hover:text-accent-sky transition-colors line-clamp-1"
    }, course.title), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed"
    }, course.description)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between border-t border-white border-opacity-5 pt-4 mt-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-xs text-slate-400"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      className: "w-3.5 h-3.5 text-accent-sky"
    }), /*#__PURE__*/React.createElement("span", null, course.fileCount, " resources")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center text-xs text-accent-sky font-medium group-hover:translate-x-1 transition-transform"
    }, /*#__PURE__*/React.createElement("span", null, "Enter Space"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      className: "w-3.5 h-3.5 ml-1"
    }))));
  }), filteredCourses.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "col-span-full py-16 text-center glass-panel rounded-2xl border-dashed border-2 border-white border-opacity-10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-12 h-12 text-slate-500 mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 font-display"
  }, "No courses match your active search filter.")))) :
  /*#__PURE__*/
  /* DETAILED COURSE SPACE */
  React.createElement("div", {
    className: "space-y-6 flex-grow flex flex-col che-course-workspace animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white border-opacity-5 pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveCourse(null);
      setSearchQuery("");
      setFileSearchQuery("");
    },
    className: "che-back-btn p-2.5 rounded-xl transition-all hover:scale-105",
    title: "Back to Hub"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowLeft",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded bg-accent-sky/20 text-accent-sky border border-accent-sky/10 uppercase tracking-widest font-display"
  }, activeCourse.code), /*#__PURE__*/React.createElement("h2", {
    className: "font-display font-extrabold text-2xl md:text-3xl text-glow text-white"
  }, activeCourse.title)), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed"
  }, activeCourse.description))), /*#__PURE__*/React.createElement("div", {
    className: "flex bg-dark-950 p-1 rounded-xl border border-white border-opacity-5 flex-wrap gap-1 self-start md:self-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("books");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'books' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Books")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("solutions");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'solutions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Solution Manual")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("slides");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'slides' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Slides")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("videos");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'videos' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Recorded Class")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("questions");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'questions' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Term-Final Question")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setPrimarySection("solved");
      setPreviewFile(null);
    },
    className: `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-display font-semibold transition-all ${primarySection === 'solved' ? 'bg-gradient-to-tr from-accent-sky to-accent-violet text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Term-Final Solved")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow flex flex-col"
  }, primarySection === 'books' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Reference Books"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, booksList.length, " volumes")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, bookUploadFile, "book", {
      setIsUploading: setIsBookUploading,
      setUploadProgress: setBookUploadProgress,
      setUploadStatus: setBookUploadStatus,
      setUploadFile: setBookUploadFile,
      fileInputRef: bookFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc,.xlsx,.xls",
    onChange: e => setBookUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "book-upload-input",
    ref: bookFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "book-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, bookUploadFile && bookUploadFile.length > 0 ? bookUploadFile.length === 1 ? `Selected: ${bookUploadFile[0].name}` : `Selected: ${bookUploadFile.length} files` : "Upload reference textbooks or manuals directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), bookUploadFile && bookUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setBookUploadFile([]);
      if (bookFileInputRef.current) bookFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isBookUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isBookUploading ? "Uploading..." : "Save to Books"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isBookUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${bookUploadProgress}%`
    }
  })), bookUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${bookUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, bookUploadStatus.message), bookUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, bookUploadStatus.queue.filter(q => q.status === "success").length, " / ", bookUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, bookUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search textbooks...",
    value: fileSearchQuery,
    onChange: e => setFileSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredBooks.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bookOpen",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • PDF Textbook"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Textbook"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredBooks.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No books cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookOpen",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Distraction-Free Textbook Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any textbook or reference manual from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'questions' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Term-Final Questions"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, questionsList.length, " papers")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, questionUploadFile, "question", {
      setIsUploading: setIsQuestionUploading,
      setUploadProgress: setQuestionUploadProgress,
      setUploadStatus: setQuestionUploadStatus,
      setUploadFile: setQuestionUploadFile,
      fileInputRef: questionFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: e => setQuestionUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "question-upload-input",
    ref: questionFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "question-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, questionUploadFile && questionUploadFile.length > 0 ? questionUploadFile.length === 1 ? `Selected: ${questionUploadFile[0].name}` : `Selected: ${questionUploadFile.length} files` : "Upload term-final exam question papers directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), questionUploadFile && questionUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setQuestionUploadFile([]);
      if (questionFileInputRef.current) questionFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isQuestionUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isQuestionUploading ? "Uploading..." : "Save to Questions"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isQuestionUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${questionUploadProgress}%`
    }
  })), questionUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${questionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, questionUploadStatus.message), questionUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, questionUploadStatus.queue.filter(q => q.status === "success").length, " / ", questionUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, questionUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search questions...",
    value: fileSearchQuery,
    onChange: e => setFileSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredQuestions.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "fileText",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • PDF Question Paper"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Question"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredQuestions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No exam questions cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Term-Final Questions Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any term-final question paper from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'solutions' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Solution Manuals"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, solutionsList.length, " manuals")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, solutionUploadFile, "solution", {
      setIsUploading: setIsSolutionUploading,
      setUploadProgress: setSolutionUploadProgress,
      setUploadStatus: setSolutionUploadStatus,
      setUploadFile: setSolutionUploadFile,
      fileInputRef: solutionFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: e => setSolutionUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "solution-upload-input",
    ref: solutionFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "solution-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, solutionUploadFile && solutionUploadFile.length > 0 ? solutionUploadFile.length === 1 ? `Selected: ${solutionUploadFile[0].name}` : `Selected: ${solutionUploadFile.length} files` : "Upload exam solutions or step-by-step guides directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), solutionUploadFile && solutionUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSolutionUploadFile([]);
      if (solutionFileInputRef.current) solutionFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSolutionUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSolutionUploading ? "Uploading..." : "Save to Solutions"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSolutionUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${solutionUploadProgress}%`
    }
  })), solutionUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${solutionUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, solutionUploadStatus.message), solutionUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, solutionUploadStatus.queue.filter(q => q.status === "success").length, " / ", solutionUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, solutionUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search solution manuals...",
    value: fileSearchQuery,
    onChange: e => setFileSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredSolutions.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • PDF Exam Solve"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Solve"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSolutions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No exam solutions cataloged inside this folder.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Solution Manuals Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any solution manual or guide from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'solved' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Term-Final Solved"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, solvedList.length, " solved papers")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, solvedUploadFile, "solved", {
      setIsUploading: setIsSolvedUploading,
      setUploadProgress: setSolvedUploadProgress,
      setUploadStatus: setSolvedUploadStatus,
      setUploadFile: setSolvedUploadFile,
      fileInputRef: solvedFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc",
    onChange: e => setSolvedUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "solved-upload-input",
    ref: solvedFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "solved-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, solvedUploadFile && solvedUploadFile.length > 0 ? solvedUploadFile.length === 1 ? `Selected: ${solvedUploadFile[0].name}` : `Selected: ${solvedUploadFile.length} files` : "Upload exam solutions or solved answer keys directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), solvedUploadFile && solvedUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSolvedUploadFile([]);
      if (solvedFileInputRef.current) solvedFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSolvedUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSolvedUploading ? "Uploading..." : "Save to Solved"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSolvedUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${solvedUploadProgress}%`
    }
  })), solvedUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${solvedUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, solvedUploadStatus.message), solvedUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, solvedUploadStatus.queue.filter(q => q.status === "success").length, " / ", solvedUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, solvedUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search solved answers...",
    value: fileSearchQuery,
    onChange: e => setFileSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredSolved.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • PDF Exam Solve"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Solve"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSolved.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No solved papers cataloged inside this folder yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && solvedList.some(f => f.index === previewFile.index) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Reading: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Reader")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Term-Final Solved Reader"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any term-final solved answer or guide from the left catalog to launch our integrated full-screen PDF workspace.")))), primarySection === 'slides' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Class Slides & Assets"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, slidesList.length, " files")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pb-3 border-b border-white border-opacity-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase"
  }, "Folders"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCreateFolder,
    className: "flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folderPlus",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, "Create"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1"
  }, (activeCourse.folders || ["Root"]).map(folder => {
    const isSelected = currentFolder === folder;
    return /*#__PURE__*/React.createElement("button", {
      key: folder,
      type: "button",
      onClick: () => {
        setCurrentFolder(folder);
        setPreviewFile(null);
      },
      className: `flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ${isSelected ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' : 'folder-btn-unselected'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder",
      className: `w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[80px]"
    }, folder), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1 ml-1",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("span", {
      onClick: e => handleRenameFolder(e, folder),
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: `Rename ${folder}`
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    }))), folder !== "Root" && /*#__PURE__*/React.createElement("span", {
      onClick: e => handleDeleteFolder(e, folder),
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: `Delete ${folder}`
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12"
    })))));
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, slideUploadFile, "slide", {
      setIsUploading: setIsSlideUploading,
      setUploadProgress: setSlideUploadProgress,
      setUploadStatus: setSlideUploadStatus,
      setUploadFile: setSlideUploadFile,
      fileInputRef: slideFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: ".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.zip,.rar",
    onChange: e => setSlideUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "slide-upload-input",
    ref: slideFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "slide-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, slideUploadFile && slideUploadFile.length > 0 ? slideUploadFile.length === 1 ? `Selected: ${slideUploadFile[0].name}` : `Selected: ${slideUploadFile.length} files` : "Upload lecture slides, notes, or spreadsheets."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), slideUploadFile && slideUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSlideUploadFile([]);
      if (slideFileInputRef.current) slideFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSlideUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isSlideUploading ? "Uploading..." : "Save to Slides"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isSlideUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${slideUploadProgress}%`
    }
  })), slideUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${slideUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, slideUploadStatus.message), slideUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, slideUploadStatus.queue.filter(q => q.status === "success").length, " / ", slideUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, slideUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search slides...",
    value: fileSearchQuery,
    onChange: e => setFileSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[350px] overflow-y-auto pr-1"
  }, filteredSlides.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: (file.type || "").toUpperCase().includes('PDF') || (file.name || "").toLowerCase().endsWith('.pdf') ? 'fileText' : 'layers',
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • ", file.type || "Class Slide"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Asset"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredSlides.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No slide materials cataloged inside this folder yet."))), /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-glow text-white"
  }, "Study Reference Links"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddLink,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1"
  }, "Reference Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "e.g. Perry's Handbook Chapter 5",
    value: newLink.title,
    onChange: e => setNewLink({
      ...newLink,
      title: e.target.value
    }),
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[9px] uppercase font-semibold text-slate-400 tracking-wider font-display block mb-1"
  }, "Hyperlink URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    placeholder: "https://example.com/resource",
    value: newLink.url,
    onChange: e => setNewLink({
      ...newLink,
      url: e.target.value
    }),
    className: "glass-input w-full px-3 py-1.5 rounded-lg text-xs",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-[10px] uppercase tracking-wider rounded-lg transition-all shadow-md shadow-sky-950/20"
  }, "Add Reference Link")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[220px] overflow-y-auto pr-1"
  }, (activeCourse.reference_links || []).map((link, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "glass-panel p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs border-white border-opacity-5 hover:bg-white/5 transition-colors"
  }, /*#__PURE__*/React.createElement("a", {
    href: link.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "font-display font-medium text-slate-300 hover:text-accent-sky truncate flex items-center space-x-1.5 max-w-[170px]"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "externalLink",
    className: "w-3.5 h-3.5 text-accent-sky flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "truncate"
  }, link.title)), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteLink(idx),
    className: "p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-all flex-shrink-0",
    title: "Remove Link"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    className: "w-3 h-3"
  })))), (activeCourse.reference_links || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-4 text-center text-slate-500 text-[10px] font-display"
  }, "No custom reference links added yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && slidesList.some(f => f.index === previewFile.index) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fileText",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Preview: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Preview")), (previewFile.type || "").toUpperCase().includes('PDF') || (previewFile.name || "").toLowerCase().endsWith('.pdf') ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden",
    style: {
      height: "550px"
    }
  }, renderPdfViewerOrPlaceholder(previewFile))) : (previewFile.type || "").toUpperCase().includes('VIDEO') || (previewFile.type || "").toUpperCase().includes('RECORDED CLASS') || (previewFile.name || "").toLowerCase().endsWith('.mp4') || (previewFile.name || "").toLowerCase().endsWith('.webm') || (previewFile.name || "").toLowerCase().endsWith('.ogg') || (previewFile.name || "").toLowerCase().endsWith('.mov') || (previewFile.name || "").toLowerCase().endsWith('.mkv') ? /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center",
    style: {
      height: "550px"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: `${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`,
    controls: true,
    preload: "metadata",
    playsInline: true,
    className: "w-full h-full rounded-xl shadow-lg border border-white border-opacity-5"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "p-16 text-center bg-dark-900 rounded-2xl space-y-4 border border-white border-opacity-5 flex flex-col items-center justify-center",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-base text-white"
  }, "Dynamic Preview Restricted"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-sm leading-relaxed"
  }, "Dynamic previewing is only optimized for PDF and video assets. For spreadsheet models (.xlsx), HYSYS setups (.hsc), Matlab scripts (.m), or archives (.zip), download the file directly to open locally."), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDownloadFile(previewFile.index, previewFile.name),
    className: "px-4 py-2 bg-gradient-to-r from-accent-sky to-accent-violet hover:from-sky-500 hover:to-violet-600 text-white font-display font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-950/20 flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Download Asset")))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Hub-Class Slides Terminal"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any slide, lecture note, or asset from the left catalog to launch our integrated interactive workspace.")))), primarySection === 'videos' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start animate-section-entrance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-base text-white"
  }, "Recorded Class Videos"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold bg-accent-sky/10 px-2 py-0.5 rounded border border-accent-sky/10"
  }, videosList.length, " recordings")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pb-3 border-b border-white border-opacity-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase"
  }, "Video Folders"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCreateVideoFolder,
    className: "flex items-center space-x-1 text-[10px] text-sky-300 hover:text-white font-display font-semibold transition-all bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folderPlus",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, "Create"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1"
  }, (activeCourse.video_folders || ["Root"]).map(folder => {
    const isSelected = currentVideoFolder === folder;
    return /*#__PURE__*/React.createElement("button", {
      key: folder,
      type: "button",
      onClick: () => {
        setCurrentVideoFolder(folder);
        setPreviewFile(null);
      },
      className: `flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all border ${isSelected ? 'bg-gradient-to-r from-accent-sky to-accent-violet text-white border-accent-sky border-opacity-40 shadow-md shadow-sky-950/40' : 'folder-btn-unselected'}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "folder",
      className: `w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-400/70'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate max-w-[80px]"
    }, folder), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-1 ml-1",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("span", {
      onClick: e => handleRenameVideoFolder(e, folder),
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: `Rename ${folder}`
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    }))), folder !== "Root" && /*#__PURE__*/React.createElement("span", {
      onClick: e => handleDeleteVideoFolder(e, folder),
      className: "p-0.5 rounded hover:bg-black/10 transition-all text-black",
      title: `Delete ${folder}`
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-2.5 h-2.5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 2.5
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12"
    })))));
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => handleFileUpload(e, videoUploadFile, "video", {
      setIsUploading: setIsVideoUploading,
      setUploadProgress: setVideoUploadProgress,
      setUploadStatus: setVideoUploadStatus,
      setUploadFile: setVideoUploadFile,
      fileInputRef: videoFileInputRef
    }),
    className: "relative group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    accept: "video/*",
    onChange: e => setVideoUploadFile(Array.from(e.target.files)),
    className: "hidden",
    id: "video-upload-input",
    ref: videoFileInputRef
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "video-upload-input",
    className: "glass-panel border-dashed border-2 border-sky-500/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500/50 transition-colors group-hover:bg-sky-950/10 block"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    className: "w-6 h-6 text-accent-sky mb-2 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-display font-semibold text-[10px] text-sky-300 text-center px-2"
  }, videoUploadFile && videoUploadFile.length > 0 ? videoUploadFile.length === 1 ? `Selected: ${videoUploadFile[0].name}` : `Selected: ${videoUploadFile.length} files` : "Upload recorded lectures, tutorials, or HYSYS demos directly."), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-slate-500 mt-0.5"
  }, "Drag & drop or click to browse")), videoUploadFile && videoUploadFile.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mt-2 justify-end animate-fade-in"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setVideoUploadFile([]);
      if (videoFileInputRef.current) videoFileInputRef.current.value = "";
    },
    className: "px-2 py-1 che-cancel-btn rounded-lg text-[10px] font-display"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isVideoUploading,
    className: "px-3 py-1 che-submit-btn text-white rounded-lg text-[10px] font-display font-semibold flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, isVideoUploading ? "Uploading..." : "Save to Videos"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3 h-3"
  })))), isVideoUploading && /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-full h-1.5 overflow-hidden animate-pulse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#5C061C] h-full transition-all duration-300",
    style: {
      width: `${videoUploadProgress}%`
    }
  })), videoUploadStatus.message && /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-lg text-[10px] font-display font-medium ${videoUploadStatus.type === 'success' ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'}`
  }, videoUploadStatus.message), videoUploadStatus.type === "batch" && /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-xl space-y-3 mt-4 animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-black/5 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-display font-bold text-xs text-slate-300"
  }, "Upload Batch Queue"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-accent-sky font-bold"
  }, videoUploadStatus.queue.filter(q => q.status === "success").length, " / ", videoUploadStatus.queue.length, " completed")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[150px] overflow-y-auto pr-1"
  }, videoUploadStatus.queue.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex items-center justify-between text-xs py-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[180px] font-medium text-slate-400"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, item.status === "pending" && /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"
  }), item.status === "uploading" && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 text-accent-violet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    className: "w-3.5 h-3.5 animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, item.progress, "%")), item.status === "success" && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-500 font-bold"
  }), item.status === "error" && /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] text-rose-500 font-semibold",
    title: item.error
  }, "Failed")))))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search videos...",
    value: videoSearchQuery,
    onChange: e => setVideoSearchQuery(e.target.value),
    className: "glass-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 max-h-[450px] overflow-y-auto pr-1"
  }, filteredVideos.map(file => {
    const isPreviewing = previewFile && previewFile.index === file.index;
    return /*#__PURE__*/React.createElement("div", {
      key: file.index,
      onClick: () => setPreviewFile(file),
      className: `glass-panel border-opacity-5 p-3.5 pr-24 relative rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-sky-950/5 cursor-pointer ${isPreviewing ? 'border-accent-sky border-opacity-40 bg-sky-950/10' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-accent-sky flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "video",
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex flex-col items-start justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "che-book-title block line-clamp-2 leading-relaxed"
    }, file.name ? file.name.replace(/_/g, ' ').replace(/-/g, ' ') : ''), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] text-slate-500 font-display"
    }, file.size, " • Recorded Class"))), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-3 right-3 flex items-center space-x-2",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteFile(file.index),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-rose-50 rounded-lg transition-colors",
      title: "Delete Video"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      className: "w-3.5 h-3.5 !text-rose-700 hover:!text-rose-900"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDownloadFile(file.index, file.name),
      className: "p-1.5 bg-dark-900 border border-white border-opacity-5 hover:bg-sky-600 rounded-lg text-slate-400 hover:text-white",
      title: "Download"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      className: "w-3.5 h-3.5"
    }))));
  }), filteredVideos.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "py-8 text-center text-slate-500 text-xs font-display"
  }, "No recorded videos cataloged inside this folder yet.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, previewFile && videosList.some(f => f.index === previewFile.index) ? /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-6 rounded-2xl space-y-4 animate-fade-in border-accent-sky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white border-opacity-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-5 h-5 text-accent-sky"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-sm text-white line-clamp-1"
  }, "Play Class: ", previewFile.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreviewFile(null),
    className: "che-close-reader-btn"
  }, "Close Preview")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-dark-900 rounded-xl overflow-hidden flex items-center justify-center",
    style: {
      height: "550px"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: `${API_BASE}/api/download/${activeCourse.id}/${previewFile.index}`,
    controls: true,
    preload: "metadata",
    playsInline: true,
    className: "w-full h-full rounded-xl shadow-lg border border-white border-opacity-5"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "glass-panel rounded-2xl p-16 text-center border-dashed border-2 border-white border-opacity-10 flex flex-col items-center justify-center space-y-3",
    style: {
      height: "500px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-accent-sky border border-sky-500/20 mb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-white"
  }, "Hub-Class Video Terminal"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs max-w-md leading-relaxed"
  }, "Select any recorded class lecture or HYSYS tutorial from the left catalog to launch our high-performance stream player."))))))), /*#__PURE__*/React.createElement("footer", {
    className: "glass-panel border-t border-white border-opacity-5 py-4 px-6 mt-auto text-center text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("p", null, "© ", new Date().getFullYear(), " Chemical Engineering Hub Space. Designed for premium study acceleration."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "credit-developed-by text-[10px] uppercase tracking-wider"
  }, "Developed by"), /*#__PURE__*/React.createElement("span", {
    className: "credit-2102072 font-display text-xs"
  }, "Ibrahim Hisham-2102072")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 font-bold"
  }, "•"), /*#__PURE__*/React.createElement("span", {
    className: "credit-presented-by text-[10px] uppercase tracking-wider"
  }, "Presented by DDC"))));
}

// Render React App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(/*#__PURE__*/React.createElement(App, null));
