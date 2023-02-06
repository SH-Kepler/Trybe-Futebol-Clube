import Teams from '../database/models/Teams';

export default class TeamsService {
  static async getAllTeams() {
    const teams = await Teams.findAll();

    return { status: 200, message: teams };
  }
}
