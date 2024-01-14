import TopBar from "./TopBar";
import NavBar from "./NavBar";
import { ReactNode } from "react";
import Footer from "./Footer";

interface IContainerProps {
  children: ReactNode;
}

/**
 * LJM 2024.01.07
 * @param 하위 컴포넌트, HTML-tag
 * @returns HTML default setting
 */
export default function Container({ children }: IContainerProps) {
  return (
    <div className="flex flex-col relative">
      {/* relative 는 NavBar sticky 때문 */}
      <TopBar />
      <NavBar />
      <div className="bg-white min-h-[100vh] overflow-hidden">
        {/* BODY */}
        {children}
      </div>
      <Footer />
    </div>
  );
}
