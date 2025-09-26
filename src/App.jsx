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

const Layout = lazy(() => import("./pages/Layout"));
const ArchiveProjects = lazy(() => import("./pages/ArchiveProjects"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chatbot = lazy(() => import("./components/Chatbot"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
        <div className=" overflow-x-hidden">
          <Preloader load={load} />
          <div id={load ? "no-scroll" : "scroll"}>
            <ScrollToTopOnRouteChange />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/projectlist" element={<ArchiveProjects />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
