import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden ${className}`}
  >
    {children}
  </div>
);
export default Card;
