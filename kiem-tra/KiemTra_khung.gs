/**
 * 📝 KIỂM TRA TRÊN ĐẤU TRƯỜNG (10/11/2026) — GV Ngô Thị Phương Mai · Trường THCS Chánh Hưng
 * - Bài kiểm tra thường xuyên 2: Tin 6, Tin 7 (Bài 1 – Bài 6). 20 phút · 10 câu 1 đáp án (5 đ) · Đúng/Sai 3 câu × 4 ý (3 đ) · Mảnh ghép 4 cặp (2 đ).
 * - MẶC ĐỊNH KHOÁ. Cô mở/khoá bằng menu 🏆 Đấu trường → 📝 Kiểm tra → «Cho phép làm bài» / «Khoá bài kiểm tra».
 * - Đáp án CHỈ ở máy chủ (không gửi xuống máy học sinh); máy chủ chấm.
 * - Mỗi em làm 1 lần. Giờ bắt đầu ghi ở máy chủ nên tải lại trang không được thêm giờ; hết giờ máy tự nộp / tự thu bài.
 * - Kết quả: tab «📝 KẾT QUẢ KIỂM TRA» (đủ mọi mã của môn, xếp theo lớp → số thứ tự, em chưa làm để trống)
 *   và «📊 THỐNG KÊ KIỂM TRA» (theo lớp + câu sai nhiều). Chỉ mã học sinh, không tên. Bảng kết quả: sheet KTTX2 / KT_HKI.
 */
const KT_INFO = __KT_INFO__;
const KT_SHEET = '📝 KẾT QUẢ KIỂM TRA', KT_TK = '📊 THỐNG KÊ KIỂM TRA', KT_RAW = 'KT_RAW';
const KT_RAW_HDR = ['nop_luc', 'ma_hs', 'lop', 'bai_kt', 'diem', 'phan_1', 'phan_2', 'phan_3', 'giay', 'chi_tiet', 'event_id'];

function ktMo_(k) { return PropertiesService.getScriptProperties().getProperty('KT_OPEN_' + k) === '1'; }
/* Menu «📝 Kiểm tra»: Cho phép làm bài / Khoá bài kiểm tra (cô chủ động theo thời gian thích hợp) */
function ktNhom_(nhom) { return Object.keys(KT_INFO).filter(k => KT_INFO[k].nhom === nhom); }
function ktChoPhep_(nhom, ten) {
  const ds = ktNhom_(nhom); if (!ds.length) { ktBao_('Chưa có đề ' + ten + ' trong Đấu trường.'); return; }
  ds.forEach(k => PropertiesService.getScriptProperties().setProperty('KT_OPEN_' + k, '1')); ktBatHenGio_(true);
  ktBao_('✅ ĐÃ CHO PHÉP LÀM BÀI: ' + ten + ' (' + ds.map(k => KT_INFO[k].ten).join('; ') + '). Học sinh vào mục 📝 Kiểm tra để làm.');
}
function ktKhoa_(nhom, ten) {
  ktNhom_(nhom).forEach(k => PropertiesService.getScriptProperties().deleteProperty('KT_OPEN_' + k));
  ktBao_('🔒 ĐÃ KHOÁ ' + ten + '. Học sinh thấy trạng thái «Đang khoá». Em nào đang làm dở vẫn nộp được trong thời gian còn lại.');
}
/* 4 CỘT KIỂM TRA (tab 📝 KIỂM TRA của học sinh): KTTX1 · KTTX2 · KT_GK1 · KTHK1.
 * Cô «Cho phép làm bài» cột nào thì học sinh thấy cột đó mở và vào làm; cột khác hiện «🔒 Đang khoá». */
const KT_COT = [
  {hk: 'hk1', nhom: 'tx1', ma: 'TX1', nhan: 'KTTX1', ten: 'Kiểm tra thường xuyên 1 – Học kỳ I', sheet: 'KTTX1', cot: 'tx1'},
  {hk: 'hk1', nhom: 'tx2', ma: 'TX2', nhan: 'KTTX2', ten: 'Kiểm tra thường xuyên 2 – Học kỳ I', sheet: 'KTTX2', cot: 'tx2'},
  {hk: 'hk1', nhom: 'gk1', ma: 'GK1', nhan: 'KT_GHK1', ten: 'Kiểm tra giữa học kỳ I', sheet: 'KT_GK1', cot: 'gk'},
  {hk: 'hk1', nhom: 'hk1', ma: 'HK1', nhan: 'KT_HK1', ten: 'Kiểm tra cuối học kỳ I', sheet: 'KT_HKI', cot: 'ck'},
  {hk: 'hk2', nhom: 'tx1k2', ma: 'TX1K2', nhan: 'KTTX1', ten: 'Kiểm tra thường xuyên 1 – Học kỳ II', sheet: 'KTTX1_HK2', cot: 'tx1'},
  {hk: 'hk2', nhom: 'tx2k2', ma: 'TX2K2', nhan: 'KTTX2', ten: 'Kiểm tra thường xuyên 2 – Học kỳ II', sheet: 'KTTX2_HK2', cot: 'tx2'},
  {hk: 'hk2', nhom: 'gk2', ma: 'GK2', nhan: 'KT_GHK2', ten: 'Kiểm tra giữa học kỳ II', sheet: 'KT_GK2', cot: 'gk'},
  {hk: 'hk2', nhom: 'hk2', ma: 'HK2', nhan: 'KT_HK2', ten: 'Kiểm tra cuối học kỳ II', sheet: 'KT_HKII', cot: 'ck'}];
