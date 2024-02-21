import { FC } from 'react'
import { Pressable } from 'react-native'
import {
	IMenuItem,
	TypeNav
} from '@/components/ui/layout/bottom-menu/menu.interface'
import { Feather } from '@expo/vector-icons'
import { AppConstants } from '@/app.constants'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNav
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path

	return (
		<Pressable onPress={() => nav(item.path)} className='w-[24%] items-center'>
			<Feather
				name={item.iconName}
				size={26}
				color={isActive ? AppConstants.primary : '#8D8A97'}
			/>
		</Pressable>
	)
}

export default MenuItem
