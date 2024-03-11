"use client";
import Loading from "@/components/features/Loading";
import AddDailyReviewForm from "@/components/features/dialyQuest/show/AddDailyReviewForm";
import { DailyQuestType } from "@/types/dailyQuest";
import { DailyReviewType } from "@/types/dailyReview";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export const getDailyQuest = async (dailyquest_id: number) => {
  const res = await fetch(`/api/daily_quest/${dailyquest_id}`, {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  console.log(data);
  return data.dailyQuest;
};

// 詳細ページ
const DailyQuestShowPage = ({
  params,
}: {
  params: { dailyquest_id: number };
}) => {
  const [quest, setQuest] = useState<DailyQuestType | null>(null);
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);

  const getDailyQuestWithReview = async () => {
    const questData = await getDailyQuest(params.dailyquest_id);
    setQuest(questData);
  };
  useEffect(() => {
    getDailyQuestWithReview();
  }, [params.dailyquest_id]);

  if (!quest) return <Loading />;
  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{quest.title}</h1>
      <p className="mb-4">{quest.description}</p>
      <p className="mb-4">{format(quest.day, "M/d")}</p>

      <div>
        <h2 className="text-lg font-semibold mb-2">振り返り</h2>
        {openReviewForm ? (
          <div>
            <AddDailyReviewForm
              daily_quest_id={quest.id}
              onSubmit={getDailyQuestWithReview}
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
        {quest.dailyreviews.map((review: DailyReviewType, index: number) => (
          <div key={index} className="ml-4">
            <p>good: {review.good}</p>
            <p>more: {review.more}</p>
            <p>try: {review.challenge}</p>
            <p>達成度: {review.level}</p>
            <p>QOL: {review.qol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyQuestShowPage;
