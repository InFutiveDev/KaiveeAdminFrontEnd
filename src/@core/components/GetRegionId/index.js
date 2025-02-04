
import { memo, useEffect, useState } from 'react'
import AutoComplete from '@components/autocomplete'
import { Globe } from 'react-feather'
import { useSelector } from 'react-redux'

const GetRegionId = ({ errorkeyname, payload, setPayload, defaultValue = '' }) => {
    const store = useSelector(state => state)
    const { regions } = store.auth

    // useEffect(() => {
    //     // if (region !== null) {
    //         setPayload({ ...payload, region: region?._id || null })
    //     // }
    // }, [region])

    const regionChange = (e) => {
        setPayload({...payload, region: null})
    }
    
    const regionSelect = (e) => {
        setPayload({...payload, region: e?._id})
    }

    return (
        <AutoComplete
            suggestions={regions || []}
            getSelectedOption={regionSelect}
            onChange={regionChange}
            className={`form-control ${errorkeyname === 'region' && `border border-danger`}`}
            filterKey={'name'}
            value={defaultValue}
            autoFocus={true}
            suggestionLimit={8}
            placeholder='Select region'
            icon={<Globe size={14} />}
        />
    )
}

export default memo(GetRegionId)