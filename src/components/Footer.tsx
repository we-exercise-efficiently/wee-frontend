export default function Footer() {
  return (
    <div className="w-full min-h-72 bg-themeDark px-8 py-8 flex flex-col gap-3 text-slate-100">
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between">
        {/* THUMB */}
        <div className="flex flex-col mb-12 sm:mb-0">
          <p className="text-xs mb-4">건강을 WEE해, WEE</p>
          <h1 className="text-3xl">We Exercise</h1>
          <h1 className="text-3xl">Efficiently</h1>
        </div>

        {/* TABLE */}
        <div>
          <table>
            <tr>
              <th className="text-sm text-center sm:text-left px-2 sm:px-8 pb-2">
                새로운 소식
              </th>
              <th className="text-sm text-center sm:text-left px-2 sm:px-8 pb-2">
                도움말
              </th>
              <th className="text-sm text-center sm:text-left px-2 sm:px-8 pb-2">
                ABOUT WEE
              </th>
            </tr>
            <tr>
              <td className="invisible" />
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  로그인 안내
                </p>
              </td>
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  소식
                </p>
              </td>
            </tr>
            <tr>
              <td className="invisible" />
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  AI 루틴 이용 안내
                </p>
              </td>
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  지속 가능성
                </p>
              </td>
            </tr>
            <tr>
              <td className="invisible" />
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  공지사항
                </p>
              </td>
              <td className="invisible" />
            </tr>
            <tr>
              <td className="invisible" />
              <td className="text-xs text-center sm:text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  문의하기
                </p>
              </td>
              <td className="invisible" />
            </tr>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-row justify-between items-end border-b-2 pb-2">
          <div className="flex flex-col items-start gap-1">
            <p className="text-xs">© 2024 WEE, Inc. All Rights Reserved</p>
            <span className="flex flex-row items-center gap-2">
              <p className="text-xs">
                콘텐츠산업진흥법에 의한 콘텐츠 보호 안내
              </p>
              <b className="text-xs underline cursor-pointer">자세히 보기</b>
            </span>
          </div>

          <div className="flex flex-row items-end justify-end">
            <div className="flex flex-col sm:flex-row">
              <div className="text-xs text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  개인정보 처리방침
                </p>
              </div>
              <div className="text-xs text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  이용약관
                </p>
              </div>
              <div className="text-xs text-left px-8 py-2">
                <p className="w-fit transition-all cursor-pointer duration-300 ease-in-out border-transparent border-b pb-1 hover:border-slate-100">
                  법적고지
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs">
          이메일 *******@****.co.kr | 호스팅서비스사업자 WEE-KOREA
        </p>
      </div>
    </div>
  );
}
