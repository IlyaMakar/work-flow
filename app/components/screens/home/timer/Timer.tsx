import { FC, useEffect, useState } from 'react'
import { Foundation } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import cn from 'clsx'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 10
const sessionCount = 7
const breakDuration = 1 * 60

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState(1)
	const [key, setKey] = useState(0)

	useEffect(() => {
		if (isPlaying && status === EnumStatus.REST) {
			setKey(prev => prev + 1)
		}
	}, [isPlaying])

	const isAllSessionComplited = currentSession === sessionCount

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#3A3570', '#521777']}
					colorsTime={[flowDuration, 0]}
					trailColor='#2F2F4C'
					onComplete={() => {
						setIsPlaying(false)
						setCurrentSession(prev => prev + 1)
						setStatus(EnumStatus.REST)

						if (isAllSessionComplited) {
							//Анимация
							setStatus(EnumStatus.COMPLITED)
						}
					}}
					size={300}
					strokeWidth={10}
					onUpdate={remainingTime => {
						if (!!remainingTime) setStatus(EnumStatus.WORK)
					}}
				>
					{({ remainingTime }) => {
						let minutes: string | number = Math.floor(remainingTime / 60)
						let seconds: string | number = remainingTime % 60

						if (status === EnumStatus.REST) {
							minutes = Math.floor(flowDuration / 60)
							seconds = flowDuration % 60
						}

						minutes = minutes < 10 ? '0' + minutes : minutes
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<View className='mt-5'>
								<Text className=' text-[#706DA1] text-6xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-[#706DA1] text-2xl mt-0.5'>
									{status}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View
								className={cn(
									'rounded-full border-[3px]',
									index + 1 === currentSession
										? 'w-[22px] h-[22px] border-primary bg-transparent'
										: 'w-5 h-5 border-transparent  bg-[#2C2B3C]',
									{
										'bg-primary':
											index + 1 <= currentSession &&
											index + 1 !== currentSession
									}
								)}
							/>
							{index + 1 !== sessionCount && (
								<View
									className={cn('w-7 h-0.5 bg-[#2C2B3C]', {
										'bg-primary': index + 2 <= currentSession
									})}
								/>
							)}
						</View>
					))}
				</View>
			</View>

			<Pressable
				onPress={() => setIsPlaying(!isPlaying)}
				className={cn(
					'self-center mt-10 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
					{
						'pl-1.5': !isPlaying
					}
				)}
				style={{
					shadowColor: '#870EFF',
					shadowOffset: {
						width: 0,
						height: 3
					},
					shadowOpacity: 0.55,
					shadowRadius: 10,

					elevation: 20
				}}
			>
				<Foundation
					name={isPlaying ? 'pause' : 'play'}
					color='#706DA1'
					size={44}
				/>
			</Pressable>
		</View>
	)
}

export default Timer
