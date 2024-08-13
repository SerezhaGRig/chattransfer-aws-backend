/*
  Return list of all migrations

  IMPORTANT
  Add all above-imported migrations here so they can be included in sync
 */

import { Entities1722759881542 } from "./1722759881542-entities";
import { Entities1723536378714 } from "./1723536378714-entities";

export const getMigrations = [Entities1722759881542, Entities1723536378714];