function ktCot_(nhom) { return KT_COT.find(c => c.nhom === nhom) || {}; }
function choPhepLamBaiTX1() { ktChoPhep_('tx1', 'KTTX1 – Thường xuyên 1, Học kỳ I'); }
function khoaKiemTraTX1() { ktKhoa_('tx1', 'KTTX1 học kỳ I'); }
function choPhepLamBaiTX2() { ktChoPhep_('tx2', 'KTTX2 – Thường xuyên 2, Học kỳ I'); }
function khoaKiemTraTX2() { ktKhoa_('tx2', 'KTTX2 học kỳ I'); }
function choPhepLamBaiGK1() { ktChoPhep_('gk1', 'KT_GHK1 – Giữa học kỳ I'); }
function khoaKiemTraGK1() { ktKhoa_('gk1', 'KT_GHK1'); }
function choPhepLamBaiHK1() { ktChoPhep_('hk1', 'KT_HK1 – Cuối học kỳ I'); }
function khoaKiemTraHK1() { ktKhoa_('hk1', 'KT_HK1'); }
function choPhepLamBaiTX1K2() { ktChoPhep_('tx1k2', 'KTTX1 – Thường xuyên 1, Học kỳ II'); }
function khoaKiemTraTX1K2() { ktKhoa_('tx1k2', 'KTTX1 học kỳ II'); }
function choPhepLamBaiTX2K2() { ktChoPhep_('tx2k2', 'KTTX2 – Thường xuyên 2, Học kỳ II'); }
function khoaKiemTraTX2K2() { ktKhoa_('tx2k2', 'KTTX2 học kỳ II'); }
function choPhepLamBaiGK2() { ktChoPhep_('gk2', 'KT_GHK2 – Giữa học kỳ II'); }
function khoaKiemTraGK2() { ktKhoa_('gk2', 'KT_GHK2'); }
function choPhepLamBaiHK2() { ktChoPhep_('hk2', 'KT_HK2 – Cuối học kỳ II'); }
function khoaKiemTraHK2() { ktKhoa_('hk2', 'KT_HK2'); }
function themMenuKiemTra_(menuCha) {
  const ui = SpreadsheetApp.getUi(), m = ui.createMenu('📝 Kiểm tra');
  [['hk1', '📘 Học kỳ I'], ['hk2', '📗 Học kỳ II']].forEach(h => {
    const sub = ui.createMenu(h[1]);
    KT_COT.filter(c => c.hk === h[0]).forEach((c, i) => { if (i) sub.addSeparator();
      sub.addItem('✅ Cho phép làm bài — ' + c.nhan, 'choPhepLamBai' + c.ma).addItem('🔒 Khoá — ' + c.nhan, 'khoaKiemTra' + c.ma); });
    m.addSubMenu(sub);
  });
  m.addSeparator();
  Object.keys(KT_INFO).forEach(k => { m.addItem('🧪 Cô làm thử — ' + KT_INFO[k].ten.replace(/^Kiểm tra /, ''), 'lamThu_' + k); });
  m.addSeparator().addItem('👀 Xem cột nào đang mở', 'xemTrangThaiKiemTra')
    .addItem('🔄 Làm mới kết quả + thống kê', 'lamMoiKetQuaKiemTra')
    .addItem('📥 Chuyển lại điểm vào TIN_6, TIN_7 (chỉ ô trống)', 'chuyenDiemKTTX2');
  return menuCha.addSubMenu(m);
}
function xemTrangThaiKiemTra() {
  ktBao_(KT_COT.map(c => { const ds = ktNhom_(c.nhom);
    return (c.hk === 'hk2' ? 'HK II · ' : 'HK I · ') + c.nhan + ': ' + (!ds.length ? 'chưa có đề trên Đấu trường (luôn khoá)' : ds.map(k => KT_INFO[k].mon.replace('tin', 'Tin ') + (ktMo_(k) ? ' ✅ ĐANG MỞ' : ' 🔒 khoá')).join(' · ')); }).join('\n'));
}
function ktBao_(m) { try { SpreadsheetApp.getUi().alert(m); } catch (e) { Logger.log(m); } }
/* Tab 📝 KIỂM TRA: 4 cột của môn đang chọn (cột nào có đề, đang mở, em đã nộp chưa) */
function getTestList(x) {
  const mon = String(x && x.mon || ''), sid = chuanMa_(ktMaTuVe_(x && x.tk)), props = PropertiesService.getScriptProperties();
  return KT_COT.map(c => {
    const k = c.nhom + '_' + mon, info = KT_INFO[k];
    const cu = info && sid ? ktDaNop_(sid, k) : null, bd = info && sid ? props.getProperty('KT_BD_' + k + '_' + sid) : null;
    return {hk: c.hk, nhom: c.nhom, nhan: c.nhan, ten: info ? info.ten : c.ten + ' – ' + mon.replace('tin', 'Tin học '), key: info ? k : '',
      coDe: !!info, mo: !!info && (ktMo_(k) || !!bd), dangLam: !!bd && !cu, phut: info ? info.phut : 0, daNop: cu ? cu.diem : null};
  });
}

