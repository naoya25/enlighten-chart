"use client";
import React from "react";
import useUser from "@/hooks/useUser";

const Header = () => {
  const { session, user, signOut } = useUser();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <a href="/">Enlighten Chart</a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {session ? (
              <>
                <li>
                  <a href="/dailyquest/user" className="hover:text-gray-300">
                    今日のタスク
                  </a>
                </li>
                <li>
                  <a href="/objective/add" className="hover:text-gray-300">
                    目標追加
                  </a>
                </li>
                <li>
                  <a href="/objective/user" className="hover:text-gray-300">
                    目標一覧
                  </a>
                </li>
                <li>
                  <button
                    className="hover:text-gray-300"
                    onClick={() => signOut()}
                  >
                    ログアウト
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/user/login" className="hover:text-gray-300">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/user/register" className="hover:text-gray-300">
                    新規登録
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
