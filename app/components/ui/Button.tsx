import { FC, PropsWithChildren } from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'
import cn from 'clsx'

interface IButton extends PressableProps {}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<Pressable
			className={cn(
				'self-center mt-5 bg-primary py-3 px-8 rounded-3xl',
				className
			)}
			{...rest}
		>
			<Text className='font-semibold text-[#706DA1] text-xl'>{children}</Text>
		</Pressable>
	)
}

export default Button
