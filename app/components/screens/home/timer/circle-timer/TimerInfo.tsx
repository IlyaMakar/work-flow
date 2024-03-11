import { FC, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { EnumStatus, ITimerOptions, ITimerProps } from '../timer.interface'
import { flowDuration } from '../timer.constants'
import { Entypo } from '@expo/vector-icons'
import { useTimerTime } from './useTimerTime'

interface ITimerInfo
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'status'> {
	remainingTime: number
}

const fromatTime = (number: number) => (number < 10 ? '0' + number : number)

const TimerInfo: FC<ITimerInfo> = ({ remainingTime, setTimer, status }) => {
	const { minutes, seconds } = useTimerTime(remainingTime, status)
	return (
		<View className='mt-14'>
			<Text className=' text-[#706DA1] text-6xl font-semibold'>
				{`${fromatTime(minutes)}:${fromatTime(seconds)}`}
			</Text>
			<Text className='text-center text-[#706DA1] text-2xl mt-0.5'>
				{status}
			</Text>
			<Pressable
				onPress={() => {
					setTimer(prev => ({
						...prev,
						key: 0,
						isPlaying: false,
						currentSession: 1,
						currentBreak: 0,
						status: EnumStatus.WORK
					}))
				}}
				className='opacity-70 self-center mt-5'
			>
				<Entypo name='ccw' size={30} color='#706DA1' />
			</Pressable>
		</View>
	)
}

export default TimerInfo
