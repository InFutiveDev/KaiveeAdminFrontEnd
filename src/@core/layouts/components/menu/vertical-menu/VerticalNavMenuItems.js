// ** React Imports
import { Fragment, useContext } from 'react'
import { useSelector } from 'react-redux'

// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Ability Context
// import { AbilityContext } from '@src/utility/context/Can'

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem
} from '@layouts/utils'

const VerticalMenuNavItems = props => {
  const store = useSelector(state => state.auth)
  const { profileInfo } = store
  // ** Context
  // const ability = useContext(AbilityContext)
  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (!profileInfo?.superAdmin && item.id === 'Admins') {
        return <Fragment key={item.id}></Fragment>
    } else {
      if (item.children) {
        return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
      }
      return canViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />
    }
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
