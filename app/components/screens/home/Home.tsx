import Layout from '@/components/ui/layout/Layout'
import { FC } from 'react'
import Timer from './timer/Timer'

const Home: FC = () => {
	return (
		<Layout title='Таймер'>
			<Timer />
		</Layout>
	)
}

export default Home