/* Mã học sinh lấy từ «vé» đăng nhập (mã + PIN) — không nhận mã gõ tay trên đường dẫn */
function ktMaTuVe_(tk) { return tk ? (CacheService.getScriptCache().get(OFS.TOKEN_PREFIX + String(tk)) || '') : ''; }

function ktTrang_(tieuDe, noiDung) {
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<body style="font-family:Arial;padding:30px;background:#0b1a2c;color:#f7fbff;text-align:center;font-size:22px"><h2 style="font-size:34px">' + tieuDe + '</h2>' + noiDung +
    '<p><a style="display:inline-block;background:#ffc857;color:#17202a;font-weight:800;padding:14px 26px;border-radius:999px;text-decoration:none;font-size:22px" target="_top" href="' +
    (ScriptApp.getService().getUrl() || '') + '">🏠 Về trang chủ</a></p></body>').setTitle('Đấu trường Tri thức - Kiểm tra');
}

function ktDaNop_(sid, k) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(KT_RAW);
  if (!sh || sh.getLastRow() < 2) return null;
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 9).getValues();
  const r = v.find(x => String(x[1]) === sid && String(x[3]) === k);
  return r ? {diem: r[4], p1: r[5], p2: r[6], p3: r[7]} : null;
}

/* doGet view=test&kt=tx2_tin6&tk=<vé> */
function serveTest_(p) {
  const k = String(p.kt || '').trim(), info = KT_INFO[k];
  if (!info) return ktTrang_('Không tìm thấy bài kiểm tra', '');
  const sid = chuanMa_(ktMaTuVe_(p.tk));
  if (!sid) return ktTrang_('🔑 Em đăng nhập trước nhé', '<p>Về trang chủ, nhập Mã học sinh và PIN, rồi bấm lại bài kiểm tra.</p>');
  if (!/^THU-/.test(sid) && !sidDuocMon_(sid, info.mon)) return HtmlService.createHtmlOutput(trangChanMon_(sid, info.mon, 'bài kiểm tra')).setTitle('Đấu trường Tri thức');
  const cu = ktDaNop_(sid, k);
  if (cu) return ktTrang_('✅ Em đã nộp bài kiểm tra này', '<p>Điểm: <b style="font-size:44px;color:#ffc857">' + String(cu.diem).replace('.', ',') + '</b> / 10</p><p>Mỗi em chỉ làm 1 lần.</p>');
  // giờ bắt đầu chỉ ghi khi em bấm «BẮT ĐẦU LÀM BÀI» (hàm batDauKiemTra); tải lại trang vẫn tính tiếp giờ cũ
  const bd = Number(PropertiesService.getScriptProperties().getProperty('KT_BD_' + k + '_' + sid) || 0);
  if (!ktMo_(k) && !bd) return ktTrang_('🔒 Đang khoá', '<p>' + info.ten + '</p><p>Cô chưa cho phép làm bài. Em chờ cô mở rồi vào lại nhé.</p>');
  const conLai = bd ? Math.max(0, Math.round(info.phut * 60 - (Date.now() - bd) / 1000)) : info.phut * 60;
  // đề gửi xuống KHÔNG có đáp án
  const d = info.de;
  const de = {
    mc: d.mc.map((c, i) => ({i, bai: c[0], q: c[2], o: c[3].map((t, j) => ({j, t}))})),
    ds: d.ds.map((c, i) => ({i, bai: c[0], dan: c[1], y: c[2].map(y => y[0])})),
    ghep: d.ghep ? {yeu: d.ghep[2], A: d.ghep[3].map((c, i) => ({i, t: c[0]})), B: d.ghep[3].map((c, i) => ({i, t: c[1]}))} : null,
    diem: info.diem
  };
  const h = KT_HTML_.replace('__CFG__', JSON.stringify({k, sid, tk: String(p.tk || ''), ten: info.ten + (/^THU-/.test(sid) ? ' — CÔ LÀM THỬ (không ghi điểm)' : ''), conLai, tong: info.phut * 60, daBatDau: !!bd}).replace(/</g, '\\u003c'))
                     .replace('__DE__', JSON.stringify(de).replace(/</g, '\\u003c'));
  return HtmlService.createHtmlOutput(chenNutVe_(h)).setTitle('Đấu trường Tri thức - Kiểm tra')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

/* Học sinh bấm «BẮT ĐẦU LÀM BÀI»: ghi giờ bắt đầu ở máy chủ, trả số giây còn lại */
function batDauKiemTra(x) {
  const k = String(x && x.k || ''), info = KT_INFO[k];
  if (!info) return {ok: false, message: 'Không tìm thấy bài kiểm tra.'};
  const sid = chuanMa_(ktMaTuVe_(x.tk));
  if (!sid) return {ok: false, message: 'Phiên đăng nhập đã hết hạn. Em đăng nhập lại.'};
  if (ktDaNop_(sid, k)) return {ok: false, message: 'Em đã nộp bài kiểm tra này. Mỗi em chỉ làm 1 lần.'};
  const props = PropertiesService.getScriptProperties(), keyBD = 'KT_BD_' + k + '_' + sid;
  let bd = Number(props.getProperty(keyBD) || 0);
  if (!bd) {
    if (!ktMo_(k) && !/^THU-/.test(sid)) return {ok: false, message: 'Bài kiểm tra đang khoá. Em chờ cô cho phép làm bài.'};
    bd = Date.now(); props.setProperty(keyBD, String(bd));
  }
  return {ok: true, conLai: Math.max(0, Math.round(info.phut * 60 - (Date.now() - bd) / 1000))};
}

/* Học sinh nộp bài: x = {k, tk, mc:{i:j}, ds:{i:[true/false/null ×4]}, ghep:{iA:iB}, eventId} */
function nopBaiKiemTra(x) {
  const k = String(x && x.k || ''), info = KT_INFO[k];
  if (!info) return {ok: false, message: 'Không tìm thấy bài kiểm tra.'};
  const sid = chuanMa_(ktMaTuVe_(x.tk));
  if (!sid) return {ok: false, message: 'Phiên đăng nhập đã hết hạn. Em đăng nhập lại rồi nộp.'};
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const cu = ktDaNop_(sid, k);
    if (cu) return {ok: true, duplicate: true, diem: cu.diem};
    const bd = Number(PropertiesService.getScriptProperties().getProperty('KT_BD_' + k + '_' + sid) || 0);
    if (!bd) return {ok: false, message: 'Em chưa bấm «BẮT ĐẦU LÀM BÀI».'};
    const tre = Date.now() - bd > (info.phut * 60 + 180) * 1000;
    const r = ktChamVaGhi_(k, sid, bd, x, (x && x.tuDong ? 'Hết giờ, máy tự nộp' : 'Học sinh nộp') + (tre ? ' (trễ do mạng)' : ''), String(x.eventId || ''));
    if (!/^THU-/.test(sid)) try { lamMoiKetQuaKiemTra_(); } catch (e) { console.error('KT bảng:', e); }
    return Object.assign({ok: true}, r);
  } finally { lock.releaseLock(); }
}

