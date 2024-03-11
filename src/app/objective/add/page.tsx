"use client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const postObjective = async ({
  title,
  description,
  deadline,
  user_id,
}: {
  title: string;
  description: string;
  deadline: Date;
  user_id: number;
}) => {
  const res = await fetch(`/api/objective`, {
    method: "POST",
    body: JSON.stringify({ title, description, deadline, user_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddObjectivePage = () => {
  const { session, user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    deadline: Date;
  }>({
    defaultValues: {
      title: "",
      description: "",
      deadline: new Date(),
    },
  });

  const submitObjective: SubmitHandler<{
    title: string;
    description: string;
    deadline: Date;
  }> = async (formData) => {
    if (user) {
      await postObjective({
        title: formData.title,
        description: formData.description,
        deadline: new Date(formData.deadline),
        user_id: user.id,
      });
      router.push("/objective/user");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitObjective)}
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <input
            id="title"
            placeholder="タイトル"
            {...register("title", {
              required: {
                value: true,
                message: "タイトルを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title.message}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            id="description"
            placeholder="詳細"
            {...register("description", {
              required: {
                value: true,
                message: "詳細を入力してください",
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

export default AddObjectivePage;
