import { FC } from 'react'
import { View } from 'react-native'
import cn from 'clsx'
import { sessionCount } from '../timer.constants'
import { IPointProps } from './session-indicator.interface'

const Line: FC<IPointProps> = ({ currentSession, index, isSmallIndicator }) => {
	if (index + 1 === sessionCount) return null
	return (
		<View
			className={cn(
				' h-0.5 bg-[#2C2B3C]',
				{
					'bg-primary': index + 2 <= currentSession
				},
				isSmallIndicator ? 'w-5' : 'w-7'
			)}
		/>
	)
}

export default Line