/* Chấm + ghi chi tiết từng phần, từng câu (gọi trong khoá) */
function ktChamVaGhi_(k, sid, bd, x, cach, eventId) {
  const info = KT_INFO[k], d = info.de, ct = [];
  const giay = Math.min(Math.round((Date.now() - bd) / 1000), info.phut * 60);
  let p1 = 0, p2 = 0, p3 = 0;
  const dm = info.diem || {mc: 0.5, ds: 0.25, ghep: 0.5};
  d.mc.forEach((c, i) => { const chon = x.mc && x.mc[i] != null ? Number(x.mc[i]) : null, ok = chon === c[4]; if (ok) p1 += dm.mc;
    ct.push({n: 'I.' + (i + 1), q: c[2], c: chon == null ? '' : c[3][chon], da: c[3][c[4]], d: ok ? 1 : 0}); });
  d.ds.forEach((c, i) => c[2].forEach((y, j) => { const v = x.ds && x.ds[i] ? x.ds[i][j] : null, ok = v === y[1]; if (ok) p2 += dm.ds;
    ct.push({n: 'II.' + (i + 1) + 'abcd'[j], q: y[0], c: v == null ? '' : (v ? 'Đúng' : 'Sai'), da: y[1] ? 'Đúng' : 'Sai', d: ok ? 1 : 0}); }));
  (d.ghep ? d.ghep[3] : []).forEach((c, i) => { const v = x.ghep && x.ghep[i] != null ? Number(x.ghep[i]) : null, ok = v === i; if (ok) p3 += dm.ghep;
    ct.push({n: 'III.' + (i + 1), q: c[0], c: v == null ? '' : d.ghep[3][v][1], da: c[1], d: ok ? 1 : 0}); });
  const diem = Math.round((p1 + p2 + p3) * 100) / 100;
  if (/^THU-/.test(sid)) {   // cô làm thử: KHÔNG ghi kết quả, không ghi điểm; trả chi tiết từng câu để cô soát đáp án
    const pr = PropertiesService.getScriptProperties(); pr.deleteProperty('KT_BD_' + k + '_' + sid); pr.deleteProperty('KT_NHAP_' + k + '_' + sid);
    return {diem, p1, p2, p3, ct};
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(KT_RAW);
  if (!sh) { sh = ss.insertSheet(KT_RAW); sh.getRange(1, 1, 1, KT_RAW_HDR.length).setValues([KT_RAW_HDR]); sh.setFrozenRows(1); }
  sh.appendRow([new Date(), sid, sid.split('-')[0], k, diem, p1, p2, p3, giay, JSON.stringify(ct).slice(0, 45000), eventId + ' · ' + cach]);
  try { PropertiesService.getScriptProperties().deleteProperty('KT_NHAP_' + k + '_' + sid); } catch (e) {}
  try { if (typeof ktGhiBangKetQua_ === 'function') ktGhiBangKetQua_(k, sid, diem, p1, p2, p3, giay, ct, cach); } catch (e) { console.error('Bảng kết quả:', e); }
  return {diem, p1, p2, p3};
}

/* Lưu tạm bài đang làm lên máy chủ (mỗi lần em chọn đáp án) — để hết giờ máy tự thu kể cả khi em tắt trang */
function luuNhapKiemTra(x) {
  const k = String(x && x.k || ''); if (!KT_INFO[k]) return {ok: false};
  const sid = chuanMa_(ktMaTuVe_(x.tk)); if (!sid) return {ok: false};
  PropertiesService.getScriptProperties().setProperty('KT_NHAP_' + k + '_' + sid, JSON.stringify({mc: x.mc || {}, ds: x.ds || {}, ghep: x.ghep || {}}).slice(0, 8500));
  return {ok: true};
}

/* MÁY TỰ THU BÀI: em đã bắt đầu, quá thời gian (+1 phút) mà chưa nộp → chấm phần đã lưu, ghi «Máy tự thu bài».
 * Chạy tự động 5 phút/lần khi cô «Cho phép làm bài»; cũng chạy khi làm mới kết quả. */
function thuBaiHetGio() {
  const lock = LockService.getScriptLock(); if (!lock.tryLock(20000)) return;
  try {
    const props = PropertiesService.getScriptProperties(), all = props.getProperties();
    let thu = 0;
    Object.keys(all).filter(t => t.indexOf('KT_BD_') === 0).forEach(t => {
      const m = t.match(/^KT_BD_(.+?)_([0-9A-Z]+-\d{2})$/); if (!m) return;
      const k = m[1], sid = m[2], info = KT_INFO[k]; if (!info) return;
      const bd = Number(all[t]); if (Date.now() - bd < (info.phut * 60 + 60) * 1000) return;
      if (ktDaNop_(sid, k)) return;
      let x = {}; try { x = JSON.parse(all['KT_NHAP_' + k + '_' + sid] || '{}'); } catch (e) {}
      ktChamVaGhi_(k, sid, bd, x, 'Máy tự thu bài khi hết giờ', 'auto'); thu++;
    });
    if (thu) lamMoiKetQuaKiemTra_();
  } finally { lock.releaseLock(); }
}
function ktBatHenGio_(bat) {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'thuBaiHetGio').forEach(t => ScriptApp.deleteTrigger(t));
  if (bat) ScriptApp.newTrigger('thuBaiHetGio').timeBased().everyMinutes(5).create();
}

