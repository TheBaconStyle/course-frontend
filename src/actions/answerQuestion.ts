'use server';

import { putApiData, revalidate } from '.';

export type TAnswerQuestionOptions = {
  question: string;
  answer: string | string[];
};

// export type TAnswerQuestionResult = void;

export async function answerQuestion({
  question,
  answer,
}: TAnswerQuestionOptions) {
  await putApiData({
    path: `api/question-variants/${question}`,
    data: {
      answer,
    },
  });
  return await revalidate(['session_attempt']);
}
