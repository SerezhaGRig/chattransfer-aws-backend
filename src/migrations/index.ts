/*
  Return list of all migrations

  IMPORTANT
  Add all above-imported migrations here so they can be included in sync
 */

import { Entities1722759881542 } from "./1722759881542-entities";
import { Entities1723194838302 } from "./1723194838302-entities";
import { Entities1724229657833 } from "./1724229657833-entities";
import { Entities1727943348261 } from "./1727943348261-entities";
import { Entities1728143518903 } from "./1728143518903-entities";
import { Entities1728146924461 } from "./1728146924461-entities";
import { Entities1728147510943 } from "./1728147510943-entities";

export const getMigrations = [
  Entities1722759881542,
  Entities1723194838302,
  Entities1724229657833,
  Entities1727943348261,
  Entities1728143518903,
  Entities1728146924461,
  Entities1728147510943,
];
