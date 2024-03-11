import { useEffect } from 'react'
import { sessionCount } from '../timer.constants'
import { EnumStatus, ITimerOptions, ITimerProps } from '../timer.interface'

interface IUseEffectTimer
	extends Pick<ITimerProps, 'setTimer'>,
		Pick<ITimerOptions, 'currentSession'> {}

export const useEffectTimer = ({
	setTimer,
	currentSession
}: IUseEffectTimer) => {
	useEffect(() => {
		if (currentSession === sessionCount) {
			setTimer(prev => ({ ...prev, status: EnumStatus.COMPLITED }))
		}
	}, [currentSession])
}
