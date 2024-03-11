"use client";
import Loading from "@/components/features/Loading";
import useUser from "@/hooks/useUser";
import { ObjectiveType } from "@/types/objective";

// ログイン中のユーザーの投稿のみを表示
const UserObjectivePage = () => {
  const { session, user } = useUser();

  return (
    <div>
      {session ? (
        user ? (
          user?.objectives.map((objective: ObjectiveType) => (
            <div key={objective.id} className="border border-gray-200 m-5 p-5">
              <p>title: {objective.title}</p>
              <p>description: {objective.description}</p>
              <p>deadline: {new Date(objective.deadline).toDateString()}</p>
              <p>
                <a href={`/objective/show/${objective.id}`}>詳細</a>
              </p>
            </div>
          ))
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

export default UserObjectivePage;
