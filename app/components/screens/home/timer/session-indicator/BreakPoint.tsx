import { FC } from 'react'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import cn from 'clsx'
import { sessionCount } from '../timer.constants'
import { IBreakPoint } from './session-indicator.interface'

const BreakPoint: FC<IBreakPoint> = ({
	isSmallIndicator,
	index,
	currentBreak
}) => {
	return (index + 1) % 2 === 0 && index + 1 !== sessionCount ? (
		<View
			className={cn(
				'absolute z-30 -top-4 ',
				isSmallIndicator ? 'left-[17px]' : ' left-[25px]'
			)}
		>
			<AntDesign
				name='rest'
				size={isSmallIndicator ? 16 : 18}
				color={index / 2 < currentBreak ? '#521777' : '#2C2B3C'}
			/>
		</View>
	) : null
}

export default BreakPoint
