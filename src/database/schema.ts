import {tableSchema, appSchema} from '@nozbe/watermelondb';
import {Tables} from './DbConstant';
export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: Tables.downloadedVideos,
      columns: [
        {name: 'status', type: 'string'},
        {name: 'path', type: 'string'},
        {name: 'user_action', type: 'string'},
        {name: 'speed_in_byte_per_ms', type: 'string'},
        {name: 'downloaded_bytes', type: 'number'},
        {name: 'video_details', type: 'string'},
      ],
    }),
  ],
});
