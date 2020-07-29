
create table teams (
TeamID int unique,
TeamName varchar(32)not null,
City varchar(32)not null 
);

create table games (
GameID int,
Date Date,
Stadium varchar(32),
Result char(1),
Attendance int,
TicketRevenue int,
PRIMARY KEY(GameID),
check (Result in ('W', 'L', 'T'))
);

create table players (
PlayerID int not null,
FirstName varchar (50) not null,
LastName varchar(50) not null,
TeamID int,
Position char (2) not null,
Touchdowns int not null DEFAULT 0,
TotalYards int not null DEFAULT 0,
Salary numeric (8,2) not null,
check (position in('QB','RB','WR')),
foreign key(TeamID) references teams (TeamID),
PRIMARY KEY(PlayerID)
);

create table play(
PlayerID int,
GameID int,
FOREIGN KEY(PlayerID) references players (PlayerID),
FOREIGN KEY(GameID) references games (GameID)
);



