"use client";
import Loading from "@/components/features/Loading";
import { DailyQuestType } from "@/types/dailyQuest";
import { ObjectiveType } from "@/types/objective";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const getAllDailyQuests = async () => {
  const res = await fetch("/api/daily_quest", {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  return data.dailyQuests;
};

const AllDailyQuestPage = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questsData = await getAllDailyQuests();
        setQuests(questsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching objectives:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        quests.map((quest: DailyQuestType) => (
          <div key={quest.id} className="border border-gray-200 m-5 p-5">
            <p>今日の目標はこれだ！: {quest.title}</p>
            <p>詳細: {quest.description}</p>
            <p>日付: {format(quest.day, "M/d")}</p>
            <p>
              <a href={`/dailyquest/show/${quest.id}`}>詳細</a>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllDailyQuestPage;
