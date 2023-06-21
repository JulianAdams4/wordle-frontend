import { ChartBarIcon, InformationCircleIcon } from '@heroicons/react/outline'

import { GAME_TITLE } from '../../constants/strings'
import { SettingsToggle } from '../modals/SettingsToggle'

type Props = {
  isDarkMode: boolean
  handleDarkMode: Function
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  isDarkMode,
  handleDarkMode,
  setIsInfoModalOpen,
  setIsStatsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <ChartBarIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <SettingsToggle
            settingName="Dark Mode"
            flag={isDarkMode}
            handleFlag={handleDarkMode}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
