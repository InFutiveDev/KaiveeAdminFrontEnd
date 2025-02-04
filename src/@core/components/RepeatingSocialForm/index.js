import { Button } from 'reactstrap'
import { Plus } from 'react-feather'
import FormCom from './form'

const AddSocialForm = ({ socialList, setSocialList }) => {

    const increaseCount = () => {
        try {
            setSocialList([...socialList, {}])
        } catch (error) {
            console.log(error)
        }
    }

    const deleteForm = (index) => {
        const datacopy = socialList?.filter((item, i) => i !== index)
        setSocialList(datacopy)
    }

    const handleSocialId = (e) => {
        const { value, name } = e.target
        const l = socialList
        l[name] = { [value]: '' }
        setSocialList(l)
    }

    const handleSocialValue = (e) => {
        const { value, name } = e.target
        const l = socialList
        l[name] = { [Object.keys(l[name])[0]]: value }
        setSocialList(l)
    }


    return (
        <div className='w-100'>
            <p className='mb-0'>Add Social</p>
            {socialList?.length ? socialList?.map((item, i) => {
                return (
                    <FormCom item={item} index={i} key={`${i}${Object.keys(item)[0]}`} deleteForm={deleteForm}
                        handleSocialId={handleSocialId}
                        socialList={socialList}
                        handleSocialValue={handleSocialValue} />
                )
            }) : <FormCom item={{ select: '' }} index={0} deleteForm={deleteForm}
                handleSocialId={handleSocialId}
                socialList={socialList}
                handleSocialValue={handleSocialValue} />}

            <Button.Ripple className='btn-icon mb-1' color='primary' onClick={increaseCount}>
                <Plus size={14} />
                <span className='align-middle ml-25'>Add New</span>
            </Button.Ripple>
        </div>
    )
}

export default AddSocialForm