import { DataSource } from "typeorm";
import { DataSourceOptions } from "../types/dataSource.interface";

let dataSource: DataSource;

export const getDataSourceInstance = async (dsOpts: DataSourceOptions) => {
  if (!dataSource) {
    dataSource = new DataSource(dsOpts);
    await dataSource.initialize();
    return dataSource;
  }
  return dataSource;
};
