import { useDispatch } from "react-redux"
import { Button } from "reactstrap"
import { CONTROL_FEATURE_TEST_BY_ID, GET_ALL_TEST } from "../../../../redux/actions/test"


const ControlFeature = ({ row }) => {
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(window?.location.search.split('?')[1])
    const searchname = searchParams.get('searchname')
    const page = searchParams.get('page')

    const handleClick = async () => {
        let data = null
        if(row?.featured_test){
            data = {featured_test: !row?.featured_test }
        }else{
            data = {featured_test: true }
        }
        let res = await dispatch(CONTROL_FEATURE_TEST_BY_ID(row?._id, data))
        if (res) {
            dispatch(GET_ALL_TEST(page || 1, searchname))
        }
    }

    return (
        <>
            <Button.Ripple size='sm' color='primary' className='text-nowrap' onClick={handleClick} outline={row?.featured_test ? false : true}>
                {row?.featured_test ? 'Featured' : 'Feature'}
            </Button.Ripple>
        </>
    )
}

export default ControlFeature