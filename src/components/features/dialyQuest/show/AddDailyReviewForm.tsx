import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const postReview = async ({
  good,
  more,
  challenge,
  level,
  qol,
  daily_quest_id,
}: {
  good: string;
  more: string;
  challenge: string;
  level: number;
  qol: number;
  daily_quest_id: number;
}) => {
  const res = await fetch(`/api/daily_quest/review`, {
    method: "POST",
    body: JSON.stringify({ good, more, challenge, level, qol, daily_quest_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddDailyReviewForm = ({
  daily_quest_id,
  onSubmit,
}: {
  daily_quest_id: number;
  onSubmit: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    good: string;
    more: string;
    challenge: string;
    level: number;
    qol: number;
  }>({
    defaultValues: {
      good: "",
      more: "",
      challenge: "",
      level: 3,
      qol: 3,
    },
  });

  const submitReview: SubmitHandler<{
    good: string;
    more: string;
    challenge: string;
    level: number;
    qol: number;
  }> = async (formData) => {
    await postReview({
      good: formData.good,
      more: formData.more,
      challenge: formData.challenge,
      level: formData.level,
      qol: formData.qol,
      daily_quest_id,
    });
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitReview)} className="w-full max-w-md">
        <div className="mb-4">
          <input
            id="good"
            placeholder="良かったところ"
            {...register("good", {
              required: {
                value: true,
                message: "goodを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.good && (
            <div className="text-red-500 text-sm">{errors.good.message}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            id="more"
            placeholder="良くなかったところ"
            {...register("more", {
              required: {
                value: true,
                message: "moreを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.more && (
            <div className="text-red-500 text-sm">{errors.more.message}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            id="challenge"
            placeholder="次から挑戦するところ"
            {...register("challenge", {
              required: {
                value: true,
                message: "challengeを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.challenge && (
            <div className="text-red-500 text-sm">
              {errors.challenge.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <input
            id="level"
            type="number"
            placeholder="達成度"
            {...register("level", {
              required: {
                value: true,
                message: "達成度を入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.level && (
            <div className="text-red-500 text-sm">{errors.level.message}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            id="qol"
            type="number"
            placeholder="QOL"
            {...register("qol", {
              required: {
                value: true,
                message: "QOLを入力してください",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.qol && (
            <div className="text-red-500 text-sm">{errors.qol.message}</div>
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

export default AddDailyReviewForm;
