import { IInfoBlockProps } from "../components/MyPages/InfoBlock";

export const InfoBlocks: IInfoBlockProps[] = [
  {
    text: "저체중",
    range: "18.5",
    rank: 0,
  },
  {
    text: "정상",
    range: "18.5~22.9",
    rank: 1,
  },
  {
    text: "비만전단계",
    range: "23~24.9",
    rank: 2,
  },
  {
    text: "1단계 비만",
    range: "25~29.9",
    rank: 3,
  },
  {
    text: "2단계 비만",
    range: "30~34.9",
    rank: 4,
  },
  {
    text: "3단계 비만",
    range: "≥35",
    rank: 5,
  },
];
