import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { IPointProps } from './session-indicator.interface'

const WorkPoint: FC<IPointProps> = ({
	isSmallIndicator,
	index,
	currentSession
}) => {
	return (
		<View
			className={cn(
				'rounded-full border-[3px]',
				index + 1 === currentSession
					? 'border-primary'
					: 'border-transparent  bg-[#2C2B3C]',
				{
					'bg-primary':
						index + 1 <= currentSession && index + 1 !== currentSession
				},
				isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
			)}
		/>
	)
}
export default WorkPoint
