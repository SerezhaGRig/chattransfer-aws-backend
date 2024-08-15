/*
  Return list of all migrations

  IMPORTANT
  Add all above-imported migrations here so they can be included in sync
 */

import { Entities1722759881542 } from "./1722759881542-entities";
import { Entities1723194838302 } from "./1723194838302-entities";
import { Entities1723565395628 } from "./1723565395628-entities";

export const getMigrations = [
  Entities1722759881542,
  Entities1723194838302,
  Entities1723565395628,
];
