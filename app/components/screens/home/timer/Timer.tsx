import { FC, useState } from 'react'
import { Foundation } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import cn from 'clsx'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CountdownCircleTimer
					isPlaying={isPlaying}
					duration={flowDuration}
					colors={['#3A3570', '#521777']}
					colorsTime={[7, 0]}
					trailColor='#2F2F4C'
					onComplete={() => setIsPlaying(false)}
					size={300}
					strokeWidth={10}
				>
					{({ remainingTime }) => {
						//Минуты
						let minutes: string | number = Math.floor(remainingTime / 60)
						minutes = minutes < 10 ? '0' + minutes : minutes

						//Секунды
						let seconds: string | number = remainingTime % 60
						seconds = seconds < 10 ? '0' + seconds : seconds

						return (
							<View className='mt-5'>
								<Text className=' text-[#706DA1] text-6xl font-semibold'>{`${minutes}:${seconds}`}</Text>
								<Text className='text-center text-[#706DA1] text-2xl mt-0.5'>
									{status === EnumStatus.WORK ? 'Работай' : 'Отдыхай'}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => (
						<View className='flex-row items-center' key={`point ${index}`}>
							<View className='w-5 h-5 bg-primary rounded-full' />
							{index + 1 !== sessionCount && (
								<View className='w-7 h-0.5 bg-primary' />
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
