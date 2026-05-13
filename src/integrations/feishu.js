/**
 * Feishu Bitable client — read/write video records.
 */

class FeishuClient {
  constructor({ appId, appSecret, baseToken }) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.baseToken = baseToken;
  }

  async listPendingVideos() {
    /** Query records where 是否发布 = Y AND status = pending. [Not shown] */
  }

  async updateStatus(recordId, status, url) {
    /** Patch record with publish status + TikTok URL. [Not shown] */
  }
}

module.exports = { FeishuClient };
