import axios from "axios"

// ** Toaster 
import ToastContent from "../views/components/toastContent"
import { Slide, toast } from 'react-toastify'

import { AlertCircle, UserCheck } from "react-feather"

const AlertError = (text) => {

    return toast.error(
        <ToastContent type={'light-danger'} icon={<AlertCircle size={12} />} text={typeof text === 'object' ? 'Something went wrong. Please try again in some time. ' : text} title={'Fail :('} />,
        { transition: Slide, hideProgressBar: true, autoClose: 4000 }
    )
}

const AlertSuccess = (text) => {
    return toast.success(
        <ToastContent type={'success'} icon={<UserCheck size={12} />} text={text} title="Success !" />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    )
}

// ** MakeProtectedApiCall( "url " , "request method " , "headers " , "payload " )
export const MakeProtectedApiCall = async (apiPath, method, header, bodyData = {}) => {
    switch (method.toLowerCase()) {
        case "get":
            try {
                const res = await axios.get(apiPath, { headers: { ...header, "ngrok-skip-browser-warning": "69420" } })
                return res
            } catch (error) {
                const msg = error.response?.data?.msg
                AlertError(msg)
                toast.clearWaitingQueue()
                if (error.response?.status === 401) {
                    localStorage.clear()
                    window.location.href = '/login'
                }
                return { status: error.response?.status }
            }
            break
        case "post":
            try {
                const res = await axios.post(apiPath, bodyData, { headers: { ...header, "ngrok-skip-browser-warning": "69420" } })
                AlertSuccess(res.data?.data?.msg || res.data.msg)
                return res
            } catch (error) {
                const msg = error.response?.data?.msg
                AlertError(msg)
                toast.clearWaitingQueue()
                if (error.response?.status === 401) {
                    localStorage.clear()
                    window.location.href = '/login'
                }
                return { status: error.response?.status }
            }
            break
        case "put":
            try {
                const res = await axios.put(apiPath, bodyData, { headers: { ...header, "ngrok-skip-browser-warning": "69420" } })
                AlertSuccess(res.data?.data?.msg || res.data.msg)
                return res
            } catch (error) {
                const msg = error.response?.data?.msg
                AlertError(msg)
                toast.clearWaitingQueue()
                if (error.response?.status === 401) {
                    localStorage.clear()
                    window.location.href = '/login'
                }
                return { status: error.response?.status }
            }
            break
        case "patch":
            try {
                const res = await axios.patch(apiPath, bodyData, { headers: { ...header, "ngrok-skip-browser-warning": "69420" } })
                AlertSuccess(res.data?.data?.msg || res.data.msg)
                return res
            } catch (error) {
                const msg = error.response?.data?.msg
                AlertError(msg)
                toast.clearWaitingQueue()
                if (error.response?.status === 401) {
                    localStorage.clear()
                    window.location.href = '/login'
                }
                return { status: error.response?.status }
            }
            break
        case "delete":
            try {
                const res = await axios.delete(apiPath, { headers: header, data: bodyData })
                AlertSuccess(res.data?.data?.msg || res.data.msg)
                return res
            } catch (error) {
                const msg = error.response?.data?.msg
                AlertError(msg)
                toast.clearWaitingQueue()
                if (error.response?.status === 401) {
                    localStorage.clear()
                    window.location.href = '/login'
                }
                return { status: error.response?.status }
            }
            break
        default:
            break
    }
}
