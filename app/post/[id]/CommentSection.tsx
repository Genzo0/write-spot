'use client'

import Comments from '@/components/Comments'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Suspense, useEffect, useState } from 'react'
import { Comment } from '@/types/comment'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ListSkeleton from '@/components/ListSkeleton'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

const CommentSection = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}/comments`
      )
      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>
        })
      } else {
        setComments(await response.json())
      }
    }

    getComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        },

        body: JSON.stringify(data)
      }
    )

    if (response.ok) {
      const comment = await response.json()
      setComments([...comments, comment])
      e.currentTarget.reset()
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>
      })
    }
  }

  return (
    <MaxWidthWrapper>
      <Card className='w-full bg-green-500/5 rounded-lg'>
        <CardContent>
          <p className='text-gray-400 mt-5 text-xl'>Comments</p>
          {comments.length > 0 ? (
            comments.map((comment: Comment) => (
              <Comments key={comment.id} {...comment} />
            ))
          ) : (
            <p className='text-gray-400 mt-5 text-xl'>No comments yet</p>
          )}
        </CardContent>
      </Card>
      <Separator className='my-10' />
      <Card className='w-full bg-green-500/5 text-gray-400'>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <p className='text-left text-lg my-5'>Leave Comment</p>

            <div className='grid w-full items-center gap-4'>
              <div className='md:flex gap-2'>
                <div className='w-full md:w-1/2 flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' placeholder='Your name...' />
                </div>
                <div className='w-full md:w-1/2 flex-col space-y-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' placeholder='Your email...' />
                </div>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='comment'>Comment</Label>
                <Textarea id='comment' placeholder='Your comment...' />
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex justify-center'>
            <Button type='submit'>Post comment</Button>
          </CardFooter>
        </form>
      </Card>
    </MaxWidthWrapper>
  )
}

export default CommentSection
