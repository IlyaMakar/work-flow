import { FC, useState } from 'react'
import { AntDesign, Entypo, Foundation } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import { EnumStatus, ITimerOptions } from './timer.interface'
import CircleTimer from './circle-timer/CircleTimer'
import { sessionCount } from './timer.constants'
import SessionIndicator from './session-indicator/SessionIndicator'
import Actions from './actions/Actions'

const isSmallIndicator = sessionCount > 7

const Timer: FC = () => {
	const [timer, setTimer] = useState<ITimerOptions>({
		isPlaying: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		currentBreak: 0,
		key: 0
	})

	return (
		<View className='justify-center flex-1'>
			<View className='self-center items-center'>
				<CircleTimer setTimer={setTimer} timer={timer} />
				<SessionIndicator
					currentBreak={timer.currentBreak}
					currentSession={timer.currentSession}
				/>
			</View>
			<Actions timer={timer} setTimer={setTimer} />
		</View>
	)
}

export default Timer
