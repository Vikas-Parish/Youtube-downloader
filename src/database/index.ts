import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import VideoModal from './dao/VideosModal';
import schema from './schema';
const adapter = new SQLiteAdapter({
  schema,
});
const database = new Database({
  adapter,
  modelClasses: [VideoModal],
});
export {database};
