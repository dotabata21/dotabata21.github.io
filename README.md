# 血圧記録くん 公式紹介・利用案内サイト

既存の白・淡い青と公式画像を維持した静的サイト。2026-10-11に所有者が正式公開を承認。紹介サイトの正式URLは https://dotabata21.github.io/、プライバシーポリシーは https://dotabata21.github.io/privacy.html。Webアプリ本体はまだlive未公開のため「近日公開」を維持。

## 構成

- index.html: 紹介、Android／Web入口、機能、保存先、OCR、問い合わせ
- guide.html: 記録・履歴・分析・手動／自動CSV・カメラ・PWA・オフライン
- faq.html: 保存／消失・移行・iPhone・広告など12問
- privacy.html: Android／Web／紹介サイトを分けたプライバシーポリシー
- licenses.html: アプリ内入口、Web版14パッケージの実LICENSE／NOTICE
- css/style.css、js/site.js: 共通デザイン、公開確認後の入口切替
- images/: 既存の公式画像2枚を維持
- robots.txt、sitemap.xml: 紹介サイトの5ページ。WebアプリのURLは別管理

## 確認した実装

Androidはv0.9.5 / 95000、Webは参照時v0.8.3。両方とも参照のみ。Web側は別セッションで作業中のため、この確認日以後の変更と公開前に再照合する。

根拠（相対パスは各アプリ内）:
- Web保存: src/data/database.ts、backupRepository.ts、genericImportRepository.ts
- 手動／自動CSV: src/platform/manualBackup.ts、autoBackup.ts、src/ui/AutoBackupPanel.tsx
- OCR: src/ui/CameraCapture.tsx、src/platform/camera.ts、src/workers/ocr.worker.ts（同一originの同梱ランタイム）
- PWA: vite.config.ts、src/platform/pwa.tsx、docs/eleventh-release.md
- Web広告: src/platform/ads.tsx（OFF、外部広告SDK未導入）、AppInfoPanel.tsx
- OSS: Web src/ossLicenses.jsonの実データを読み取り転記。再生成のためにWeb側スクリプトは実行していない
- Android: Manifest、CameraOcrSession.kt、docs/play/release-configuration.md等

自動バックアップは初期OFF。次の新規記録成功後に全件を書き出し、編集・削除・復元・汎用取り込みでは更新しない。iPhoneはWebKit模擬確認と実機確認を区別し、実機の最終確認済みとは書かない。AndroidとWebのカメラフォーカスの違いも記載。

## 正式公開後に入口を有効にする

js/site.jsのreleasesを編集する。現状は両方published:falseで、JavaScriptが無効でもボタンはdisabled。設定していないPlay URLを推測して作らない。

1. Webのlive公開を所有者が確認した後に、web.publishedをtrueへ。所有者が確定した正式URLはhttps://bpr-kun.web.app/。現在live未デプロイのためボタンは「近日公開」の無効状態。フラグの切替だけで「血圧記録くん Webを開く」へ変わる。Previewは掲載しない。スクリプトはこの正規URL以外を許可しない。
2. AndroidのPlay掲載を確認した後に、android.urlへ実際のストアURLをコピーし、android.publishedをtrueへ。nullや不正URLは無効のまま。
3. privacy.htmlには確定した正式URLを記載。公開ステータスはフラグに同期する。このREADMEの状態、配布版の機能差・保存先・広告の説明は公開前に照合する。
4. 入口・ステータス・公開準備中の注記はスクリプトが同期。iPhone確認等の注意点は公開フラグに連動させず維持する。

公開切替は本番URL確認の代わりではない。ローカル検証用URLやPreviewへ差し替えない。

## 公開操作

GitHub APIで公開元を確認済み：mainブランチのルート /、build_type=legacy、HTTPS有効、独自ドメインなし。mainへのpushを契機にGitHub管理の「pages build and deployment」が実行される。本repoに独自のdeploy workflowはない。今回の正式公開は所有者承認済み。Pages管理設定の変更、Firebase live変更、アプリ側の変更はしない。
GitHub Pagesは静的配信なのでビルド・npmインストール不要。確認用スクショ、ログ、試験スクリプトはrepoへ入れない。

