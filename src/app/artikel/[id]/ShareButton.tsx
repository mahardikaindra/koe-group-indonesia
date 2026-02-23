"use client";

import React from "react";
import { Share2 } from "lucide-react";

const ShareButton = () => {
  const openModalShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .then(() => console.log("Artikel dibagikan dengan sukses!"))
        .catch((error) => console.error("Gagal membagikan artikel:", error));
    } else {
      // Fallback untuk browser yang tidak mendukung Web Share API
      prompt("Salin URL berikut untuk membagikan artikel:", shareUrl);
    }
  };

  return (
    <button className="flex items-center gap-2" onClick={openModalShare}>
      <Share2
        size={18}
        className="text-gray-400 hover:text-black cursor-pointer"
      />
    </button>
  );
};

export default ShareButton;
