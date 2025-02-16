"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export function Header(): React.ReactElement {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const translateY = Math.min(scrollY * 0.3, 50);
  const opacity = scrollY < 100 ? scrollY / 100 : 1;
  const avatarStyle: React.CSSProperties = {
    transform: `translate3d(0, ${translateY}px, 0)`,
    opacity,
    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
    willChange: "transform, opacity",
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="container mx-auto flex items-center p-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">My Personal Website</h1>
        </div>
        <div className="avatar" style={avatarStyle}>
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}