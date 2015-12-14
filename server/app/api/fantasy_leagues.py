from flask import jsonify, current_app
from ..models import FantasyLeague
from . import api


@api.route('/fantasy_leagues/')
def get_fantasy_leagues():
    fantasy_leagues = FantasyLeague.query.all()
    return jsonify({
        current_app.config['RESPONSE_OBJECT_NAME']: {
            'fantasy_leagues': [l.to_json() for l in fantasy_leagues]
        }
    })


@api.route('/fantasy_leagues/<int:id>')
def get_fantasy_league(id):
    fantasy_league = FantasyLeague.query.get_or_404(id)
    return jsonify({
        current_app.config['RESPONSE_OBJECT_NAME']: fantasy_league.to_json()
    })


@api.route('/fantasy_leagues/<int:id>/draft_picks/')
def get_fantasy_league_draft_picks(id):
    fantasy_league = FantasyLeague.query.get_or_404(id)
    draft_picks = fantasy_league.draft_picks.all()
    return jsonify({
        current_app.config['RESPONSE_OBJECT_NAME']: {
            'draft_picks': [p.to_json() for p in draft_picks]
        }
    })


@api.route('/fantasy_leagues/<int:id>/draft_orders/')
def get_fantasy_league_draft_orders(id):
    fantasy_league = FantasyLeague.query.get_or_404(id)
    draft_orders = fantasy_league.draft_orders.all()
    return jsonify({
        current_app.config['RESPONSE_OBJECT_NAME']: {
            'draft_orders': [o.to_json() for o in draft_orders]
        }
    })
