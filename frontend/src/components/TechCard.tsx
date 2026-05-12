"use client";
import React from "react";
import { ReactSVG } from "react-svg";

export interface TechItem {
  name: string;
  width?: number;
  height?: number;
  src: string;
  fillColor?: boolean;
}

export const TechCard = ({ name, src, width, height, fillColor }: TechItem) => {
  return (
    <li className="flex flex-col items-center w-1/2 sm:w-1/4 md:w-1/6 lg:w-[12.5%] cursor-pointer">
      <div className="flex items-center justify-center w-[64px] h-[64px]">
        <ReactSVG
          src={src}
          beforeInjection={(svg) => {
            // Set kích thước
            if (width) svg.setAttribute("style", `width: ${width}px`);
            if (height) svg.setAttribute("height", `${height}px`);

            if (fillColor) {
              // Tìm tất cả các phần tử có thể chứa màu (path, circle, rect,...)
              const elements = svg.querySelectorAll(
                "path, circle, rect, ellipse, polygon, polyline",
              );
              elements.forEach((el) => {
                el.setAttribute("fill", "currentColor");
                el.removeAttribute("stroke"); // Xóa stroke nếu cần để icon đồng nhất
              });
            }
          }}
          className="transition-colors"
        />
      </div>
      <span className="mt-2 text-[16px] transition-colors">{name}</span>
    </li>
  );
};
