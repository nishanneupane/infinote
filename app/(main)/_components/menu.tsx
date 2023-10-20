"use client"
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMutation } from "convex/react"
import { api } from '@/convex/_generated/api'
import toast from 'react-hot-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const Menu = ({ documentId }: { documentId: Id<"documents"> }) => {
    const router = useRouter();
    const { user } = useUser()

    const archive = useMutation(api.documents.archive)
    const onArchive = () => {
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            loading: "Moving to trash",
            success: "Moved to trash",
            error: "Failed to remove to trash"
        })

        router.push("/documents")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className='w-60'
                align='end'
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className='w-4 h-4 mr-2' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator>
                    <div className='text-xs text-muted-foreground p-2'>
                        Last Edited by : {user?.fullName}
                    </div>
                </DropdownMenuSeparator>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className='h-10 w-10' />
    )
}