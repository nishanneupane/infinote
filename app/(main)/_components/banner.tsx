import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMutation } from "convex/react"
import { api } from '@/convex/_generated/api'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modal/confirm-modal'

const Banner = ({ documentId }: { documentId: Id<"documents"> }) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRemove = () => {
        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: "Deleting note",
            success: "Note deleted",
            error: "Failed to delete note"
        })
        router.push("/documents")
    }

    const onRestore = () => {
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: "Restoring note",
            success: "Note Restored",
            error: "Failed to restore note"
        })
    }   

    return (
        <div className='w-ful bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
            <p>This page is in trash</p>
            <Button
                size={"sm"}
                onClick={onRestore}
                variant={"outline"}
                className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
            >
                Restore Page
            </Button>
            <ConfirmModal
                onConfirm={onRemove}
            >
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
                >
                    Delete Forever
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Banner