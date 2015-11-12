//
// Initial state for the store. In the future, we can bootstrap this with JSON
// data stamped to the page.
//
// SEE: stateShape.json for documentation on how this state is filled out
//

const META = {
  isFetching: false,
  didInvalidate: true,
  didFailFetching: true,
  lastUpdated: null
};

export default {
  client: {},
  entities: {
    current_user: null,
    users: {},
    fantasy_leagues: {},
    fantasy_teams: {},
    football_players: {},
    drafts: {}
  },
  meta: {
    current_user: { ...META },
    my_leagues: { ...META, items: null },
    leagues: {}
  }
};