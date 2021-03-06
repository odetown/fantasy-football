# Example state shape for the client

## Goals:
 * keep as flat as possible (but arrays of ids are ok)
 * keep UI state and preserved state separate
 * default is to index entities by id

## State kept by router
 * current league

## Default meta

``` json
{
  "isFetching": false,
  "didInvalidate": false,
  "didFailFetching": false,
  "lastUpdated": 1439478405547,
  "statusCode": 200
}
```

## State shape

``` javascript
{
  "client": {},

  "entities": {

    "users": {
      "1": {/* ...<User> */}
    },

    "fantasy_leagues": {
      "1": {
        // ...<FantasyLeague>,
        "teams": [1, 2, 3], // team_ids
        "rules": {
          "team_reqs": { "QB": 1, "RB": 2/*, ... */},
          "max_team_size": 20
        }
      }
    },

    "fantasy_teams": {
      "1": {/* ...<FantasyTeam> */}
    },

    "football_players": {
      "1": {/* ...<FootballPlayer> */}
    },

    "drafts": {
      // indexed by league_id
      "1": {
        "order": [{/* ...<FantasyDraftOrder> */}], // in order
        "picks": [{/* ...<DraftPick> */}] // in order
      }
    }

  },

  "meta": {

    "auth": {
      // ...<META>
      "token": "123456abcdef",
      "user": "alex@gmail.com"
    },

    "current_user": {
      // ...<META>
      "id": 1
    },

    "my_leagues": {
      // ...<META>,
      "items": [1, 2, 3]
    },

    "fantasy_leagues": {
      "1": {

        "draft": {
          "order": {/* ...<META> */},
          "picks": {/* ...<META> */}
        },

        "fantasy_players": {
          // ...<META>,
          "items": [1, 2, 3]
        },

        "fantasy_teams": {
          // ...<META>,
          "items": [1, 2, 3]
        },

        "football_players": {
          // ...<META>,
          "items": [1, 2, 3]
        }
      }
    }

  }

}
```
