export type DailyQuestType = {
  id: number;
  title: string;
  description: string;
  day: Date;
  is_achievement: boolean;
  achievement_day: Date;
  created_at: Date;
  dailyreviews: [];
  user_id: number;
};
