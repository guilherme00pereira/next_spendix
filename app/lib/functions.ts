import dayjs from "dayjs";
import { latinCharacters } from "./data";

export const amountFormatter = (v: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(v);
};

export const convertNameToSlug = (name: string) => {
  name = name
    .split("")
    .map((char) => latinCharacters[char] || char)
    .join("");
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const calculatePercentageFromPrevious = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
}

export const formatCardNumbers = (lastNumbers: string) => {
  const n = lastNumbers ?? "****";
  return `**** **** **** ${n}`;
}

export const serializeToServeActions = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export const getDates = (date: string) => {
  const startDate = date ? dayjs(date).startOf("M").format("YYYY-MM-DD") : dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = date ? dayjs(date).endOf("M").format("YYYY-MM-DD") : dayjs().endOf("M").format("YYYY-MM-DD");
  return [startDate, endDate];
};