/**
 * UI翻訳定義
 * 日本語と英語のUI文字列
 */

export const languages = {
  ja: '日本語',
  en: 'English',
};

export const defaultLang = 'ja';

export const ui = {
  ja: {
    // ナビゲーション
    'nav.home': 'ホーム',
    'nav.about': '小田井窯について',
    'nav.products': '商品一覧',
    'nav.custom': 'オリジナル制作',
    'nav.contact': 'お問い合わせ',
    'nav.company': '会社概要',
    'nav.sake': '徳利・盃',

    // フッター
    'footer.company': '小田井窯',
    'footer.address': '〒507-0071 岐阜県多治見市小田町1-39',
    'footer.tel': 'TEL: 0572-22-2161',
    'footer.fax': 'FAX: 0572-22-2163',
    'footer.hours': '営業時間: 月〜金 8:00-17:00',
    'footer.privacy': 'プライバシーポリシー',
    'footer.law': '特定商取引法に基づく表記',
    'footer.terms': '利用規約',
    'footer.copyright': '© {year} 小田井窯 All rights reserved.',

    // 共通
    'common.learnMore': '詳しく見る',
    'common.contact': 'お問い合わせ',
    'common.backToHome': 'ホームへ戻る',
    'common.required': '必須',

    // トップページ
    'home.hero.title': '美濃焼の伝統と欧州の風を',
    'home.hero.subtitle': '岐阜県多治見市より、小田井窯の器をお届けします',
    'home.intro.title': '小田井窯のご紹介',
    'home.intro.text': '小田井窯では、美濃焼伝統の技術の中に欧州の作風を取り入れて、特色のある作品を創り出しております。',
    'home.series.title': '商品シリーズ',
    'home.featured.title': 'おすすめ商品',
    'home.custom.title': 'オリジナル制作・OEM',
    'home.custom.text': '飲食店のオリジナル商品、記念品等の製作も承ります。',

    // 小田井窯について
    'about.hero.title': '小田井窯について',
    'about.hero.subtitle': '美濃焼の伝統と欧州の作風を融合した陶器づくり',
    'about.intro.title': '小田井窯のご紹介',
    'about.elements.title': '小田井窯の基本（4要素）',
    'about.elements.subtitle': '陶器づくりに欠かせない4つの要素をご紹介します',
    'about.minoyaki.title': '美濃焼について',
    'about.company.title': '会社概要',

    // 商品
    'products.hero.title': '商品一覧',
    'products.hero.subtitle': '小田井窯の商品をご覧ください',
    'products.filter.all': 'すべて',
    'products.price': '価格',
    'products.stock.available': '在庫あり',
    'products.stock.unavailable': '在庫なし',
    'products.inquiry': 'この商品についてお問い合わせ',

    // お問い合わせ
    'contact.hero.title': 'お問い合わせ',
    'contact.hero.subtitle': '疑問質問なんでもどうぞ。カタログのご請求も承ります。',
    'contact.form.name': 'お名前',
    'contact.form.email': 'メールアドレス',
    'contact.form.phone': '電話番号',
    'contact.form.category': 'お問い合わせ種別',
    'contact.form.category.select': '選択してください',
    'contact.form.category.product': '商品について',
    'contact.form.category.custom': 'オリジナル制作について',
    'contact.form.category.catalog': 'カタログ請求',
    'contact.form.category.other': 'その他',
    'contact.form.message': 'お問い合わせ内容',
    'contact.form.submit': '送信する',
    'contact.form.sending': '送信中...',
    'contact.form.success': 'お問い合わせを受け付けました。ありがとうございます。',
    'contact.form.error': '送信に失敗しました。お手数ですがお電話にてお問い合わせください。',
    'contact.other.title': 'その他のお問い合わせ方法',
    'contact.other.phone': 'お電話',
    'contact.other.fax': 'FAX',

    // エラーページ
    '404.title': 'ページが見つかりません',
    '404.message': 'お探しのページは存在しないか、移動した可能性があります。',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.custom': 'Custom Orders',
    'nav.contact': 'Contact',
    'nav.company': 'Company',
    'nav.sake': 'Sake Vessels',

    // Footer
    'footer.company': 'Otai Ceramics',
    'footer.address': '1-39 Oda-cho, Tajimi, Gifu 507-0071, Japan',
    'footer.tel': 'TEL: +81-572-22-2161',
    'footer.fax': 'FAX: +81-572-22-2163',
    'footer.hours': 'Hours: Mon-Fri 8:00-17:00 (JST)',
    'footer.privacy': 'Privacy Policy',
    'footer.law': 'Legal Notice',
    'footer.terms': 'Terms of Use',
    'footer.copyright': '© {year} Otai Ceramics. All rights reserved.',

    // Common
    'common.learnMore': 'Learn More',
    'common.contact': 'Contact Us',
    'common.backToHome': 'Back to Home',
    'common.required': 'Required',

    // Home
    'home.hero.title': 'Mino Ware Tradition with European Flair',
    'home.hero.subtitle': 'Handcrafted ceramics from Tajimi, Gifu, Japan',
    'home.intro.title': 'About Otai Ceramics',
    'home.intro.text': 'At Otai Ceramics, we create distinctive pieces that blend traditional Mino ware techniques with European artistic influences.',
    'home.series.title': 'Product Series',
    'home.featured.title': 'Featured Products',
    'home.custom.title': 'Custom & OEM',
    'home.custom.text': 'We accept orders for original products for restaurants, commemorative items, and more.',

    // About
    'about.hero.title': 'About Otai Ceramics',
    'about.hero.subtitle': 'Blending Mino ware tradition with European artistry',
    'about.intro.title': 'Introduction',
    'about.elements.title': 'Four Elements of Pottery',
    'about.elements.subtitle': 'Essential elements in crafting ceramics',
    'about.minoyaki.title': 'About Mino Ware',
    'about.company.title': 'Company Information',

    // Products
    'products.hero.title': 'Products',
    'products.hero.subtitle': 'Browse our collection',
    'products.filter.all': 'All',
    'products.price': 'Price',
    'products.stock.available': 'In Stock',
    'products.stock.unavailable': 'Out of Stock',
    'products.inquiry': 'Inquire About This Product',

    // Contact
    'contact.hero.title': 'Contact Us',
    'contact.hero.subtitle': 'Feel free to ask us anything. Catalog requests are also welcome.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.category': 'Category',
    'contact.form.category.select': 'Please select',
    'contact.form.category.product': 'Product Inquiry',
    'contact.form.category.custom': 'Custom Order',
    'contact.form.category.catalog': 'Catalog Request',
    'contact.form.category.other': 'Other',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Thank you for your inquiry. We will get back to you soon.',
    'contact.form.error': 'Failed to send. Please contact us by phone.',
    'contact.other.title': 'Other Ways to Contact',
    'contact.other.phone': 'Phone',
    'contact.other.fax': 'FAX',

    // Error pages
    '404.title': 'Page Not Found',
    '404.message': 'The page you are looking for does not exist or may have been moved.',
  },
} as const;

export type UIKey = keyof typeof ui.ja;
