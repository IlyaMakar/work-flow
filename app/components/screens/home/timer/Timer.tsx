import { FC, useState } from 'react'
import { AntDesign, Entypo, Foundation } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import cn from 'clsx'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 5
const sessionCount = 10
const breakDuration = 4

const isSmallIndicator = sessionCount > 7

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.WORK)
	const [currentSession, setCurrentSession] = useState(1)
	const [currentBreak, setCurrentBreak] = useState(0)
	const [key, setKey] = useState(0)

	const isAllSessionComplited = currentSession === sessionCount

	return (
		<View className='justify-center flex-1'>
			<View className='self-center items-center'>
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
						setIsPlaying(false)

						if (isAllSessionComplited) {
							//Анимация
							setStatus(EnumStatus.COMPLITED)
						}

						setKey(prev => prev + 1)

						if (status === EnumStatus.REST) {
							setStatus(EnumStatus.WORK)
							setCurrentSession(prev => prev + 1)
						}

						if (currentSession % 2 === 0) {
							setStatus(EnumStatus.REST)
							setCurrentBreak(prev => prev + 1)
						} else {
							setCurrentSession(prev => prev + 1)
						}
					}}
					size={300}
					strokeWidth={10}
					// onUpdate={remainingTime => {
					// 	if (!!remainingTime) setStatus(EnumStatus.WORK)
					// }}
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
							<View className='mt-14'>
								<Text className=' text-[#706DA1] text-6xl font-semibold'>
									{`${minutes}:${seconds}`}
								</Text>
								<Text className='text-center text-[#706DA1] text-2xl mt-0.5'>
									{status}
								</Text>
								<Pressable
									onPress={() => {
										setKey(0)
										setIsPlaying(false)
										setCurrentSession(1)
										setCurrentBreak(0)
									}}
									className='opacity-70 self-center mt-5'
								>
									<Entypo name='ccw' size={30} color='#706DA1' />
								</Pressable>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center justify-center'>
					{Array.from(Array(sessionCount)).map((_, index) => {
						return (
							<View
								className='flex-row items-center relativeф'
								key={`point ${index}`}
							>
								<View
									className={cn(
										'rounded-full border-[3px]',
										index + 1 === currentSession
											? 'border-primary'
											: 'border-transparent  bg-[#2C2B3C]',
										{
											'bg-primary':
												index + 1 <= currentSession &&
												index + 1 !== currentSession
										},
										isSmallIndicator ? 'w-[15px] h-[15px]' : 'w-5 h-5'
									)}
								/>

								{(index + 1) % 2 === 0 && index + 1 !== sessionCount && (
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
								)}

								{index + 1 !== sessionCount && (
									<View
										className={cn(
											' h-0.5 bg-[#2C2B3C]',
											{
												'bg-primary': index + 2 <= currentSession
											},
											isSmallIndicator ? 'w-5' : 'w-7'
										)}
									/>
								)}
							</View>
						)
					})}
				</View>
			</View>
			<View className='flex-row items-center justify-center mt-14 relative'>
				<Pressable
					onPress={() => {
						if (currentSession !== 1) {
							setCurrentSession(prev => prev - 1)
							setKey(prev => prev - 1)
							setIsPlaying(false)

							currentSession % 2 === 0 && setCurrentBreak(prev => prev - 1)
						}
					}}
					className='opacity-70'
				>
					<Entypo name='chevron-left' size={34} color='#706DA1' />
				</Pressable>

				<Pressable
					onPress={() => setIsPlaying(!isPlaying)}
					className={cn(
						'mx-7 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
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
						shadowOpacity: 1,
						shadowRadius: 10,

						elevation: 8
					}}
				>
					<Foundation
						name={isPlaying ? 'pause' : 'play'}
						color='#706DA1'
						size={44}
					/>
				</Pressable>

				<Pressable
					onPress={() => {
						if (currentSession !== sessionCount + 1) {
							setCurrentSession(prev => prev + 1)
							setKey(prev => prev + 1)
							setIsPlaying(false)

							currentSession % 2 === 0 && setCurrentBreak(prev => prev + 1)
						}
					}}
					className='opacity-70'
				>
					<Entypo name='chevron-right' size={34} color='#706DA1' />
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
