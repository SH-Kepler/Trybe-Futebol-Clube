export interface ILogin {
  email: string,
  password: string
}

export interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface ITeamsId {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface ITeams {
  id?: number,
  teamName: string,
}

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface IPoints {
  homeTeamPoints: number,
  awayTeamPoints: number,
  win: string,
}
