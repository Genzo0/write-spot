'use client'

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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Loader2 } from 'lucide-react'
import { ToastAction } from '@/components/ui/toast'
import { SetFieldValue, set, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import ReactPaginate from 'react-paginate'

import { ChevronLeft, ChevronRight, Pencil, Plus } from 'lucide-react'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Suspense, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@/types/user'
import { cn } from '@/lib/utils'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { get } from 'http'
import ListSkeleton from '@/components/ListSkeleton'

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  gender: z.enum(['male', 'female']),
  status: z.enum(['active', 'inactive'])
})

const Page = () => {
  const [contributors, setContributors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  const [isDeleted, setIsDeleted] = useState(false)
  const [id, setId] = useState(0)

  const [editFormOpen, setEditFormOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const [isAddingContributor, setIsAddingContributor] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      gender: 'male',
      status: 'active'
    }
  })

  const formEdit = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting } = form.formState
  const { isSubmitting: isSubmittingEdit } = formEdit.formState

  const getContributorData = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${id}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`
    )
    if (response.status === 200) {
      const data = await response.json()
      formEdit.setValue('id', data.id)
      formEdit.setValue('name', data.name)
      formEdit.setValue('email', data.email)
      formEdit.setValue('gender', data.gender)
      formEdit.setValue('status', data.status)
      setEditFormOpen(true)
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to fetch contributor',
        description: 'Please try again later'
      })
    }
  }

  useEffect(() => {
    const getContributors = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/users?page=${currentPage}&per_page=10&access-token=${process.env.NEXT_PUBLIC_TOKEN}`
      )
      if (response.status === 200) {
        const data = await response.json()
        setTotalPages(response.headers.get('X-Pagination-Pages') as any)
        setContributors(data)
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch contributors',
          description: 'Please try again later'
        })
      }
    }

    if (search === '') {
      getContributors()
      return
    }

    const getData = setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/users?name=${search}&page=${currentPage}&access-token=${process.env.NEXT_PUBLIC_TOKEN}`,
        {
          method: 'GET',
          headers: {}
        }
      )
        .then(res => {
          setTotalPages(res.headers.get('X-Pagination-Pages') as any)
          return res.json()
        })
        .then(data => {
          setContributors(data)
        })
    }, 500)

    return () => clearTimeout(getData)
  }, [search, currentPage, isSubmitting, isSubmittingEdit, isDeleted])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/users`,
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
      const data = await response.json()
      toast({
        title: 'User added!',
        description: `${data.name} with id ${data.id} has been added successfully. you can search it now.`,
        className: 'bg-green-500/75'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      })
    }
    setIsAddingContributor(false)
  }

  const handleEdit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${values.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        },
        body: JSON.stringify(values)
      }
    )

    if (response.status === 200) {
      formEdit.reset()
      const data = await response.json()
      toast({
        title: 'User edited!',
        description: `${data.name} with id ${data.id} has been edited successfully. you look it now.`,
        className: 'bg-green-500/75'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      })
    }

    setEditFormOpen(false)
  }

  const handleDelete = async (id: number) => {
    setIsDeleted(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        }
      }
    )

    if (response.status === 204) {
      toast({
        title: 'User deleted!',
        description: `User with id ${id} has been deleted successfully.`,
        className: 'bg-green-500/75'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      })
    }

    setIsDeleted(false)
  }

  return (
    <MaxWidthWrapper className='flex justify-center'>
      <div className='w-full md:w-7/12 md:border-r md:border-gray-200 pt-5 md:pr-8 flex flex-col'>
        <div className='flex justify-between gap-3 items-center'>
          <p className='font-semibold text-xl'>Contributors</p>
          <Dialog>
            <DialogTrigger
              asChild
              className='md:hidden'
              onClick={() => setIsAddingContributor(true)}
            >
              <Button>Add Contributors</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] z-50'>
              <DialogHeader>
                <DialogTitle>Add Contributor</DialogTitle>
                <DialogDescription>
                  Add a Contributor. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className='flex flex-col gap-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full flex-col'>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                id='name'
                                placeholder='Your name...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='z-50' />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full flex-col'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                id='email'
                                placeholder='Your email...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='z-50' />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full flex-col'>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Male' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='z-50'>
                                <SelectItem value='male'>Male</SelectItem>
                                <SelectItem value='female'>Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className='z-50' />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => {
                        return (
                          <FormItem className='w-full flex-col'>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Active' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='z-50'>
                                <SelectItem value='active'>Active</SelectItem>
                                <SelectItem value='inactive'>
                                  Inactive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className='z-50' />
                          </FormItem>
                        )
                      }}
                    />
                    {isSubmitting ? (
                      <Button disabled>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Posting Data
                      </Button>
                    ) : (
                      <Button type='submit'>Save</Button>
                    )}
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <Input
          placeholder='Search...'
          onChange={e => setSearch(e.target.value)}
          className='my-2 rounded-full'
        />
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/4'>Name</TableHead>
              <TableHead className='w-1/4'>Email</TableHead>
              <TableHead className='w-1/12'>Gender</TableHead>
              <TableHead className='w-1/12'>Status</TableHead>
              <TableHead className='w-1/6'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contributors.map((contributor: User) => (
              <TableRow key={contributor.id}>
                <TableCell className='break-words'>
                  {contributor.name}
                </TableCell>
                <TableCell className='break-all'>{contributor.email}</TableCell>
                <TableCell>{contributor.gender}</TableCell>
                <TableCell
                  className={cn({
                    'text-green-500': contributor.status === 'active',
                    'text-red-500': contributor.status === 'inactive'
                  })}
                >
                  {contributor.status}
                </TableCell>
                <TableCell className='flex gap-2'>
                  <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    className='bg-yellow-400 text-black'
                    onClick={() => {
                      getContributorData(contributor.id)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      setId(contributor.id)
                      setAlertOpen(true)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ReactPaginate
          breakLabel='...'
          nextLabel={<ChevronRight />}
          onPageChange={event => setCurrentPage(event.selected + 1)}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          previousLabel={<ChevronLeft />}
          renderOnZeroPageCount={null}
          containerClassName='flex justify-center items-center my-2.5 gap-2'
          pageClassName='h-8 w-8 flex justify-center items-center bg-[#f1f1f1] rounded-lg text-black border border-[#f1f1f1] cursor-pointer'
          previousClassName='h-8 w-8 bg-white rounded-lg text-black border border-[#f1f1f1]'
          nextClassName='h-8 w-8 bg-white rounded-lg text-black border border-[#f1f1f1]'
          activeLinkClassName='h-8 w-8 flex justify-center items-center bg-green-600 rounded-lg text-white border border-[#f1f1f1]'
        />
      </div>
      <div className='hidden md:block md:w-5/12 pl-8 pt-5'>
        <div className='flex flex-col justify-center gap-3'>
          <Pencil className='w-20 h-20 fill-green-400 mb-2' />
          <h3 className='font-semibold'>Writespot contributors</h3>
          <p className='text-sm text-gray-400'>
            All contributors that write and posts in writespot
          </p>
          <Button
            className='w-1/3'
            onClick={() => setIsAddingContributor(true)}
          >
            Add Contributor
          </Button>
          {isAddingContributor && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='flex flex-col gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => {
                      return (
                        <FormItem className='w-full flex-col'>
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
                        <FormItem className='w-full flex-col'>
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
                  <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => {
                      return (
                        <FormItem className='w-full flex-col'>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Male' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='male'>Male</SelectItem>
                              <SelectItem value='female'>Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => {
                      return (
                        <FormItem className='w-full flex-col'>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Active' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='active'>Active</SelectItem>
                              <SelectItem value='inactive'>Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  {isSubmitting ? (
                    <Button disabled>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Posting Data
                    </Button>
                  ) : (
                    <Button type='submit'>Save</Button>
                  )}
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
      <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
        <DialogContent className='sm:max-w-[425px] z-50'>
          <DialogHeader>
            <DialogTitle>Edit Contributor</DialogTitle>
            <DialogDescription>
              Make changes to users here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={formEdit.handleSubmit(handleEdit)}>
              <div className='flex flex-col gap-4'>
                <FormField
                  control={formEdit.control}
                  name='name'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full flex-col'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            id='name'
                            placeholder='Your name...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='z-50' />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formEdit.control}
                  name='email'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full flex-col'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            placeholder='Your email...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='z-50' />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formEdit.control}
                  name='gender'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full flex-col'>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Male' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='z-50'>
                            <SelectItem value='male'>Male</SelectItem>
                            <SelectItem value='female'>Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className='z-50' />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={formEdit.control}
                  name='status'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full flex-col'>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Active' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='z-50'>
                            <SelectItem value='active'>Active</SelectItem>
                            <SelectItem value='inactive'>Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className='z-50' />
                      </FormItem>
                    )
                  }}
                />
                {isSubmittingEdit ? (
                  <Button disabled>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Posting Data
                  </Button>
                ) : (
                  <Button type='submit'>Save</Button>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user!</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete user
              and remove data from server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MaxWidthWrapper>
  )
}

export default Page
