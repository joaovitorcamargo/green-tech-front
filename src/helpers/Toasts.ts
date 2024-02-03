import { toast } from 'vue3-toastify'

export default async (callback: Promise<any>, message = 'Sucesso') => {
    return toast.promise(
        callback,
        {
            success: message,
            error: {
                render(err: any) {
                    const getError = Object.keys(err.toastProps?.data?.response?.data?.errors)[0]

                    const error = err.toastProps?.data?.response?.data?.errors[getError]
                    if (error) {
                        return error
                    }

                    return 'An Error as Ocurred'
                },
            },
        },
        {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            closeButton: false,
        },
    )
}
