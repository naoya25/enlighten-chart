import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const postTodo = async ({
  description,
  deadline,
  objective_id,
}: {
  description: string;
  deadline: Date;
  objective_id: number;
}) => {
  const res = await fetch(`/api/objective/todo`, {
    method: "POST",
    body: JSON.stringify({ description, deadline, objective_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddTodoForm = ({
  objective_id,
  onSubmit,
}: {
  objective_id: number;
  onSubmit: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    description: string;
    deadline: Date;
  }>({
    defaultValues: {
      description: "",
      deadline: new Date(),
    },
  });

  const submitTodo: SubmitHandler<{
    description: string;
    deadline: Date;
  }> = async (formData) => {
    await postTodo({
      description: formData.description,
      deadline: new Date(formData.deadline),
      objective_id,
    });
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitTodo)} className="w-full max-w-md">
        <div className="mb-4">
          <input
            id="description"
            placeholder="TODO"
            {...register("description", {
              required: {
                value: true,
                message: "TODOを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.description && (
            <div className="text-red-500 text-sm">
              {errors.description.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="date"
            id="deadline"
            placeholder="期限"
            {...register("deadline", {
              required: {
                value: true,
                message: "期限を設定してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.deadline && (
            <div className="text-red-500 text-sm">
              {errors.deadline.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          追加
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
