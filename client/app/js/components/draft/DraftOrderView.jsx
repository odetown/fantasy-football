import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {PropTypes} from 'react';
import {createFFSelector} from '../../selectors/selectorUtils';
import {ModelShapes} from '../../Constants';
import {selectCurrentDraftOrder, selectLeagueDraftOrder} from '../../selectors/draftSelectors';
import {selectLeagueUsers} from '../../selectors/selectors';

const PICKS_BEFORE = 3;
const PICKS_AFTER = 9;

export const draftOrderViewSelector = createFFSelector({
  selectors: [selectCurrentDraftOrder, selectLeagueDraftOrder, selectLeagueUsers],
  selector: function (currentDraftOrder, leagueDraftOrder, leagueUsers) {
    return {
      currentDraftOrder: currentDraftOrder,
      draftOrder: leagueDraftOrder,
      userLookup: leagueUsers
    };
  }
});

export default React.createClass({

  displayName: 'DraftOrderView',

  mixins: [PureRenderMixin],

  propTypes: {
    currentDraftOrder: ModelShapes.DraftOrder.isRequired,
    draftOrder: PropTypes.arrayOf(ModelShapes.DraftOrder).isRequired,
    userLookup: PropTypes.objectOf(ModelShapes.User).isRequired
  },

  render() {
    const {currentDraftOrder, draftOrder, userLookup} = this.props;
    const currentPickNumber = currentDraftOrder.order;
    const lowIndex = Math.max(currentPickNumber - PICKS_BEFORE, 0);
    const highIndex = Math.min(currentPickNumber + PICKS_AFTER, draftOrder.length);
    const slice = _.slice(draftOrder, lowIndex, highIndex);
    return (
      <ul className='list-inline list-group'>
        {_.map(slice, function (o) {
          const isActive = currentDraftOrder.order === o.order;
          return (
            <li
                key={o.order}
                className={'list-group-item' + (isActive ? ' active' : '')}
            >
              (#{o.order + 1}) {userLookup[o.user_id].team.short_name}
            </li>
          );
        })}
      </ul>
    );
  }

});
