import { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

// Use lazy loading for components
const Layout = lazy(() => import("./pages/Layout"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ArchiveProjects = lazy(() => import("./pages/ArchiveProjects"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chatbot = lazy(() => import("./components/Chatbot"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0f0f1a]">
    <div className="loader-spinner"></div>
  </div>
);

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => updateLoad(false), 800);

    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", setAppHeight);
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <div className="App overflow-x-hidden">
          <Preloader load={load} />
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            <ScrollToTopOnRouteChange />

            {/* Main content with routes */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/about" element={<About />} />
                <Route path="/projectlist" element={<ArchiveProjects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Suspense>

            {/* Chatbot component */}
            <Suspense
              fallback={<div className="loading-chatbot">Loading...</div>}
            >
              <ErrorBoundary>
                <Chatbot />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
