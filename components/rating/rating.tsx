"use client";
import { useState } from "react";

export default function Rating({
  initialRating = 0,
  maxRating = 5,
  onRate,
}: {
  initialRating?: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
}) {
  const [rating, setRating] = useState(initialRating);

  const handleMouseEnter = (index: number) => {
    setRating(index + 1);
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRate) onRate(newRating);
  };

  return (
    <div style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(index)}
          style={{
            fontSize: "24px",
            color: index < rating ? "gold" : "lightgray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
