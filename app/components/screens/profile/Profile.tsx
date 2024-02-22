import Button from '@/components/ui/Button'
import Layout from '@/components/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'

const Profile: FC = () => {
	const { setUser } = useAuth()
	return (
		<Layout title='Профиль'>
			<Button onPress={() => setUser(null)}>Выйти</Button>
		</Layout>
	)
}

export default Profile
