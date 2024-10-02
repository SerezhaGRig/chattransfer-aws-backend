/*
  Return list of all migrations

  IMPORTANT
  Add all above-imported migrations here so they can be included in sync
 */

import { Entities1722759881542 } from "./1722759881542-entities";
import { Entities1723194838302 } from "./1723194838302-entities";
import { Entities1724229657833 } from "./1724229657833-entities";
import { Entities1727865795636 } from "./1727865795636-entities";

export const getMigrations = [
  Entities1722759881542,
  Entities1723194838302,
  Entities1724229657833,
  Entities1727865795636,
];