/* Thứ tự lớp tự nhiên: 6A1, 6A2, …, 6A10, 6AP; trong lớp theo số thứ tự */
function ktKhoaMa_(m) {
  const r = String(m).match(/^(\d)A(\d{1,2}|P)-(\d{2})$/);
  return r ? [Number(r[1]), r[2] === 'P' ? 99 : Number(r[2]), Number(r[3])] : [9, 99, 99];
}
function ktSoSanh_(a, b) { const x = ktKhoaMa_(a), y = ktKhoaMa_(b); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; }

function lamMoiKetQuaKiemTra() { thuBaiHetGio(); lamMoiKetQuaKiemTra_(); ktBao_('Đã làm mới «' + KT_SHEET + '» và «' + KT_TK + '».'); }
function lamMoiKetQuaKiemTra_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), raw = ss.getSheetByName(KT_RAW);
  const ds = raw && raw.getLastRow() > 1 ? raw.getRange(2, 1, raw.getLastRow() - 1, 10).getValues() : [];
  const kq = {}; ds.forEach(r => { const key = r[3] + '|' + r[1]; if (!kq[key]) kq[key] = r; });
  const hs = getStudents_().filter(s => s.active).map(s => chuanMa_(s.id)).filter(m => /^[6-9]A/.test(m));
  const rows = [], tk = [], cau = {};
  Object.keys(KT_INFO).forEach(k => {
    const info = KT_INFO[k], ma = hs.filter(m => monCuaLop_(m).indexOf(info.mon) >= 0).sort(ktSoSanh_);
    const theoLop = {};
    ma.forEach(m => {
      const r = kq[k + '|' + m], lop = m.split('-')[0];
      rows.push([info.ten, lop, m, r ? r[4] : '', r ? r[5] : '', r ? r[6] : '', r ? r[7] : '',
        r ? Math.floor(r[8] / 60) + ' phút ' + (r[8] % 60) + ' giây' : '', r ? r[0] : '', r ? 'Đã nộp' : 'Chưa làm']);
      const L = theoLop[lop] = theoLop[lop] || {si: 0, lam: 0, m8: 0, m65: 0, m5: 0, d5: 0, cao: null, thap: null};
      L.si++;
      if (r) { const d = Number(r[4]); L.lam++; if (d >= 8) L.m8++; else if (d >= 6.5) L.m65++; else if (d >= 5) L.m5++; else L.d5++;
        L.cao = L.cao == null ? d : Math.max(L.cao, d); L.thap = L.thap == null ? d : Math.min(L.thap, d);
        try { JSON.parse(r[9]).forEach(c => { const key = k + '|' + c.n; const C = cau[key] = cau[key] || {ten: info.ten, n: c.n, q: c.q, da: c.da, lam: 0, dung: 0}; C.lam++; C.dung += c.d; }); } catch (e) {} }
    });
    Object.keys(theoLop).sort((a, b) => ktSoSanh_(a + '-01', b + '-01')).forEach(lop => { const L = theoLop[lop];
      tk.push([info.ten, lop, L.si, L.lam, L.si - L.lam, L.m8, L.m65, L.m5, L.d5, L.cao == null ? '' : L.cao, L.thap == null ? '' : L.thap]); });
  });
  let sh = ss.getSheetByName(KT_SHEET) || ss.insertSheet(KT_SHEET); sh.clear();
  sh.getRange(1, 1, 1, 10).setValues([['Bài kiểm tra', 'Lớp', 'Mã HS', 'Điểm (10)', 'Phần I', 'Phần II Đ/S', 'Phần III Ghép', 'Thời gian làm', 'Nộp lúc', 'Trạng thái']])
    .setFontWeight('bold').setBackground('#dce6f2');
  if (rows.length) sh.getRange(2, 1, rows.length, 10).setValues(rows);
  sh.setFrozenRows(1);
  let t = ss.getSheetByName(KT_TK) || ss.insertSheet(KT_TK); t.clear();
  t.getRange(1, 1).setValue('THỐNG KÊ BÀI KIỂM TRA — cập nhật ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'HH:mm dd/MM/yyyy') + ' · chỉ mã học sinh, không tên').setFontWeight('bold');
  t.getRange(3, 1, 1, 11).setValues([['Bài kiểm tra', 'Lớp', 'Số mã', 'Đã làm', 'Chưa làm', 'Từ 8 điểm', '6,5 – dưới 8', '5 – dưới 6,5', 'Dưới 5', 'Cao nhất', 'Thấp nhất']]).setFontWeight('bold').setBackground('#dce6f2');
  if (tk.length) t.getRange(4, 1, tk.length, 11).setValues(tk);
  const cs = Object.keys(cau).map(key => cau[key]).filter(c => c.lam).sort((a, b) => a.dung / a.lam - b.dung / b.lam);
  const r0 = 6 + tk.length;
  t.getRange(r0, 1).setValue('CÂU / Ý HỌC SINH SAI NHIỀU (tỉ lệ làm đúng thấp ở trên — dạy lại đúng chỗ)').setFontWeight('bold');
  t.getRange(r0 + 1, 1, 1, 6).setValues([['Bài kiểm tra', 'Câu/ý', 'Nội dung', 'Đáp án', 'Số em làm', 'Tỉ lệ đúng']]).setFontWeight('bold').setBackground('#dce6f2');
  if (cs.length) t.getRange(r0 + 2, 1, cs.length, 6).setValues(cs.map(c => [c.ten, c.n, c.q, c.da, c.lam, Math.round(c.dung / c.lam * 100) + '%']));
}

