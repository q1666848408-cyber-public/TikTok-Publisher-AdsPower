/**
 * Publish scheduler — Bull queue consumer.
 * Reads Feishu records, dispatches publish jobs to Windows runner.
 */

const Queue = require('bull');
const { AdsPowerClient } = require('../core/adspower');

const publishQueue = new Queue('tiktok-publish', { redis: process.env.REDIS_URL });

publishQueue.process(async (job) => {
  /**
   * 1. Fetch video URL + metadata from job.data
   * 2. Download video locally
   * 3. AdsPower open profile → TikTok Studio upload
   * 4. Write status back to Feishu
   * [All steps not shown]
   */
});

module.exports = { publishQueue };
