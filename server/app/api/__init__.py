from flask import Blueprint

api = Blueprint('api', __name__)

from . import authentication, users, fantasy_leagues, football_conferences, \
    fantasy_teams, football_players, football_teams, errors
