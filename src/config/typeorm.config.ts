import { DataSource } from "typeorm";
import { getConnectionParams } from "./index";

export default new DataSource(getConnectionParams());
