import { Sequelize, Options } from "sequelize";
import logger from "../infra/logger";

export default class Connection {
  private instance: Sequelize;
  private db_name: string;
  private db_user: string;
  private db_pass: string;
  private db_config: Options;

  constructor(
    dbName: string,
    dbUser: string,
    dbPass: string,
    dbConfig: Options
  ) {
    try {
      this.db_name = dbName;
      this.db_user = dbUser;
      this.db_pass = dbPass;
      this.db_config = dbConfig;

      this.instance = new Sequelize(dbName, dbUser, dbPass, dbConfig);
      
      logger.info(`Database: ${this.db_name} connected`)
    } catch (err) {
      logger.error('Can\'t establish database connection:\n', err);
      throw err;
    }
  }
  getInstance() {
    return this.instance;
  }
  async hasConection() {
    try {
      await this.instance.authenticate();
      logger.info(`Database: ${this.db_name} connected`)
    } catch (err) {
      logger.error('Can\'t establish database connection:\n', err);
      throw err;
    }
  }
}