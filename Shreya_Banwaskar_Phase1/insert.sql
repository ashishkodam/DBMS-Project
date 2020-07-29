
/* DATA INSERTION */


INSERT into teams VALUES (101, 'Team A', 'City A');
INSERT into teams VALUES (102, 'Team B', 'City B');
INSERT into teams VALUES (103, 'Team C', 'City C');
INSERT into teams VALUES (104, 'Team D', 'City D');
INSERT into teams VALUES (105, 'Team E', 'City E'); 

INSERT into players VALUES (1,'Andrew','Adams', 101, 'WR', 0, 200, 3000);
INSERT into players VALUES (2,'Bobby','Baker', 102, 'RB', 2,700, 2500);
INSERT into players VALUES (3,'Charlie','Collins', 103,'QB',3,800, 8000);
INSERT into players VALUES (4,'Drake', 'Day', 104,'RB',3,500, 4000);
INSERT into players VALUES (5,'Evan','Eaddy', 105, 'QB',3,110, 6500);

INSERT into games VALUES (501, '2018-01-05', 'Stadium M & T', 'W', 10, 200);
INSERT into games VALUES (502, '2016-09-04', 'Stadium AT & T', 'W', 15, 190);
INSERT into games VALUES (503, '2017-11-11', 'Stadium NRG', 'T', 12, 500);
INSERT into games VALUES (504, '2017-12-30', 'Stadium NRG', 'L', 7, 300);
INSERT into games VALUES (505, '2015-02-17', 'Stadium M & T', 'T', 2, 625);

INSERT INTO play VALUES (1,501);
INSERT INTO play VALUES (2,502);
INSERT INTO play VALUES (3,503);
INSERT INTO play VALUES (4,504);
INSERT INTO play VALUES (5,505);
