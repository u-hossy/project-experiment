import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout() {
  // useLocationフックで現在のパス情報を取得
  const location = useLocation();

  // ヘッダーを非表示にしたいパスのリスト
  const noHeaderPaths = ["/homepage"];

  // 現在のパスが非表示リストに含まれているかチェック
  const shouldHideHeader = noHeaderPaths.includes(location.pathname);

  return (
    <div className="flex flex-col items-center gap-8 px-2 pt-20 pb-48">
      {!shouldHideHeader && <Header />}

      <Outlet />
    </div>
  );
}

export default Layout;
