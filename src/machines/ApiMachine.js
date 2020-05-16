import GetMachine from './GetMachine';
import GetItemMachine from './GetItemMachine';
import PostMachine from './PostMachine';
import PatchMachine from './PatchMachine';
import DeleteMachine from './DeleteMachine';

const apiPath = '/api';

const ApiMachine = (entity) => ({
  get: GetMachine(apiPath, entity),
  getItem: GetItemMachine(apiPath, entity),
  post: PostMachine(apiPath, entity),
  patch: PatchMachine(apiPath, entity),
  delete: DeleteMachine(apiPath, entity),
});

export default ApiMachine;
