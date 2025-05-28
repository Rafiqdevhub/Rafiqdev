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

// Use lazy loading for all route components
const Layout = lazy(() => import("./pages/Layout"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ArchiveProjects = lazy(() => import("./pages/ArchiveProjects"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const WhatsAppChat = lazy(() => import("./components/WhatsAppChat"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0f0f1a]">
    <div className="loader-spinner"></div>
  </div>
);

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 800);

    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="App overflow-x-hidden">
        <Router>
          <Preloader load={load} />
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            <ScrollToTopOnRouteChange />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <Layout />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ErrorBoundary>
                      <About />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/projectlist"
                  element={
                    <ErrorBoundary>
                      <ArchiveProjects />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ErrorBoundary>
                      <Contact />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/*"
                  element={
                    <ErrorBoundary>
                      <NotFound />
                    </ErrorBoundary>
                  }
                />
              </Routes>{" "}
              <Suspense
                fallback={<div className="loading-chatbot">Loading...</div>}
              >
                <ErrorBoundary>
                  <Chatbot />
                </ErrorBoundary>
              </Suspense>
              <Suspense
                fallback={<div className="loading-whatsapp">Loading...</div>}
              >
                <ErrorBoundary>
                  <WhatsAppChat />
                </ErrorBoundary>
              </Suspense>
            </Suspense>
          </div>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
