/* Performance Optimization: Image component with lazy loading and blur-up effect */
import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

const OptimizedImage = memo(({ src, alt, className, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState("");

  useEffect(() => {
    // Create tiny placeholder
    const canvas = document.createElement("canvas");
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a1a2e"; // Match your theme's background
    ctx.fillRect(0, 0, 10, 10);
    setBlurDataURL(canvas.toDataURL());
  }, []);

  return (
    <div className={`relative ${className || ""}`} style={{ width, height }}>
      {!isLoaded && blurDataURL && (
        <img
          src={blurDataURL}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ filter: "blur(20px)", transform: "scale(1.1)" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
