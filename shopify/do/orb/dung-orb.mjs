// Dung templates/product.memory-orb.json tu product.santa-spins.json.
// Giu nguyen bo cuc + style (cung id section -> cung CSS), thay toan bo chu.
import fs from "fs";
const R = "D:/my project/shop-christmasspin/";
const src = fs.readFileSync(R + "templates/product.santa-spins.json", "utf8").replace(/^\uFEFF?\s*\/\*[\s\S]*?\*\//, "");
const d = JSON.parse(src);
const S = d.sections;

const xoa = (bs, ord, id) => { delete bs[id]; const i = ord.indexOf(id); if (i >= 0) ord.splice(i, 1); };
const chu = (b, html) => { b.settings.text = html; };

// ---------- main ----------
const det = S.main.blocks["product-details"];
const B = det.blocks, O = det.block_order;
// Chu shop 20/10: "lam template giong het nhu ben santa" -> GIU du bo khoi.
// Dem nguoc (daily) + thanh ton kho + ghi chu ton kho: co che chu shop da chon
// cho Santa, giu nguyen. Bang chung xa hoi + mini review + slider review la SO
// LIEU / LOI KHACH cua rieng Santa — Orb chua co don nao, chu shop se tu tim va
// import danh gia (SAN-PHAM-2 muc 3). Nen giu KHOI nhung TAT ("disabled") va
// de trong noi dung: bat len trong trinh soan khi co so that.
B.social_proof.disabled = true;
chu(B.social_proof.blocks.sp_stars, "<p><em>★★★★★</em> <strong>(4.8/5) Loved by ___ Customers</strong></p>");
chu(B.social_proof.blocks.sp_week, "<p><strong>___ Bought This Week</strong></p>");
B.mini_reviews.disabled = true;
for (const k of ["q1","n1","a1","q2","n2","a2","q3","n3","a3"]) B.mini_reviews.settings[k] = "";
for (const i of [1, 2, 3]) B.mini_reviews.settings["a" + i + "_ten"] = "memory-orb-avatar-" + i;

// Doi chieu 415 danh gia that cua listing nguon (21/10/2026): qua cau NANG,
// nhieu nguoi noi khong treo duoc cay thong — hop co KEM DE. Nen khong hua
// "Made to Hang on the Tree"; noi ca hai cach trung bay.
chu(B.benefits, "<p><strong>🎥 Plays Your Own Video, With Sound</strong><br><strong>🎄 Display Stand Included</strong><br><strong>🔋 USB-C Rechargeable</strong></p>");

// Chi ban mau White (chu shop 21/10/2026): tat khoi chon mau, khoi chon goi
// luon lay bien the White ke ca khi Black con trong Admin.
B.variant_picker.disabled = true;

Object.assign(B.bundle.settings, {
  mau_mac_dinh: "White",
  so_goi: 2,
  heading: "BUNDLE & SAVE",
  // 59.99 / 94.99 = 36,8% ; 108 / 189.98 = 43,2% — lam tron XUONG (chu shop dong y 15/10)
  label1: "36% OFF", badge1: "",
  label2: "43% OFF", badge2: "BEST VALUE",
  label3: "", badge3: "",
  // $11.98 / (2 x $59.99) = 9.985% -> Buy 2 = $108.00, khop giam gia tu dong trong Admin
  giam2_pt: 9.985, giam3_pt: 0,
  qua1: "Step-by-step setup guide", qua1_anh: "shopify://shop_images/us2-qua-bi-an.png", qua1_nhan: false,
  qua2: "", qua2_anh: "", qua2_nhan: false,
  qua3: "FREE Shipping", qua3_nhan: false,
  gifts: "",
  extra: "", extra_ten: "", extra_anh: "", extra_badge: "", extra_note: "", extra_heading: "",
  show_stock: true,
});

const H = B.hopgap.blocks;
H.h1.settings.heading = "🎁  What's in the Box";
chu(H.h1.blocks.h1t, "<ul><li>1 × <strong>Santa&rsquo;s Memory Globe™</strong> in White</li><li>Display stand</li><li>USB-C charging and transfer cable</li><li>Link to our <strong>step-by-step setup guide</strong></li></ul>");
H.h2.settings.heading = "🎥  How Do I Add My Video?";
chu(H.h2.blocks.h2t, "<p>Four steps on any laptop or desktop:</p><ol><li><strong>Charge it fully</strong> first.</li><li><strong>Convert the clip</strong>: MP4, square, 480 × 480 pixels, under a minute long. Free tools do it in a few minutes.</li><li><strong>Plug the globe in</strong> with the cable from the box and switch it on.</li><li><strong>Drag the video</strong> into the globe's video folder, then eject.</li></ol><p>Our <a href=\"/pages/orb-setup\" title=\"Memory Globe setup guide\">setup guide</a> shows every click, including the one extra step Mac users need.</p>");
H.h3.settings.heading = "🛡️  Our Guarantee";
chu(H.h3.blocks.h3t, "<p>We stand behind every order.</p><p>If your globe arrives damaged or faulty, contact us within <strong>30 days</strong> and we will make it right.</p><p>Return shipping on a change of mind is covered by the customer, but if anything arrives broken we send a <strong>free replacement</strong> at no cost.</p><p>Christmas orders placed from 1 November have their return window extended to <strong>31 January</strong>.</p>");
H.h4.settings.heading = "📦  Shipping & Delivery";
chu(H.h4.blocks.h4t, "<p>Your order is prepared and handed to our carrier within <strong>2–3 business days</strong>.</p><p>Delivery typically takes <strong>8–15 business days</strong> depending on your location. Occasional delays can happen, especially during busy periods.</p><p><strong>Order by 1 December</strong> for Christmas delivery.</p>");

// ---------- qua: khoi "mon qua" ----------
const qua = S.qua.blocks.noi_dung.settings;
qua.custom_liquid = `{%- comment -%}
  Khoi gioi thieu Memory Orb — cung khung HTML/CSS voi khoi "Some gifts get
  opened" cua Santa Spins (assets/custom.css muc .qua), chu viet moi.
  Anh: tep 'memory-orb-intro' (.jpg/.png/.webp) trong Content > Files neu co, khong
  thi anh dai dien san pham. images[...] tra rong khi chua co tep nen dat
  san ten khong lam vo trang. Ca hai deu khong co thi bo khung anh.
{%- endcomment -%}
{%- liquid
  assign anh_qua = blank
  assign duoi_anh = '.jpg,.jpeg,.png,.webp' | split: ','
  for duoi in duoi_anh
    assign ten_tep = 'memory-orb-intro' | append: duoi
    assign anh_qua = images[ten_tep]
    if anh_qua != blank
      break
    endif
  endfor
  if anh_qua == blank
    assign anh_qua = product.featured_image
  endif
-%}
<div class="qua">
  {%- if anh_qua != blank -%}
  <div class="qua__anh">
    {{ anh_qua | image_url: width: 800 | image_tag: widths: '400, 800', sizes: '(min-width: 420px) 380px, 100vw', alt: 'Memory Globe playing a family video', loading: 'lazy' }}
  </div>
  {%- endif -%}

  <p class="qua__eb">A memory that moves</p>

  <h2 class="qua__h">
    A photo shows the moment.
    <em>This one plays it again.</em>
  </h2>

  <p class="qua__than">
    Their first steps, a wedding dance, a grandparent laughing at the table
    &mdash; load the clip onto the globe and set it where the whole family will
    see it, every Christmas from now on.
  </p>

  <div class="qua__gach">
    {%- assign dong = 'Your own video and sound, not a stock picture|Display stand included &mdash; on a shelf or by the tree|Charges over USB-C, no batteries to buy' | split: '|' -%}
    {%- for d in dong -%}
      <div class="qua__mot">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.12"></circle>
          <path d="M5.5 9.2L7.8 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <span>{{ d }}</span>
      </div>
    {%- endfor -%}
  </div>
</div>`;

// ---------- hua: cam ket 30 ngay ----------
const hua = S.hua.blocks.noi_dung.settings;
hua.custom_liquid = hua.custom_liquid
  .replace(/the risk off your side:[\s\S]*?within 30 days\./, "the risk off your side: if it\n        isn&rsquo;t right, you get your money back within 30 days.")
  .replace("tracked to your door, no minimum spend.", "no minimum spend.");
if (!hua.custom_liquid.includes("if it\n        isn&rsquo;t right")) throw new Error("hua: khong thay doan than");
if (hua.custom_liquid.includes("tracked")) throw new Error("hua: con chu tracked");

// ---------- buoc: cach dung ----------
const bu = S.buoc.blocks, buo = S.buoc.block_order;
// Chua co video Orb: TAT khoi video, de trong o video (o video tro tep khong ton tai thi Shopify
// tu choi CA template — da dinh 15/10). Co video thi them lai trong trinh soan.
bu.vid.disabled = true;
// Bo HAN o video (khong de ""): Shopify tu xoa o rong khi luu, de "" thi soLive
// lan nao cung bao KHAC gia. Co video thi them: shopify://files/videos/memory-orb-how-it-works.mp4
delete bu.vid.settings.video;
Object.assign(bu.vid.settings, { nguon_nho: "", alt: "Santa's Memory Globe playing a family video" });
chu(bu.eb1, "<p>HOW IT WORKS</p>");
chu(bu.h1, "<h2>Your video. In a glowing globe.</h2>");
// KHONG noi "loops": nhieu danh gia that bao video tu nap KHONG tu lap nhu video mau.
chu(bu.p1, "<p>A 2.7-inch round screen inside the globe plays the clip you choose, with sound. No Wi-Fi, no account.</p>");
chu(bu.eb2, "<p>THREE STEPS · ANY LAPTOP</p>");
chu(bu.h2, "<h2>Pick a clip. Make it square. Drag it on.</h2>");
const st = bu.row.blocks;
const buoc = [
  ["PICK A CLIP", "Choose the moment", "Any short video from your phone. Keep it under a minute: shorter clips play smoothest."],
  ["MAKE IT SQUARE", "Convert to 480 × 480", "The globe plays square MP4 video at 480 × 480 pixels. Free tools like CapCut or Clipchamp do it in a few minutes, and our setup guide shows every click."],
  ["DRAG IT ON", "Plug in, drop it in", "Charge the globe, connect it with the cable from the box and drag the video into its video folder. Eject, unplug, done."],
];
buoc.forEach(([l, t, p], i) => {
  const g = st["s" + (i + 1)].blocks, k = "s" + (i + 1);
  st[k].name = t;
  chu(g[k + "l"], `<p>${l}</p>`);
  chu(g[k + "t"], `<p><strong>${t}</strong></p>`);
  chu(g[k + "p"], `<p>${p}</p>`);
});
// Link toi trang huong dan, ngay duoi ba buoc
bu.link = JSON.parse(JSON.stringify(bu.p1));
chu(bu.link, "<p><a href=\"/pages/orb-setup\" title=\"Memory Globe setup guide\"><strong>Read the full setup guide →</strong></a></p>");
buo.push("link");

// ---------- hoidap ----------
const ac = S.hoidap.blocks.ac.blocks;
const hoi = [
  ["What format does my video need to be?", "<p><strong>MP4, square, 480 × 480 pixels.</strong> Phone videos are taller than that, so you convert the clip once before copying it across. Free tools such as CapCut or Clipchamp do it, and our <a href=\"/pages/orb-setup\" title=\"Memory Globe setup guide\">setup guide</a> walks you through it. Keep clips under a minute: long videos can stutter.</p>"],
  ["Do I need an app or Wi-Fi?", "<p><strong>No Wi-Fi and no account.</strong> You copy the video from a computer with the cable from the box, the same way you would copy a file to a USB stick. The only software you need is a video converter, and free ones work.</p>"],
  ["Do I need a computer?", "<p><strong>Yes</strong>, a laptop or desktop, Windows or Mac. It does not connect to a phone. On a Mac there is one extra clean-up step, covered in the setup guide.</p>"],
  ["Can it play more than one video?", "<p>It has <strong>4GB</strong> of storage, so you can keep several clips on it. It plays <strong>one clip at a time</strong>: press the button to move to the next. It does not shuffle through them on its own.</p>"],
  ["Can I change the video later?", "<p><strong>Yes.</strong> Plug it in again and replace the file whenever you like. Next Christmas can bring a new memory.</p>"],
  ["How is it charged?", "<p>Over <strong>USB-C</strong>. Charge it fully before you connect it to load a video, and use the cable from the box: some phone cables only charge and will not transfer files.</p>"],
  ["Can I hang it on the tree?", "<p>The globe weighs about <strong>350 g</strong>, more than a normal bauble, so it needs a strong branch near the trunk. Most people use the <strong>display stand</strong> that comes in the box and set it on a shelf or mantel by the tree.</p>"],
  ["How much is shipping, and how long does it take?", "<p>Shipping is free worldwide. Orders take 8 to 15 business days to arrive. Order by 1 December to be sure it lands before Christmas.</p>"],
  ["Is it a good gift for someone who is not tech-savvy?", "<p><strong>Yes, if you load it for them.</strong> Converting the video takes a little computer work, so do it before you wrap it. They just switch it on and watch.</p>"],
  ["What if they do not like it?", "<p>Full 30-day money-back guarantee, extended to 31 January for Christmas orders. Contact us and we will sort it within a day.</p>"],
];
hoi.forEach(([q, a], i) => {
  const r = ac["q" + (i + 1)];
  r.settings.heading = q;
  chu(r.blocks["q" + (i + 1) + "t"], a);
});

// ---------- sosanh ----------
chu(S.sosanh.blocks.h, "<h2>Why not just frame a photo?</h2>");
Object.assign(S.sosanh.blocks.tb.settings, {
  col1: "MEMORY GLOBE",
  col2: "DIGITAL FRAME",
  col3: "PRINTED PHOTO",
  rows: [
    "Plays a moving memory | 1 | 1 | 0",
    "No Wi-Fi or account | 1 | 0 | 1",
    "Plays with sound | 1 | 0 | 0",
    "Swap the memory any time | 1 | 1 | 0",
    "Rechargeable, no cable on show | 1 | 0 | 1",
    "Brought out every Christmas | 1 | 0 | 0",
  ].join("\n"),
});

// ---------- bo review mau Santa ----------
S.loi.disabled = true;
S.loi.settings.heading = "Loved by families this Christmas.";
S.loi.settings.sub = "Real moments, glowing on real trees.";
Object.values(S.loi.blocks).forEach((r, i) => { r.settings.trich = ""; r.settings.ten = ""; r.settings.anh = ""; r.settings.anh_ten = "memory-orb-review-" + (i + 1); });

const hdr = "/*\n * Memory Orb — dung tu product.santa-spins.json bang scratchpad/dung-orb.mjs (20/10/2026).\n */\n";
fs.writeFileSync(R + "templates/product.memory-orb.json", hdr + JSON.stringify(d, null, 2) + "\n");
console.log("order", d.order, "main", O);
const all = JSON.stringify(d);
for (const w of ["Santa", "disc", "Disc", "fridge", "carol", "tracked"]) if (all.includes(w)) console.log("CON CHU:", w, all.split(w).length - 1);
