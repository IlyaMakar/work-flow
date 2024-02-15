import Auth from '@/components/screens/auth/Auth'
import { IRoute } from './navigation.types'
import Home from '@/components/screens/home/Home'
import Profile from '@/components/screens/profile/Profile'
import Settings from '@/components/screens/settings/Settings'

export const routes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'Profile',
		component: Profile
	}
]
