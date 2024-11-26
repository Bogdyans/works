'use client'

import { useState } from 'react'
import { QUESTIONS, BOOKS } from './libs/consts'
import { type Question, type Book } from './libs/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { BookOpen } from 'lucide-react'

export default function BookRecommenderPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([])

    const books: Book[] = BOOKS;
    const questions: Question[] = QUESTIONS;

    const currentQuestion = questions[currentQuestionIndex]
    console.log(questions)

    const handleAnswerSelect = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }))
    }

    const recommendBooks = () => {
        const recommendedBooks = books.filter((book) => {
            let numOfDiffs = 0;

            const genreMatch = book.genre === answers[1]
            if (!genreMatch) numOfDiffs++

            const lengthMatch = book.length === answers[2]
            if (!lengthMatch) numOfDiffs++

            const eraMatch = book.era === answers[3] || answers[3] === "Mix of both" || answers[3] === "No preference"
            if (!eraMatch) numOfDiffs++

            const paceMatch = book.pace === answers[4] || answers[4] === "Varies"
            if (!paceMatch) numOfDiffs++

            const narrativeMatch = book.narrative === answers[5] || answers[5] === "Either" || answers[5] === "No preference"
            if (!narrativeMatch) numOfDiffs++

            return numOfDiffs < 2;
        })

        setRecommendedBooks(recommendedBooks.length > 0 ? recommendedBooks : [{
            title: "No book for you have been found",
            author: "",
            genre: "",
            length: "",
            era: "",
            pace: "",
            narrative: ""
        }])
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
        } else {
            recommendBooks()
        }
    }

    let isLastQuestion = false;
    let isAnswered = false;
    if (currentQuestion) {
         isLastQuestion = currentQuestionIndex === questions.length - 1
         isAnswered = answers[currentQuestion.id] !== undefined
    }

    if (!currentQuestion) return <></>

    return (
        <div className=" p-4 md:p-8">
            <Card className="mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Book Recommendation System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {recommendedBooks.length === 0 ? (
                        <div className="space-y-6">
                            <div className="rounded-lg border bg-card p-6">
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <h3 className="font-medium leading-none">
                                        {currentQuestion.question}
                                    </h3>
                                </div>
                                <RadioGroup
                                    value={answers[currentQuestion.id]}
                                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                                    className="grid gap-2"
                                >
                                    {currentQuestion.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center rounded-lg border p-4 transition-colors ${
                                                answers[currentQuestion.id] === option
                                                    ? 'bg-primary/10 border-primary'
                                                    : 'hover:bg-muted'
                                            }`}
                                        >
                                            <RadioGroupItem
                                                value={option}
                                                id={`q${currentQuestion.id}-${index}`}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor={`q${currentQuestion.id}-${index}`}
                                                className="w-full cursor-pointer"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </p>
                                <Button
                                    onClick={handleNext}
                                    disabled={!isAnswered}
                                >
                                    {isLastQuestion ? 'Get Recommendations' : 'Next Question'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold">Recommended Books:</h3>
                            {recommendedBooks.map((book, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 rounded-lg border bg-card p-4"
                                >
                                    <BookOpen className="h-6 w-6 flex-shrink-0 text-primary" />
                                    <div>
                                        <h4 className="font-medium">{book.title}</h4>
                                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                                        <p className="text-sm text-muted-foreground">{book.genre} | {book.length}</p>
                                    </div>
                                </div>
                            ))}
                            <Button
                                onClick={() => {
                                    setCurrentQuestionIndex(0)
                                    setAnswers({})
                                    setRecommendedBooks([])
                                }}
                                className="w-full"
                            >
                                Start Over
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

