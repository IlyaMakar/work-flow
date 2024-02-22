import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import cn from 'clsx'
import { IAuthFormData } from '@/types/auth.interface'
import { validEmail } from './email.rgx'

const AuthFields: FC<{ control: Control<IAuthFormData> }> = ({ control }) => {
	return (
		<>
			<Controller
				control={control}
				name='email'
				rules={{
					required: 'Требуется Email',
					pattern: {
						value: validEmail,
						message: 'Неправильный email'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded-full bg-[#8060943e]  border pb-4 pt-3 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Email'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								className='text-[#706DA1] text-lg'
							/>
						</View>
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{
					required: 'Требуется пароль',
					minLength: {
						value: 6,
						message: 'Минимальное кол-во сиволов 6'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded-full bg-[#8060943e]  border pb-4 pt-3 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Password'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								className='text-[#706DA1] text-lg'
								secureTextEntry
							/>
						</View>
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
		</>
	)
}

export default AuthFields
