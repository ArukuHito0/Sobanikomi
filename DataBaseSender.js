import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * @typedef {Object} CompressedTweetData
 * @property {'save'|'load'|'count'} action - 実行する操作 (保存'save' / 取得'load' / カウント'count')
 * @property {string} [key] - ツイートIDまたはURL
 * @property {string} [FromLocation] - 送り主の県名
 * @property {string} [ToLocation] - 送り先の県名
 */

/**
 * ツイートデータのDB操作を行うメイン関数
 * @param {CompressedTweetData} options
 */
export async function handleTweetData({ action, key, FromLocation, ToLocation }) {
  try {
    // 1. 保存処理 (save)
    if (action === 'save') {
      if (!key) {
        return { success: false, error: 'key is required for save action.' };
      }
      
      const { error } = await supabase
        .from('Retrieved_posts')
        .upsert(
          { 
            tweet_id: key,
            FromLocation: FromLocation || null,
            ToLocation: ToLocation || null
          },
          { 
            onConflict: 'tweet_id', 
            ignoreDuplicates: true 
          }
        );

      if (error) {
        console.error('Supabase Insert Error:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    }

    // 2. 読み出し処理 (load)
    if (action === 'load') {
      let query = supabase
        .from('Retrieved_posts')
        .select('tweet_id');

      if (FromLocation) {
        query = query.eq('FromLocation', FromLocation);
      }

      if (ToLocation) {
        query = query.eq('ToLocation', ToLocation);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase Select Error:', error.message);
        return { success: false, data: [] };
      }

      const tweetIds = data.map((item) => item.tweet_id);
      return { success: true, data: tweetIds };
    }

    // 3. 件数カウント処理 (count)
    if (action === 'count') {
      if (!key) {
        return { success: false, error: 'key is required for count action.' };
      }

      const { count, error } = await supabase
        .from('Retrieved_posts')
        .select('*', { count: 'exact', head: true })
        .eq('tweet_id', key);

      if (error) {
        console.error('Supabase Count Error:', error.message);
        return { success: false, count: 0, error: error.message };
      }

      return { success: true, count: count };
    }

    return { success: false, error: 'Invalid action specified.' };

  } catch (err) {
    console.error('handleTweetData Error:', err);
    return { success: false, error: err.message || err };
  }
}

export default {
  handleTweetData
};