## AdSense申請・公開前の残件

- 申請対象をこの紹介サイトにするか、Webアプリにも広告を入れるかは別判断。今回広告コード、Publisher ID、ads.txt／app-ads.txtは追加しない。
- Webの正式公開状態と説明を照合。実機のiPhone/PWA/カメラ/ダウンロードは残確認。CSV往復互換はコード／既存試験記録の範囲を超えて保証しない。
- AdSenseの所有権確認、サイト登録、審査結果は未確認。ページ数や文字数を増やしたことだけで審査通過を保証しない。
- 導入する広告／解析サービス、Cookie等、同意管理、対象地域と公開年齢方針を決め、プライバシーポリシーを改定してから導入する。
- 健康情報や病歴を広告向けターゲティングへ利用しない。広告クリックの誘導をしない。完成した有用な本文と操作を妨げない配置を保つ。
- 実際のPublisher IDが取得できてから、AdSense指定のads.txtを検討。Android用app-ads.txtと混同しない。
- 公開ページの到達性、問い合わせ先の受信、掲載画像の利用権、最新のアプリ機能・ライセンスを所有者が確認。

一次資料: [AdSenseの参加条件](https://support.google.com/adsense/answer/9724?hl=ja)、[Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=ja)、[ads.txt案内](https://support.google.com/adsense/answer/12171612?hl=ja)。今回の拡張は審査への申請・承認ではない。

## プライバシーポリシーの未確定事項

- Web側別セッションの今後の変更、本番配布版、将来の広告／解析／同意管理。
- 本番Android広告の管理画面設定とSDK由来の保持・削除条件。現在の試験広告通信と予定の本番広告を区別。
- 問い合わせメールの具体的な保存期間・削除運用、重要改定の周知方法は所有者確認。
- 医療機器の法的位置付け／公開地域の判断は本サイト拡張で確定しない。診断・治療・予防の効果は宣伝しない。
- 今回の改定日は2026-10-11。紹介サイトの正式公開対象として所有者確認済み。今後のWeb本体公開・広告構成の変更時には本文と改定日を再照合する。

配信事業者のIP処理は独自解析と別に説明。[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection)、[Firebase](https://firebase.google.com/support/privacy)を参照。

## ローカル確認結果（2026-10-11）

- WindowsのChrome / Playwrightによるブラウザ確認。320 / 360 / 390 / 412 / 1280pxで全5ページ、計25組を確認。
- 横方向のはみ出し、タイトル／description／canonical／OGP／favicon、重複ID、内部リンク・アンカー、画像読込、ナビの44px以上の操作高さを確認。
- FAQ全12問の開閉、OSS全文14件の参照元との一致、開いたライセンスの折り返しを確認。
- 320pxで文字を拡大して全5ページを確認。ブランド名は狭い画面で折り返せるよう調整。
- JavaScript無効時も公開未確認の入口はdisabled。Web公開フラグをブラウザ内だけ一時変更し、正式URLへのリンク・公開中バッジ・準備注記の同期を確認。実ファイルの公開フラグはfalseを維持。
- ローカル表示で外部への自動リクエスト・JavaScriptエラーなし。外部サービスのページへ遷移した後の挙動は別。
- 既存の画像2枚はSHA-256一致。git diff --check、新規ファイルの空白確認、変更ファイル10件の照合を実施。
- 写真、DB、CSV、スクショ、ログ、試験コード、APK/AAB、鍵は変更対象に含めず、広告コード・Publisher ID・ads.txtも追加していない。
- AndroidはHEADと既存未追跡文書の状態を維持。Webは参照のみ、参照時のpackage versionは0.8.3。

これは紹介サイトのローカル確認であり、Android／Webアプリの回帰試験、iPhone実機確認、AdSense審査、公開サイトの到達性確認ではない。
スクリーンショット・試験コード・結果JSONは紹介サイトrepoの外へ保存。正式公開操作は、上記の公開元確認後に対象ファイルだけをcommit・pushし、GitHub Pagesのデプロイ結果と外部からの5ページの表示を確認する。
