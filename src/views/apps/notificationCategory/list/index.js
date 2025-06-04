import { memo, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Button } from 'reactstrap'
import { ArrowLeft, Plus } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationCategories } from '../../../../redux/actions/notification/category'
import Spinner from '../../../../@core/components/spinner/Fallback-spinner'
import Table from './Table'

const NotificationCategoryList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const { categories } = useSelector(state => state.notificationCategory)

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getNotificationCategories())
      setLoading(false)
    }
    fetchCategories()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <Card>
        <CardHeader className='w-100'>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <h4>Notification Categories</h4>
            <div>
              <Button.Ripple onClick={() => { history.goBack() }} color='primary' outline className='mr-1'>
                <ArrowLeft size={16} className='mr-1' />
                Back
              </Button.Ripple>
              <Button.Ripple onClick={() => { history.push('/apps/notificationCategory/add') }} color='primary' className='mr-1'>
                <Plus size={16} className='mr-1' />
                Add Category
              </Button.Ripple>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Table data={categories} />
        </CardBody>
      </Card>
    </div>
  )
}

export default memo(NotificationCategoryList) 