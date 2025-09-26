import { UserData } from "../data/UserData";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaSquareXTwitter, FaHeart } from "react-icons/fa6";

function Footer() {
  const { socialMedia } = UserData;
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: AiFillGithub,
    linkedin: FaLinkedinIn,
    instagram: AiFillInstagram,
    X: FaSquareXTwitter,
  };

  return (
    <footer className="relative mt-auto pt-12">
      <div className="bg-gradient-to-t from-slate-950 to-transparent px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-6">
            {socialMedia.map((social) => {
              const Icon = socialIcons[social.socialMediaName];
              return (
                <a
                  key={social.socialMediaName}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2"
                  aria-label={`Visit ${social.socialMediaName}`}
                >
                  <div className="absolute inset-0 rounded-lg bg-[#f0c14b] opacity-0 blur transition-all duration-300 group-hover:opacity-20"></div>
                  <Icon className="text-2xl text-[#a3a3a3] transition-all duration-300 group-hover:scale-110 group-hover:text-[#f0c14b]" />
                </a>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
              <span>Made with</span>
              <FaHeart className="text-[#f0c14b] animate-pulse" />
              <span>by Muhammad Rafiq</span>
            </div>
            <p className="text-xs text-[#a3a3a3]">
              © {currentYear} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
