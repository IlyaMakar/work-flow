import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { IAuthFormData } from '@/types/auth.interface'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'clsx'
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import { validEmail } from './email.rgx'
import AuthFields from './AuthFields'

const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { setUser } = useAuth()

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			_id: '',
			...data
		})
		reset()
	}

	const isLoading = false

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-[#706DA1] text-4xl font-bold text-center mb-5'>
						{isReg ? 'Регистрация' : 'Авторизация'}
					</Text>

					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} />
							<Button onPress={handleSubmit(onSubmit)}>Начать</Button>

							<Pressable
								onPress={() => setIsReg(!isReg)}
								className='w-16 self-end'
							>
								<Text className='text-opacity-60 text-[#706DA1] text-base mt-3 text-right'>
									{isReg ? 'Вход' : 'Регист'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Auth
