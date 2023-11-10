'use client'

import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SingleQuestion, MultipleQuestion, FullTextQuestion } from '@/components'

export default function TaskPage() {
  const { taskId } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentQuestion = searchParams.get('question') ?? '1'
  const prevQuestion = String(Number(currentQuestion) - 1)
  const nextQuestion = String(Number(currentQuestion) + 1)
  const questionCount = 30

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: '1rem' }}>
        Тест {taskId}
      </Typography>
      <Divider />
      <Tabs
        value={currentQuestion}
        variant="scrollable"
        scrollButtons="auto"
        onChange={(_, value) => {
          router.push(`?question=${value}`)
        }}
      >
        {Array(questionCount)
          .fill(null)
          .map((_, index) => String(index + 1))
          .map((id) => {
            return <Tab label={id} value={id} key={id} />
          })}
      </Tabs>
      <Divider />
      <SingleQuestion
        answers={[1, 2, 3, 4].map((id) => ({
          id: String(id),
          value: `Ответ ${id}`,
        }))}
        text="Текст вопроса"
        id="1"
      />
      <MultipleQuestion
        answers={[1, 2, 3, 4].map((id) => ({
          id: String(id),
          value: `Ответ ${id}`,
        }))}
        text="Текст вопроса"
        id="1"
      />
      <FullTextQuestion text="Текст вопроса" id="1" />
      <Divider />
      <Box sx={{ display: 'flex', gap: '1rem', my: '1rem' }}>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`?question=${prevQuestion}`}
          disabled={Number(prevQuestion) < 1}
        >
          <ArrowBack /> Предыдущий вопрос
        </Button>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`?question=${nextQuestion}`}
          disabled={Number(nextQuestion) > questionCount}
        >
          Следующий вопрос <ArrowForward />
        </Button>
      </Box>
    </Container>
  )
}