const KT_HTML_ = `__HTML__`;

/* ===================== GHI VÀO FILE «BẢNG KẾT QUẢ» CỦA CÔ (10/11/2026) =====================
 * - Sheet theo cột: KTTX1 / KTTX2 / KT_GK1 / KT_HKI — mỗi em 1 dòng, xếp theo lớp → số thứ tự;
 *   có điểm từng phần + từng câu (em chọn gì, đúng ✓ / sai ✗).
 * - Điểm cuối cùng ghi vào đúng cột học kỳ I của TIN_6 / TIN_7 (TX1, TX2, giữa kỳ, cuối kỳ) — CHỈ GHI VÀO Ô TRỐNG, không ghi đè điểm cô đã nhập. */
function ktBangKetQua_() { const id = PropertiesService.getScriptProperties().getProperty(OFS.PROP_SHEET); return id ? SpreadsheetApp.openById(id) : null; }

function ktGhiBangKetQua_(k, sid, diem, p1, p2, p3, giay, ct, cach) {
  const ss = ktBangKetQua_(); if (!ss) return;
  const info = KT_INFO[k], ten = info.sheet || ktCot_(info.nhom).sheet || 'KTTX2';
  const sh = ss.getSheetByName(ten) || ss.insertSheet(ten);
  const cot = ['Bài kiểm tra', 'Lớp', 'Mã HS', 'Điểm (10)', 'Phần I', 'Phần II Đ/S', 'Phần III Ghép', 'Thời gian làm', 'Nộp lúc', 'Cách nộp', 'Ghi vào TIN_' + info.grade]
    .concat(ct.map(c => c.n));
  if (sh.getLastRow() < 1 || String(sh.getRange(1, 3).getValue()) !== 'Mã HS') {
    if (sh.getLastRow() >= 1) sh.insertRowBefore(1);
    sh.getRange(1, 1, 1, cot.length).setValues([cot]).setFontWeight('bold').setBackground('#dce6f2'); sh.setFrozenRows(1);
  } else if (sh.getLastColumn() < cot.length) sh.getRange(1, 1, 1, cot.length).setValues([cot]);
  const ghi = ktGhiDiemTX2_(ss, info, sid, Math.round(diem * 10) / 10);
  const dong = [info.ten, sid.split('-')[0], sid, diem, p1, p2, p3, Math.floor(giay / 60) + ' phút ' + (giay % 60) + ' giây', new Date(), cach, ghi]
    .concat(ct.map(c => (c.c === '' ? '(bỏ trống)' : c.c) + (c.d ? ' ✓' : ' ✗')));
  const n = sh.getLastRow(), ma = n > 1 ? sh.getRange(2, 3, n - 1, 1).getValues().map(r => String(r[0])) : [];
  let r = ma.findIndex((m, i) => m === sid && String(sh.getRange(i + 2, 1).getValue()) === info.ten);
  if (r >= 0) sh.getRange(r + 2, 1, 1, dong.length).setValues([dong]);
  else {   // chèn đúng chỗ theo thứ tự lớp → số thứ tự
    let vt = ma.findIndex(m => ktSoSanh_(sid, m) < 0);
    vt = vt < 0 ? n + 1 : vt + 2;
    if (vt <= n) sh.insertRowBefore(vt);
    sh.getRange(vt, 1, 1, dong.length).setValues([dong]);
  }
}

