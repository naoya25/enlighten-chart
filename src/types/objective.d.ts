export type ObjectiveType = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  is_achievement: boolean;
  achievement_day: Date;
  created_at: Date;
  reviews: [];
  todos: [];
  user_id: number;
};
