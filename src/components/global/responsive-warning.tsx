"use client";
import { useEffect, useState } from "react";

const ResponsiveWarning = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!mounted || !isMobile) return null;

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 mt-5 p-4">
            <div className="text-center space-y-4">
                <p className="text-white text-xl mb-4">
                    This site is allergic to small displays. Please view on desktop or watch the demo below.
                    <br/>
                    Sorry for the inconvenience. Here's a picture of a cute cat instead:
                </p>
                {/* Image placeholder */}
                <div className="flex justify-center w-full mt-4">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt="Cute cat"
                        className="max-w-xs rounded"
                    />
                </div>
                <div className="flex justify-center w-full">
                    {/* Embed YouTube video */}
                    <iframe
                        width="300"
                        height="200"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveWarning;
