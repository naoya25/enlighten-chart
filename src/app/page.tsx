"use client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session, user, signOut } = useUser();
  console.log(user);

  const router = useRouter();
  return (
    <main className="p-24">
      <div className="container mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Enlighten Chart
        </h1>
        <p className="text-lg text-center text-gray-700">
          自分の目標を明確にし、達成するためのステップを計画しましょう！
        </p>
        {session ? (
          <>
            <p className="text-lg text-center m-4">Hello, {user?.email} !</p>
            <p className="text-lg text-center m-4">
              <button
                onClick={() => {
                  signOut();
                  router.push("/user/login");
                }}
              >
                ログアウト
              </button>
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-center m-4">
              <a href="/user/register">はじめての方はこちら💁</a>
            </p>
            <p className="text-lg text-center m-4">
              <a href="/user/login">ログイン</a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
