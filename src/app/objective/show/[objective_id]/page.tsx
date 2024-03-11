"use client";
import Loading from "@/components/features/Loading";
import AddReviewForm from "@/components/features/objective/show/AddReviewForm";
import AddTodoForm from "@/components/features/objective/show/AddTodoForm";
import { ObjectiveType } from "@/types/objective";
import { ReviewType } from "@/types/review";
import { TodoType } from "@/types/todo";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

// 詳細ページ
const ObjectiveShowPage = ({
  params,
}: {
  params: { objective_id: number };
}) => {
  const [objective, setObjective] = useState<ObjectiveType | null>(null);
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);
  const [openTodoForm, setOpenTodoForm] = useState<boolean>(false);

  const getObjective = async (objective_id: number) => {
    const res = await fetch(`/api/objective/${objective_id}`, {
      cache: "no-store", // ssr
    });
    const data = await res.json();
    console.log(data);
    return data.objective;
  };

  const getObjectiveWithTodo = async () => {
    const objectiveData = await getObjective(params.objective_id);
    setObjective(objectiveData);
  };

  useEffect(() => {
    getObjectiveWithTodo();
  }, [params.objective_id]);

  if (!objective) return <Loading />;
  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{objective.title}</h1>
      <p className="mb-4">{objective.description}</p>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Todo</h2>
        {openTodoForm ? (
          <div>
            <AddTodoForm
              objective_id={objective.id}
              onSubmit={() => getObjectiveWithTodo()}
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-2"
              onClick={() => setOpenTodoForm(false)}
            >
              閉じる
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setOpenTodoForm(true)}
          >
            Todoを追加する
          </button>
        )}
        {objective.todos.map((todo: TodoType, index: number) => (
          <p key={index} className="ml-4">
            {todo.description}
          </p>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">振り返り</h2>
        {openReviewForm ? (
          <div>
            <AddReviewForm
              objective_id={objective.id}
              onSubmit={() => getObjectiveWithTodo()}
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-2"
              onClick={() => setOpenReviewForm(false)}
            >
              閉じる
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setOpenReviewForm(true)}
          >
            振り返りを追加する
          </button>
        )}
        {objective.reviews.map((review: ReviewType, index: number) => (
          <div key={index} className="ml-4">
            <p>good: {review.good}</p>
            <p>more: {review.more}</p>
            <p>try: {review.challenge}</p>
            <p>{format(review.day, "M/d hh:mm:ss")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectiveShowPage;
