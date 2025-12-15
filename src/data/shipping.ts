/**
 * 送料データ
 * 元サイト (www.otai.co.jp/kaimono.htm) の情報に基づく
 */

export interface ShippingRate {
  region: string;
  prefectures: string[];
  rate: number;
}

export const shippingRates: ShippingRate[] = [
  {
    region: '北海道',
    prefectures: ['北海道'],
    rate: 1260,
  },
  {
    region: '東北',
    prefectures: ['青森県', '秋田県', '岩手県'],
    rate: 950,
  },
  {
    region: '南東北',
    prefectures: ['宮城県', '山形県', '福島県'],
    rate: 840,
  },
  {
    region: '関東・甲信越・北陸・中部・関西',
    prefectures: [
      '東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県',
      '新潟県', '長野県', '山梨県',
      '富山県', '石川県', '福井県',
      '静岡県', '愛知県', '岐阜県', '三重県',
      '大阪府', '京都府', '兵庫県', '奈良県', '和歌山県', '滋賀県',
    ],
    rate: 740,
  },
  {
    region: '中国',
    prefectures: ['岡山県', '広島県', '山口県', '鳥取県', '島根県'],
    rate: 840,
  },
  {
    region: '四国・九州',
    prefectures: [
      '徳島県', '香川県', '愛媛県', '高知県',
      '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県',
    ],
    rate: 950,
  },
  {
    region: '沖縄',
    prefectures: ['沖縄県'],
    rate: 1260,
  },
];

/** 送料無料の基準金額 */
export const FREE_SHIPPING_THRESHOLD = 10000;

/** 送料に関する注意事項 */
export const shippingNotes = [
  '送料は税込価格です。',
  `お買い上げ金額${FREE_SHIPPING_THRESHOLD.toLocaleString()}円以上で送料無料となります。`,
  '離島・一部地域は別途料金がかかる場合がございます。',
  '複数商品をご注文の場合、まとめて1梱包で発送いたします。',
];

/** 配送に関する情報 */
export const deliveryInfo = {
  carrier: 'ヤマト運輸',
  inStockDelivery: '2営業日以内に発送',
  madeToOrderDelivery: '約2〜4週間で発送',
  businessDays: '月曜日〜金曜日（土日祝祭日除く）',
  businessHours: '午前8時〜午後5時',
  holidays: [
    '土曜日・日曜日・祝祭日',
    '夏期休暇（8月12日〜8月16日）',
    '年末年始（12月29日〜1月5日）',
  ],
  cutoffTime: '16時30分以降のご注文は翌営業日受付',
  dateSpecification: 'ご注文から6日目以降の配達日・時間指定が可能',
};

/**
 * 都道府県から送料を取得
 */
export function getShippingRate(prefecture: string): number | null {
  for (const rate of shippingRates) {
    if (rate.prefectures.includes(prefecture)) {
      return rate.rate;
    }
  }
  return null;
}

/**
 * 送料無料かどうかを判定
 */
export function isFreeShipping(totalAmount: number): boolean {
  return totalAmount >= FREE_SHIPPING_THRESHOLD;
}
