import { loadIcon } from '../../main/actions/icons';
import getAppsList from 'lib/getAppsList.js';

export default (send) => {
  const dispatch = (action) => {
    send({
      type: 'redux-action',
      action
    });
  }

  getAppsList().then(items => {
    items.forEach(app => loadIcon(app.path)(dispatch))
  })
}
