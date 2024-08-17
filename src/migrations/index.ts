/*
  Return list of all migrations

  IMPORTANT
  Add all above-imported migrations here so they can be included in sync
 */

import { Entities1722759881542 } from "./1722759881542-entities";
import { Entities1723194838302 } from "./1723194838302-entities";
import { Entities1723904648433 } from "./1723904648433-entities";

export const getMigrations = [
  Entities1722759881542,
  Entities1723194838302,
  Entities1723904648433,
];
