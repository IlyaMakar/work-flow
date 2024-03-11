import { FC } from 'react'
import { Pressable } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { playShadow } from './button-shadow'
import { ITimerOptions, ITimerProps } from '../timer.interface'

interface IPlayButton
	extends Omit<ITimerProps, 'timer'>,
		Pick<ITimerOptions, 'isPlaying'> {}

const PlayButton: FC<IPlayButton> = ({ isPlaying, setTimer }) => {
	return (
		<Pressable
			onPress={() =>
				setTimer(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
			}
			className={cn(
				'mx-7 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
				{
					'pl-1.5': !isPlaying
				}
			)}
			style={playShadow}
		>
			<Foundation
				name={isPlaying ? 'pause' : 'play'}
				color='#706DA1'
				size={44}
			/>
		</Pressable>
	)
}

export default PlayButton
