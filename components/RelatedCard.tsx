import { MessageCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'

const RelatedCard = () => {
  return (
    <Card className='w-full cursor-pointer'>
      <CardHeader>
        <CardTitle>Stop Using UUID in Your Database</CardTitle>
        <CardDescription className='text-xs'>
          How UUIDs can Destroy SQL Database Performance
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-end'>
        <MessageCircle className='h-4 w-4 text-green-600 text-sm' />
        <p className='text-gray-400 ml-2'>5</p>
      </CardContent>
    </Card>
  )
}

export default RelatedCard
