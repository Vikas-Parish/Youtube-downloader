import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import {Tables} from '../DbConstant';

export default class VideosModel extends Model {
  static table = Tables.downloadedVideos;
  @field('status') status;
  @field('path') path;
  @field('user_action') userAction;
  @field('speed_in_byte_per_ms') speedInBytePerMs;
  @field('downloaded_bytes') downloadedBytes;
  @field('video_details') videoDetails;
}
