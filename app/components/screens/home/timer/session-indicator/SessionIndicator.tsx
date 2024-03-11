import { FC } from 'react'
import { View } from 'react-native'
import { sessionCount } from '../timer.constants'
import { ITimerOptions } from '../timer.interface'
import Line from './Line'
import BreakPoint from './BreakPoint'
import WorkPoint from './WorkPoint'

interface ISessionIndicator
	extends Pick<ITimerOptions, 'currentBreak' | 'currentSession'> {}

const SessionIndicator: FC<ISessionIndicator> = ({
	currentBreak,
	currentSession
}) => {
	const isSmallIndicator = sessionCount > 7

	return (
		<View className='mt-14 flex-row items-center justify-center'>
			{Array.from(Array(sessionCount)).map((_, index) => {
				return (
					<View
						className='flex-row items-center relativeф'
						key={`point ${index}`}
					>
						<WorkPoint
							index={index}
							isSmallIndicator={isSmallIndicator}
							currentSession={currentSession}
						/>

						<BreakPoint
							index={index}
							isSmallIndicator={isSmallIndicator}
							currentBreak={currentBreak}
						/>

						<Line
							index={index}
							currentSession={currentSession}
							isSmallIndicator={isSmallIndicator}
						/>
					</View>
				)
			})}
		</View>
	)
}

export default SessionIndicator
