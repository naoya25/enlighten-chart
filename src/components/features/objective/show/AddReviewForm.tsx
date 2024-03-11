import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const postReview = async ({
  good,
  more,
  challenge,
  day,
  objective_id,
}: {
  good: string;
  more: string;
  challenge: string;
  day: Date;
  objective_id: number;
}) => {
  const res = await fetch(`/api/objective/review`, {
    method: "POST",
    body: JSON.stringify({ good, more, challenge, day, objective_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const AddReviewForm = ({
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
    good: string;
    more: string;
    challenge: string;
  }>({
    defaultValues: {
      good: "",
      more: "",
      challenge: "",
    },
  });

  const submitReview: SubmitHandler<{
    good: string;
    more: string;
    challenge: string;
  }> = async (formData) => {
    await postReview({
      good: formData.good,
      more: formData.more,
      challenge: formData.challenge,
      day: new Date(),
      objective_id,
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

export default AddReviewForm;
