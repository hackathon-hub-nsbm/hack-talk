import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full relative">
            {/* Divider */}
            <div className="flex items-center justify-center mb-8">
                <div className="h-px w-full max-w-md bg-linear-to-r from-transparent via-gray-600/50 to-transparent" />
            </div>

            <div className="glass-panel rounded-2xl steel-border p-8 text-center max-w-4xl mx-auto">
                {/* Logos row — NSBM + Hackathon Hub */}
                <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                        <h3 className="text-lg font-(--font-orbitron) text-gray-200 tracking-widest">
                            NSBM
                        </h3>
                        <p className="text-[10px] font-(--font-space-mono) text-gray-500 tracking-wider">
                            Green University Town
                        </p>
                    </div>
                    <div className="w-px h-8 bg-gray-600/40" />
                    <div className="text-center">
                        <h3 className="text-lg font-(--font-orbitron) text-gray-200 tracking-widest">
                            Hackathon
                        </h3>
                        <p className="text-[10px] font-(--font-space-mono) text-gray-500 tracking-wider uppercase">
                            Hub
                        </p>
                    </div>
                </div>

                <p className="text-xs font-(--font-space-mono) text-gray-500 tracking-wider mb-6">
                    L2-202, B2 Floor, Faculty of Computing &bull; NSBM Green University
                </p>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                    <Link
                        href="https://www.instagram.com/hackathonhub.nsbm/"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-panel border border-pink-500/20 
                     hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]
                     transition-all duration-300"
                    >
                        <IoLogoInstagram
                            className="text-pink-400 group-hover:scale-110 transition-transform"
                            size={18}
                        />
                        <span className="text-xs font-(--font-space-mono) text-gray-300 tracking-wider uppercase">
                            Instagram
                        </span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/company/hackathon-hub-nsbm/"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-panel border border-blue-500/20 
                     hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]
                     transition-all duration-300"
                    >
                        <FaLinkedin
                            className="text-blue-400 group-hover:scale-110 transition-transform"
                            size={18}
                        />
                        <span className="text-xs font-(--font-space-mono) text-gray-300 tracking-wider uppercase">
                            LinkedIn
                        </span>
                    </Link>

                    <Link
                        href="https://web.facebook.com/people/Hackathon-Hub/61556983036529/"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-panel border border-blue-600/20 
                     hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.1)]
                     transition-all duration-300"
                    >
                        <FaFacebookSquare
                            className="text-blue-400 group-hover:scale-110 transition-transform"
                            size={18}
                        />
                        <span className="text-xs font-(--font-space-mono) text-gray-300 tracking-wider uppercase">
                            Facebook
                        </span>
                    </Link>

                    <Link
                        href="https://github.com/hackathon-hub-nsbm/"
                        target="_blank"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                     glass-panel border border-gray-500/20 
                     hover:border-gray-400/50 hover:shadow-[0_0_15px_rgba(156,163,175,0.1)]
                     transition-all duration-300"
                    >
                        <FaGithub
                            className="text-gray-300 group-hover:scale-110 transition-transform"
                            size={18}
                        />
                        <span className="text-xs font-(--font-space-mono) text-gray-300 tracking-wider uppercase">
                            GitHub
                        </span>
                    </Link>
                </div>

                {/* Footer text */}
                <div className="border-t border-gray-700/30 pt-4">
                    <p className="text-xs font-(--font-space-mono) text-gray-600 tracking-widest">
                        &copy; 2026 Hackathon Hub &mdash; NSBM Green University
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
