import { useNavigate } from "react-router-dom";

/**
 * LJM 2024.01.27
 * @returns 네비게이션 바
 */
export default function NavBar() {
  const nav = useNavigate();
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let destination = event.currentTarget.id.toLowerCase();
    nav(
      `${
        destination === "wee todo"
          ? "todo"
          : destination === "main"
          ? "/"
          : destination
      }`
    );
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Sticky Bar */}
      <div className="relative flex flex-row justify-center items-center bg-blue-500 px-10 py-2">
        <div className="absolute left-10 hidden sm:block">
          {/* Typo-Logo */}
          <h2>타이포 로고</h2>
        </div>

        <div className="flex flex-row justify-between items-center gap-4">
          {/* Navigation */}
          {["MAIN", "Wee Todo", "COMMUNITY"].map(
            (destination: string, index: number) => (
              <div
                onClick={onMove}
                key={index}
                className="px-4 cursor-pointer text-base font-bold"
                id={`${destination}`}
              >
                <h2>{destination}</h2>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
