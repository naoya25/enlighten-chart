"use client";
import Loading from "@/components/features/Loading";
import { ObjectiveType } from "@/types/objective";
import { useState, useEffect } from "react";

const getAllObjectives = async () => {
  const res = await fetch("/api/objective", {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  return data.objectives;
};

const AllObjectivePage = () => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objectivesData = await getAllObjectives();
        setObjectives(objectivesData);
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
        objectives.map((objective: ObjectiveType) => (
          <div key={objective.id} className="border border-gray-200 m-5 p-5">
            <p>title: {objective.title}</p>
            <p>description: {objective.description}</p>
            <p>deadline: {new Date(objective.deadline).toDateString()}</p>
            <p>user_id: {objective.user_id}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllObjectivePage;
