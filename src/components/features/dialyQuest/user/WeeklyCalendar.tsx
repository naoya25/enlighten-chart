"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import { DailyQuestType } from "@/types/dailyQuest";
import CalendarCell from "./CalendarCell";
import Loading from "../../Loading";

const getAllDailyQuests = async () => {
  const res = await fetch("/api/daily_quest", {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  return data.dailyQuests;
};

const WeeklyCalendar = () => {
  const [calendarTitle, setCalendarTitle] = useState<string>("");
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [quests, setQuests] = useState<DailyQuestType[]>([]);
  const [loading, setLoading] = useState(true);

  // 1週間分の日付取得
  useEffect(() => {
    const generateCalendarWeeklyDates = (date: Date) => {
      const startDate = startOfWeek(date, { weekStartsOn: 1 });
      const endDate = endOfWeek(date, { weekStartsOn: 1 });
      let week: Date[] = [];

      for (
        let date = new Date(startDate);
        date < endDate;
        date = addDays(date, 1)
      ) {
        week.push(date);
      }
      if (format(startDate, "M") == format(endDate, "M")) {
        setCalendarTitle(format(currentDate, "yyyy年 M月"));
      } else {
        setCalendarTitle(
          `${format(currentDate, "yyyy年")} ${format(
            startDate,
            "M"
          )} ~ ${format(endDate, "M")}月`
        );
      }
      setCalendarDates(week);
    };
    generateCalendarWeeklyDates(currentDate);
  }, [currentDate]);

  // dailyquests取得
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
  useEffect(() => {
    fetchData();
  }, []);

  if (calendarDates.length == 0 || !quests) return <Loading />;

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <p>{calendarTitle}</p>
          <div>
            <p>
              <button onClick={() => setCurrentDate(new Date())}>今日</button>
            </p>
            <p>
              <button onClick={() => setCurrentDate(subDays(currentDate, 7))}>
                {"<"}
              </button>
            </p>
            <p>
              <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                {">"}
              </button>
            </p>
          </div>

          <table>
            <thead>
              <tr>
                {calendarDates.map((date, index) => (
                  <th key={index}>
                    <p>{format(date, "EEE", { locale: ja })}</p>
                    <p>{format(date, "d", { locale: ja })}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {calendarDates.map((date, index) => (
                  <td key={index}>
                    <CalendarCell
                      quests={quests}
                      date={date}
                      onSubmit={() => fetchData()}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
