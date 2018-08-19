CREATE TABLE IF NOT EXISTS Account(
  owner text  NOT NULL ,
  modifiedBy text  NOT NULL ,
  creation text  NOT NULL ,
  modified text  NOT NULL ,
  keywords text ,
  lft integer ,
  rgt integer ,
  name text PRIMARY KEY NOT NULL NOT NULL ,
  parentAccount text ,
  rootType text ,
  accountType text ,
  isGroup integer ,
  FOREIGN KEY (parentAccount) REFERENCES Account ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Party(
  owner text  NOT NULL,
  modifiedBy text  NOT NULL,
  creation text  NOT NULL,
  modified text  NOT NULL,
  keywords text,
  name text PRIMARY KEY NOT NULL NOT NULL,
  customer integer,
  supplier integer
);
CREATE TABLE IF NOT EXISTS Item(
  owner text  NOT NULL ,
  modifiedBy text  NOT NULL ,
  creation text  NOT NULL ,
  modified text  NOT NULL ,
  keywords text ,
  name text PRIMARY KEY NOT NULL NOT NULL ,
  description text ,
  unit text DEFAULT No,
  incomeAccount text ,
  expenseAccount text ,
  tax text ,
  rate real ,
  FOREIGN KEY (incomeAccount) REFERENCES Account ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (expenseAccount) REFERENCES Account ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (tax) REFERENCES Tax ON UPDATE CASCADE ON DELETE RESTRICT
);
