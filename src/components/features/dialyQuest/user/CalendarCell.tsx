"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { DailyQuestType } from "@/types/dailyQuest";
import useUser from "@/hooks/useUser";
import { SubmitHandler, useForm } from "react-hook-form";

const postDailyQuest = async ({
  title,
  description,
  day,
  user_id,
}: {
  title: string;
  description: string;
  day: Date;
  user_id: number;
}) => {
  const res = await fetch(`/api/daily_quest`, {
    method: "POST",
    body: JSON.stringify({ title, description, day, user_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const CalendarCell = ({
  quests,
  date,
  onSubmit,
}: {
  quests: DailyQuestType[];
  date: Date;
  onSubmit: () => void;
}) => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
  }>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // daily quest投稿
  const submitQuest: SubmitHandler<{
    title: string;
    description: string;
  }> = async (formData) => {
    if (user) {
      await postDailyQuest({
        title: formData.title,
        description: formData.description,
        day: date,
        user_id: user?.id,
      });
      onSubmit();
    }
  };

  // daily quest完了処理
  const handleAchievement = async (id: number) => {
    alert("未実装だよ");
  };

  return (
    <>
      {quests.find(
        (quest) =>
          new Date(quest.day).toDateString() == new Date(date).toDateString()
      ) ? (
        <div>
          {quests
            .filter((quest) => format(quest.day, "M/d") == format(date, "M/d"))
            .map((quest: DailyQuestType) => (
              <>
                <div>
                  <p>{quest.title}</p>
                  {quest.is_achievement ? <p>done</p> : <p>yet</p>}
                </div>
                <p>{quest.description}</p>
                <p>
                  {quest.is_achievement ? (
                    <p>
                      {format(quest.achievement_day, "M/d aaaaa'm' hh:mm:ss")}
                    </p>
                  ) : (
                    <p>
                      <button onClick={() => handleAchievement(quest.id)}>
                        click done!
                      </button>
                    </p>
                  )}
                </p>
                <p>
                  <a href={`/dailyquest/show/${quest.id}`}>詳細</a>
                </p>
              </>
            ))}
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(submitQuest)}>
            <div>
              <input
                id="title"
                placeholder="タイトル"
                {...register("title", {
                  required: {
                    value: true,
                    message: "タイトルを入力してください",
                  },
                })}
              />
              {errors.title && <div>{errors.title.message}</div>}
            </div>
            <div>
              <input
                id="description"
                placeholder="詳細"
                {...register("description", {
                  required: {
                    value: true,
                    message: "詳細を入力してください",
                  },
                })}
              />
              {errors.description && <div>{errors.description.message}</div>}
            </div>
            <button type="submit">追加</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CalendarCell;
