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

export interface User {
  id: string;
  jwt: string;
  name: string;
  email: string;
}

export interface Session {
  user: User;
}
