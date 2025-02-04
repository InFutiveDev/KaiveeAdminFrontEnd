
import Avatar from '@components/avatar'
import { Fragment } from 'react'

const ToastContent = ({ title, text, icon, type }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color={type} icon={icon} />
                <h6 className='toast-title font-weight-bold'>{title}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{text}</span>
        </div>
    </Fragment>
)

export default ToastContent