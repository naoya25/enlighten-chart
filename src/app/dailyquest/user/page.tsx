"use client";
import Loading from "@/components/features/Loading";
import WeeklyCalendar from "@/components/features/dialyQuest/user/WeeklyCalendar";
import useUser from "@/hooks/useUser";
import { DailyQuestType } from "@/types/dailyQuest";
import { format } from "date-fns";

// ログイン中のユーザーの日課のみを表示
const UserDailyQuestPage = () => {
  const { session, user } = useUser();

  return (
    <div>
      {session ? (
        user ? (
          <WeeklyCalendar />
        ) : (
          <Loading />
        )
      ) : (
        <>
          <p>ログインしてね</p>
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
    </div>
  );
};

export default UserDailyQuestPage;
