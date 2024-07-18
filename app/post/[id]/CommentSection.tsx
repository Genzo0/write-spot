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
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  body: z.string().min(1)
})

const CommentSection = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      body: ''
    }
  })

  const { isSubmitting } = form.formState

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        },
        body: JSON.stringify(values)
      }
    )

    if (response.status === 201) {
      form.reset()
      const newComment = await response.json()
      toast({
        title: 'Comment posted!',
        description: 'Your comment has been posted successfully.',
        className: 'bg-green-500/75'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      })
    }
  }

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}/comments?access-token=${process.env.NEXT_PUBLIC_TOKEN}`
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
  }, [isSubmitting])

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent>
              <p className='text-left text-lg my-5'>Leave Comment</p>

              <div className='grid w-full items-center gap-4'>
                <div className='md:flex gap-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => {
                      return (
                        <FormItem className='w-full md:w-1/2 flex-col space-y-1.5'>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              id='name'
                              placeholder='Your name...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => {
                      return (
                        <FormItem className='w-full md:w-1/2 flex-col space-y-1.5'>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              id='email'
                              placeholder='Your email...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='body'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full flex-col space-y-1.5'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea
                            id='body'
                            placeholder='Your comment...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </CardContent>

            <CardFooter className='flex justify-center'>
              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Posting Data
                </Button>
              ) : (
                <Button type='submit'>Post comment</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </MaxWidthWrapper>
  )
}

export default CommentSection
