import { FC, useEffect } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus, ITimerProps } from '../timer.interface'
import { breakDuration, flowDuration, sessionCount } from '../timer.constants'
import TimerInfo from './TimerInfo'
import { useEffectTimer } from './useEffectTimer'

const CircleTimer: FC<ITimerProps> = ({
	timer: { key, isPlaying, currentSession, status },
	setTimer
}) => {
	useEffectTimer({ setTimer, currentSession })

	return (
		<CountdownCircleTimer
			key={key}
			isPlaying={isPlaying}
			duration={status === EnumStatus.REST ? breakDuration : flowDuration}
			colors={['#3A3570', '#521777']}
			colorsTime={[
				status === EnumStatus.REST ? breakDuration : flowDuration,
				0
			]}
			trailColor='#2F2F4C'
			onComplete={() => {
				setTimer(prev => ({
					...prev,
					status: currentSession % 2 === 0 ? EnumStatus.REST : prev.status,
					currentBreak:
						currentSession % 2 === 0
							? prev.currentBreak + 1
							: prev.currentBreak,
					currentSession:
						currentSession % 2 ? prev.currentSession + 1 : prev.currentSession,
					isPlaying: false,
					key: prev.key + 1
				}))

				if (status === EnumStatus.REST) {
					setTimer(prev => ({
						...prev,
						status: EnumStatus.WORK,
						key: prev.currentSession + 1
					}))
				}
			}}
			size={300}
			strokeWidth={10}
		>
			{({ remainingTime }) => (
				<TimerInfo
					setTimer={setTimer}
					remainingTime={remainingTime}
					status={status}
				/>
			)}
		</CountdownCircleTimer>
	)
}

export default CircleTimer
