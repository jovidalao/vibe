import { type ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn: Merge class names smartly (clsx + tailwind-merge)
 *
 * English: A helper to combine conditional class names and resolve Tailwind CSS
 *          class conflicts in a predictable way.
 * 中文：用于合并条件类名并消除 Tailwind CSS 类名冲突的工具函数。
 */
export function cn(...inputs: ClassValue[]) {
  // English: First combine inputs with clsx, then resolve Tailwind conflicts with twMerge
  // 中文：先用 clsx 组合类名，再用 twMerge 合并并处理 Tailwind 冲突
  return twMerge(clsx(inputs));
}


