import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  const stats = { ...gameStats }
  stats.totalGames += 1
  if (count >= MAX_CHALLENGES) {
    stats.gamesFailed += 1
  }
  stats.successRate = getSuccessRate(stats)
  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  gamesFailed: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats
  return totalGames - gamesFailed
}
