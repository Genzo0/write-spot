import BlogPreview from '@/components/BlogPreview'
import Comments from '@/components/Comments'
import Contributor from '@/components/Contributor'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RelatedCard from '@/components/RelatedCard'
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Params = {
  id: string
}

const Page = ({ params }: { params: Params }) => {
  const id = params.id
  return (
    <>
      <MaxWidthWrapper className='flex flex-col justify-center items-center'>
        <div className='flex flex-col py-10 gap-3 mb-5'>
          <h2 className='font-extrabold md:text-5xl text-4xl'>
            How Twitter Processes 4 Billion Events in real-time daily
          </h2>
          <Contributor />
        </div>
        <div className='pb-10 gap-2 md:gap-5'>
          A few weeks ago, we learned how Uber handles their real-time
          infrastructure to process millions of events daily. This week, we will
          see another big tech company deal with the data real-time processing
          requirement: Twitter.
        </div>
        <Card className='w-full bg-green-500/5 rounded-lg'>
          <CardContent>
            <p className='text-gray-400 mt-5 text-xl'>Comments</p>
            <Comments />
            <Comments />
            <Comments />
            <Comments />
          </CardContent>
        </Card>
        <Separator className='my-10' />
        <Card className='w-full bg-green-500/5 text-gray-400'>
          <CardContent>
            <p className='text-left text-lg my-5'>Leave Comment</p>
            <form>
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
            </form>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button>Post comment</Button>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>

      <div className='w-full text-black mt-5 md:mt-10 bg-white'>
        <MaxWidthWrapper className='py-10'>
          <p className='font-semibold pt-5 text-2xl text-green-600'>
            More from Vu Trinh
          </p>
          <div className='my-5 grid grid-cols-1 gap-5'>
            <BlogPreview />
            <BlogPreview />
            <BlogPreview />
            <BlogPreview />
            <BlogPreview />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  )
}

export default Page
