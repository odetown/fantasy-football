import _ from 'lodash';
import {
  selectLeagueDraftOrderMeta,
  selectLeagueDraftPicksMeta
} from './metaSelectors';
import {
  selectCurrentUser,
  selectFantasyLeague,
  selectLeagueFootballPlayers,
  selectMaxBenchSize
} from './selectors';
import {selectCurrentFantasyLeagueId} from './routeSelectors';
import {createFFSelector} from './selectorUtils';
import {bucketTeam} from '../logic/draftLogic';
import {Positions, FlexPositions} from '../Constants';

const EMPTY_POSITIONS = _.mapValues(Positions, () => []);

export const selectDrafts = state => state.entities.drafts;

export const selectLeagueDraftPicks = createFFSelector({
  metaSelectors: [selectLeagueDraftPicksMeta],
  selectors: [selectDrafts, selectCurrentFantasyLeagueId],
  selector: function (_draftPicksMeta, drafts, currentFantasyLeagueId) {
    return drafts[currentFantasyLeagueId].picks;
  }
});

export const selectLeagueDraftOrder = createFFSelector({
  metaSelectors: [selectLeagueDraftOrderMeta],
  selectors: [selectDrafts, selectCurrentFantasyLeagueId],
  selector: function (_draftOrderMeta, drafts, currentFantasyLeagueId) {
    return drafts[currentFantasyLeagueId].order;
  }
});

export const selectCurrentDraftOrder = createFFSelector({
  selectors: [selectLeagueDraftOrder, selectLeagueDraftPicks],
  selector: function (leagueDraftOrder, leagueDraftPicks) {
    return leagueDraftOrder[leagueDraftPicks.length];
  }
});

export const selectIsMyPick = createFFSelector({
  selectors: [selectCurrentDraftOrder, selectCurrentUser],
  selector: function (currentDraftOrder, currentUser) {
    return currentDraftOrder.user_id === currentUser.id;
  }
});

export const selectMyDraftPicks = createFFSelector({
 selectors: [selectLeagueDraftPicks, selectCurrentUser],
 selector: function (leagueDraftPicks, currentUser) {
    return _.where(leagueDraftPicks, { user_id: currentUser.id });
 }
});

export const selectMyDraftPickBuckets = createFFSelector({
  selectors: [
    selectLeagueFootballPlayers,
    selectFantasyLeague,
    selectMyDraftPicks
  ],
  selector: function (leagueFootballPlayers, fantasyLeague, myDraftPicks) {
    return bucketTeam({
      userDraftPicks: myDraftPicks,
      footballPlayerLookup: leagueFootballPlayers,
      teamReqs: fantasyLeague.rules.team_reqs
    });
  }
});

/**
 * Ensure we draft positions of need if we're running out of picks
 */
export const selectIneligibleDraftPositions = createFFSelector({
  selectors: [
    selectMyDraftPickBuckets,
    selectFantasyLeague,
    selectMyDraftPicks,
    selectMaxBenchSize
  ],
  selector: function (myDraftPickBuckets, fantasyLeague, myDraftPicks, maxBenchSize) {
    const {picksByPosition, bench} = myDraftPickBuckets;
    if (bench.length < maxBenchSize) {
      return [];
    } else {
      const {team_reqs} = fantasyLeague.rules;
      const flexIsOpen = (
        !picksByPosition[Positions.FLEX] ||
        picksByPosition[Positions.FLEX].length < team_reqs[Positions.FLEX]
      );
      return _.reject(Positions, function (p) {
        return (
          !picksByPosition[p] ||
          picksByPosition[p].length < team_reqs[p] ||
          (flexIsOpen && _.contains(FlexPositions, p))
        );
      });
    }
  }
});

export const selectDraftableFootballPlayers = createFFSelector({
  selectors: [
    selectLeagueFootballPlayers,
    selectLeagueDraftPicks,
    selectIneligibleDraftPositions
  ],
  selector: function (leagueFootballPlayers, leagueDraftPicks, ineligibleDraftPositions) {
    const draftedPlayerIds = _.pluck(leagueDraftPicks, 'football_player_id');
    return _(leagueFootballPlayers)
      .omit(draftedPlayerIds)
      .omit(function (fp) {
        return _.contains(ineligibleDraftPositions, fp.position);
      })
      .values()
      .value();
  }
});

export const selectDraftableFootballPlayersByPosition = createFFSelector({
  selectors: [selectDraftableFootballPlayers],
  selector: function (draftableFootballPlayers) {
    const byPosition = _.groupBy(draftableFootballPlayers, 'position');
    const flexes = _(byPosition)
      .pick(FlexPositions)
      .values()
      .flatten()
      .value();
    return { ...EMPTY_POSITIONS, ...byPosition, [Positions.FLEX]: flexes };
  }
});
