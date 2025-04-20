import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <div className="pb-2 text-xl xs:text-2xl text-[#e2e8f0] lg:pb-3 lg:text-3xl text-center">
        Sorry, Page Not Found!
      </div>
      <p className="px-4 xs:px-6 pb-6 text-center text-xs xs:text-sm text-[#94a3b8] lg:w-2/4 lg:px-20 lg:pb-8 lg:text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
      </p>
      <div className="">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="h-10 xs:h-[50px] w-[150px] xs:w-[200px] border-2 border-[#f0c14b] bg-transparent text-[#e2e8f0] hover:bg-[#f0c14b] hover:bg-opacity-20 hover:text-white transition-all duration-300 text-sm xs:text-base"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