/* Ghi điểm vào đúng cột học kỳ I của TIN_6 / TIN_7 (chỉ ô trống). info.cot: tx1 | tx2 | gk | ck */
function ktGhiDiemTX2_(ss, info, sid, diem) {
  const tabs = Object.assign({}, OFS.DEFAULT_TABS, JSON.parse(PropertiesService.getScriptProperties().getProperty(OFS.PROP_TABS) || '{}'));
  const sh = ss.getSheetByName(tabs[info.mon]); if (!sh) return 'không có trang ' + tabs[info.mon];
  const tenCot = ({tx1: 'Thường xuyên 1', tx2: 'Thường xuyên 2', gk: 'Giữa kỳ', ck: 'Cuối kỳ'}[info.cot] || info.cot) + ((info.hk || ktCot_(info.nhom).hk) === 'hk2' ? ' học kỳ II' : ' học kỳ I');
  const v = sh.getDataRange().getDisplayValues();
  for (let r = 0; r < v.length; r++) {
    const sidCol = v[r].findIndex(c => String(c).trim().toLowerCase() === 'student_id'); if (sidCol < 0) continue;
    const map = banDoCot_(v[r], v[r + 1] || [], sidCol), hk = info.hk || ktCot_(info.nhom).hk || 'hk1', m1 = map[hk] || {tx: [], gk: -1, ck: -1};
    const c = info.cot === 'ck' ? (m1.ck >= 0 ? m1.ck : null) : info.cot === 'gk' ? (m1.gk >= 0 ? m1.gk : null) : m1.tx[info.cot === 'tx1' ? 0 : 1];
    if (c == null) return 'không thấy cột ' + tenCot;
    for (let k = r + 2; k < v.length; k++) {
      if (v[k].some(x => String(x).trim().toLowerCase() === 'student_id')) break;
      if (chuanMa_(v[k][sidCol]) !== sid) continue;
      if (String(v[k][c]).trim() !== '') return 'ô ' + tenCot + ' đã có điểm ' + v[k][c] + ' — không ghi đè';
      sh.getRange(k + 1, c + 1).setValue(diem); return 'đã ghi ' + diem + ' vào cột ' + tenCot;
    }
  }
  return 'không thấy mã trong trang ' + tabs[info.mon];
}

