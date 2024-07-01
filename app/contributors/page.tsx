import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pencil, Plus } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Page = () => {
  return (
    <MaxWidthWrapper className='flex justify-center'>
      <div className='w-full md:w-7/12 md:border-r md:border-gray-200 pt-5 md:pr-8 flex flex-col'>
        <div className='flex justify-between'>
          <p className='font-semibold text-xl mb-3'>Contributors</p>
          <Button size='sm' className='md:hidden'>
            Add Contributor
          </Button>
        </div>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/4'>Name</TableHead>
              <TableHead className='w-1/4'>Email</TableHead>
              <TableHead className='w-1/12'>Gender</TableHead>
              <TableHead className='w-1/12'>Status</TableHead>
              <TableHead className='w-1/6'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='break-word'>muhammad jali yalja</TableCell>
              <TableCell className='break-all'>akjwdb@gamil.com</TableCell>
              <TableCell>male</TableCell>
              <TableCell>active</TableCell>
              <TableCell className='flex gap-2'>
                <Button size='sm' className='bg-yellow-200 text-black'>
                  Edit
                </Button>
                <Button size='sm' variant='destructive'>
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination className='mt-3'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className='hidden md:block md:w-5/12 pl-8 pt-5'>
        <div className='flex flex-col justify-center gap-3'>
          <Pencil className='w-20 h-20 fill-green-400 mb-2' />
          <h3 className='font-semibold'>Writespot contributors</h3>
          <p className='text-sm text-gray-400'>
            All contributors that write and posts in writespot
          </p>
          <Button className='w-1/3'>Add Contributor</Button>
          <form action=''>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label>Name</Label>
                <Input id='name' placeholder='Contributor name...'></Input>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Email</Label>
                <Input id='email' placeholder='Contributor email...'></Input>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Gender</Label>
                <Input id='name' placeholder='Contributor name...'></Input>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label>Active</Label>
                <Input id='name' placeholder='Contributor name...'></Input>
              </div>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
