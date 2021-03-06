#Table Design#

Goal: support simple v0 draft app (no support for scoring yet)

##General##

###User###

* id
* email
* name

###FantasyLeague###

* id
* name
* commissioner_id (User fk)
* conference_id (FootballConference fk)
* draft_start_date

###FantasyLeagueMembership###

* user_id (User fk)
* fantasy_league_id (FantasyLeague fk)
* timestamp

###FantasyTeam###

* id
* name (i.e. Phantasy Phalcons)
* short_name (i.e. PHPH)
* fantasy_league_id (FantasyLeague fk)
* owner_id (User fk)

##Actual Football Players/Teams##

Notes:

* trying to keep these generic, so we would only need one set of players for all fantasy leagues
* by storing conferences, we can pull in all players for NCAA, and then support whatever conference we want at the Fantasy League level

###FootballPlayer###

* id
* name
* position
* football_team_id (FootballTeam fk)

###FootballTeam###

* id
* name
* conference_id (FootballConference fk)

###FootballConference###

* id
* name

##Draft##

###DraftOrder###

* fantasy_league_id (FantasyLeague fk)
* user_id (User fk)
* order (number)

###DraftPick###

* fantasy_league_id (FantasyLeague fk)
* user_id (User fk)
* football_player_id (FootballPlayer id)
* order