/* Menu: chuyển lại điểm mọi bài kiểm tra đã nộp (sau khi cô xoá ô cần ghi lại) */
function chuyenDiemKTTX2() {
  const ss = ktBangKetQua_(); if (!ss) { ktBao_('Chưa kết nối Bảng kết quả.'); return; }
  const raw = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(KT_RAW);
  if (!raw || raw.getLastRow() < 2) { ktBao_('Chưa có bài nộp.'); return; }
  const v = raw.getRange(2, 1, raw.getLastRow() - 1, 5).getValues(), dem = {};
  v.forEach(r => { const k = String(r[3]), info = KT_INFO[k]; if (!info) return; const kq = ktGhiDiemTX2_(ss, info, String(r[1]), Math.round(Number(r[4]) * 10) / 10);
    const key = kq.indexOf('đã ghi') === 0 ? 'Đã ghi' : kq.indexOf(' đã có điểm') > 0 ? 'Ô đã có điểm (giữ nguyên)' : 'Không ghi được'; dem[key] = (dem[key] || 0) + 1; });
  ktBao_('Chuyển điểm bài kiểm tra: ' + Object.keys(dem).map(k => k + ': ' + dem[k]).join(' · '));
}

/* 🧪 CÔ LÀM THỬ (10/11/2026): mở bài kiểm tra trong hộp thoại của bảng tính, dùng mã thử THU-xx.
 * Làm được cả khi bài đang khoá; KHÔNG ghi vào kết quả, không ghi điểm; nộp xong hiện đúng/sai từng câu. Học sinh không vào được. */
function ktLamThu_(k) {
  const info = KT_INFO[k]; if (!info) { ktBao_('Chưa có đề này trên Đấu trường.'); return; }
  const sid = 'THU-' + String(info.grade).padStart(2, '0'), tk = 'thu' + Utilities.getUuid().replace(/-/g, '');
  CacheService.getScriptCache().put(OFS.TOKEN_PREFIX + tk, sid, 21600);
  const pr = PropertiesService.getScriptProperties(); pr.deleteProperty('KT_NHAP_' + k + '_' + sid);
  pr.setProperty('KT_BD_' + k + '_' + sid, String(Date.now()));
  const h = serveTest_({kt: k, tk: tk}).setWidth(1150).setHeight(780);
  SpreadsheetApp.getUi().showModalDialog(h, '🧪 Cô làm thử — ' + info.ten + ' (không ghi điểm)');
}
function lamThu_tx2_tin6() { ktLamThu_('tx2_tin6'); }
function lamThu_tx2_tin7() { ktLamThu_('tx2_tin7'); }
function lamThu_hk1_tin6() { ktLamThu_('hk1_tin6'); }
function lamThu_hk1_tin7() { ktLamThu_('hk1_tin7'); }
function lamThu_hk1_tin8() { ktLamThu_('hk1_tin8'); }
function lamThu_hk1_tin9() { ktLamThu_('hk1_tin9'); }
function lamThu_tx1k2_tin6() { ktLamThu_('tx1k2_tin6'); }  function lamThu_tx1k2_tin7() { ktLamThu_('tx1k2_tin7'); }
function lamThu_tx2k2_tin6() { ktLamThu_('tx2k2_tin6'); }  function lamThu_tx2k2_tin7() { ktLamThu_('tx2k2_tin7'); }
function lamThu_gk2_tin6() { ktLamThu_('gk2_tin6'); }  function lamThu_gk2_tin7() { ktLamThu_('gk2_tin7'); }
function lamThu_hk2_tin6() { ktLamThu_('hk2_tin6'); }  function lamThu_hk2_tin7() { ktLamThu_('hk2_tin7'); }
function lamThu_tx1_tin6() { ktLamThu_('tx1_tin6'); }  function lamThu_tx1_tin7() { ktLamThu_('tx1_tin7'); }
function lamThu_gk1_tin6() { ktLamThu_('gk1_tin6'); }  function lamThu_gk1_tin7() { ktLamThu_('gk1_tin7'); }
