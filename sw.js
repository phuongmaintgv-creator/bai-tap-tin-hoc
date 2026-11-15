// Bài tập Đấu trường Tri thức — CHẠY KHÔNG CẦN MẠNG (15/11/2026)
// Mở một trang lần đầu (có mạng) là máy tải sẵn toàn bộ bài tập Tin 6–9; sau đó tắt mạng vẫn làm được.
// Có mạng thì máy tự cập nhật bản mới ở nền. Ôn tập, kiểm tra cần mạng (đếm lượt, ghi điểm) nên không lưu ở đây.
const BAN = 'baitap-v2';
const TEP = [
  './',
  './index.html',
  './manifest.webmanifest',
  './tin6/bai-01.html',
  './tin6/bai-02.html',
  './tin6/bai-03.html',
  './tin6/bai-04.html',
  './tin6/bai-05.html',
  './tin6/bai-06.html',
  './tin6/bai-07.html',
  './tin6/bai-08.html',
  './tin6/bai-09.html',
  './tin6/bai-10.html',
  './tin6/bai-11.html',
  './tin6/bai-12.html',
  './tin6/bai-13.html',
  './tin6/bai-14.html',
  './tin6/bai-15.html',
  './tin6/bai-16.html',
  './tin6/bai-17.html',
  './tin7/bai-01.html',
  './tin7/bai-02.html',
  './tin7/bai-03.html',
  './tin7/bai-04.html',
  './tin7/bai-05.html',
  './tin7/bai-06.html',
  './tin7/bai-07.html',
  './tin7/bai-08.html',
  './tin7/bai-09.html',
  './tin7/bai-10.html',
  './tin7/bai-11.html',
  './tin7/bai-12.html',
  './tin7/bai-13.html',
  './tin7/bai-14.html',
  './tin7/bai-15.html',
  './tin7/bai-16.html',
  './tin8/bai-01.html',
  './tin8/bai-02.html',
  './tin8/bai-03.html',
  './tin8/bai-04.html',
  './tin8/bai-05.html',
  './tin8/bai-06.html',
  './tin8/bai-07.html',
  './tin8/bai-08.html',
  './tin8/bai-09.html',
  './tin8/bai-10.html',
  './tin8/bai-11.html',
  './tin8/bai-12.html',
  './tin8/bai-13.html',
  './tin8/bai-14.html',
  './tin8/bai-15.html',
  './tin8/bai-16.html',
  './tin9/bai-01.html',
  './tin9/bai-02.html',
  './tin9/bai-03.html',
  './tin9/bai-04.html',
  './tin9/bai-05.html',
  './tin9/bai-06.html',
  './tin9/bai-07.html',
  './tin9/bai-08.html',
  './tin9/bai-09.html',
  './tin9/bai-10.html',
  './tin9/bai-11.html',
  './tin9/bai-12.html',
  './tin9/bai-13.html',
  './tin9/bai-14.html',
  './tin9/bai-15.html',
  './tin9/bai-16.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(BAN).then(c => Promise.all(TEP.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('baitap-') && x !== BAN).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/\/(on-tap-cuoi-ky-1|kiem-tra)\//.test(u.pathname)) return;        // ôn tập, kiểm tra: luôn dùng mạng
  e.respondWith(caches.open(BAN).then(c => c.match(e.request, {ignoreSearch: true}).then(cu => {
    const moi = fetch(e.request).then(r => { if (r && r.ok) c.put(e.request, r.clone()); return r; }).catch(() => null);
    return cu || moi.then(r => r || c.match('./index.html'));
  })));
});
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'HOI_SAN_SANG') caches.open(BAN).then(c => c.keys()).then(k => e.source && e.source.postMessage({type: 'SAN_SANG', so: k.length, tong: TEP.length}));
});
