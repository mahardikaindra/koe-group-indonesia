/* eslint-disable @typescript-eslint/no-explicit-any */

import Card from "./Card";
import { Heart, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: any; // TODO: Replace 'any' with a proper Blog type
  index: number;
  userId: string | null;
  onLike: () => void;
}

const BlogCard = ({ blog, index, userId, onLike }: BlogCardProps) => {
  const isLiked = blog.likes?.includes(userId);
  const getBadgeColor = (type: string) => {
    if (type === "npwp") return "bg-blue-50 text-blue-700 border-blue-100";
    if (type === "nib")
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all border-emerald-50">
        <div className="relative h-40 bg-slate-100 overflow-hidden">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              className="w-full
                h-full
                object-cover"
              fill
              alt="Blog Image"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
              <ImageIcon size={40} />
            </div>
          )}
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded border shadow-sm ${getBadgeColor(blog.productType)} uppercase`}
          >
            {blog.productType}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className={`absolute bottom-3 right-3 p-2 rounded-full shadow-md transition-all ${isLiked ? "bg-red-500 text-white" : "bg-white text-slate-400"}`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-5 flex-1">
          <div className="flex justify-between items-center mb-2 text-[10px] text-slate-400 font-medium">
            <span>
              {blog.createdAt?.seconds
                ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
                : "Draft"}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={10} className={isLiked ? "text-red-500" : ""} />{" "}
              {blog.likes?.length || 0}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">
            {blog.title || "Judul Kosong"}
          </h3>
          <div
            className="text-sm text-slate-600 line-clamp-3 rich-content leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: blog.content || "<em>Belum ada konten...</em>",
            }}
          />
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button className="text-xs font-bold text-emerald-800 flex items-center gap-1 hover:gap-2 transition-all">
            Buka Detail <ChevronRight size={14} />
          </button>
          <div className="w-6 h-6 rounded-full bg-[#064e3b] text-[10px] text-white flex items-center justify-center font-bold">
            T
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
export default BlogCard;
