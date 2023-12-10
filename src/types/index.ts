export type TAnswer = {
  id: string;
  value: string;
};

export const QuestionType = ['single', 'multiple', 'rank', 'fulltext'] as const;

export type TQuestionType = (typeof QuestionType)[number];

export const TaskStatus = ['open', 'closed'] as const;

export type TTaskStatus = (typeof TaskStatus)[number];

export type TPage = {
  searchParams: Record<string, string | string[] | undefined>;
  params: Record<string, string>;
};

export type JSONPrimitive = number | string | boolean | null;
export type JSONArray = Array<JSONPrimitive | JSONObject | JSONArray>;
export type JSONObject = {
  [k: string]: JSONPrimitive | JSONObject | JSONArray;
};
