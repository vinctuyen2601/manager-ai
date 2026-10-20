import fs from "fs";
const R = "D:/my project/shop-christmasspin/";
const sp = JSON.parse(fs.readFileSync(R + "templates/product.santa-spins.json", "utf8").replace(/^\uFEFF?\s*\/\*[\s\S]*?\*\//, ""));
const sec = JSON.parse(JSON.stringify(sp.sections.danhgia.settings));
sec["padding-block-start"] = 40; sec["padding-block-end"] = 64;
const html = `{%- comment -%}
  Trang huong dan Memory Orb — Page handle \`orb-setup\`, gan template
  \`orb-setup\`. Trang san pham link toi /pages/orb-setup o ba cho (hang gap,
  ba buoc, hoi dap).

  VI SAO CO: Orb chi chay video DUNG 480x480. Video dien thoai la doc 9:16,
  nen khach nao cung phai cat + doi co mot lan. De khach tu phat hien sau khi
  mo hop thi thanh tin nhan hoi va hoan tien (ho so SAN-PHAM-2-MEMORY-ORB.md
  muc 2). Trang nay giai quyet truoc khi mua va sau khi nhan hang.

  Anh minh hoa moi buoc: tep 'memory-orb-guide-1/2/3' (.jpg/.png/.webp) trong
  Content > Files — co thi hien, chua co thi bo qua (snippet orb-anh-buoc).

  CSS o assets/custom.css muc "TRANG HUONG DAN MEMORY GLOBE".
{%- endcomment -%}
<div class="hd">
  <p class="hd__eb">Santa&rsquo;s Memory Globe&trade; setup guide</p>
  <h1 class="hd__h">Put your video on the globe in four steps.</h1>
  <p class="hd__than">Allow about fifteen minutes the first time. Do it before you wrap it, and the person you give it to only has to switch it on.</p>

  <div class="hd__can">
    <strong>You will need</strong>
    <ul>
      <li>Your Santa&rsquo;s Memory Globe&trade; and <strong>the cable from its box</strong> (many phone cables only charge and cannot transfer files)</li>
      <li>A laptop or desktop computer, Windows or Mac</li>
      <li>The video you want to use, copied from your phone to the computer. <strong>Under a minute</strong> plays best.</li>
    </ul>
  </div>

  <ol class="hd__ds">
    <li class="hd__buoc">
      <span class="hd__so">1</span>
      <div>
        {%- render 'orb-anh-buoc', ten: 'memory-orb-guide-1' -%}
        <h2>Charge it fully</h2>
        <p>Plug the globe in and let it charge all the way before you try to load anything. With a low battery it may not let you copy files.</p>
      </div>
    </li>
    <li class="hd__buoc">
      <span class="hd__so">2</span>
      <div>
        {%- render 'orb-anh-buoc', ten: 'memory-orb-guide-2' -%}
        <h2>Convert the video: MP4, 480 &times; 480</h2>
        <p>The globe plays <strong>square MP4 video at 480 &times; 480 pixels</strong>. Phone videos are taller than that, so convert the clip once. Any of these free tools works:</p>
        <ul>
          <li><strong>CapCut</strong> or <strong>Clipchamp</strong>: set the canvas to <strong>1:1</strong>, place your clip, export at <strong>480p</strong> as MP4.</li>
          <li><a href="https://ezgif.com/crop-video" target="_blank" rel="noopener">ezgif.com</a> in your browser: <strong>Crop video</strong> to a square, then <strong>Resize video</strong> to width 480, height 480, and save as MP4.</li>
        </ul>
        <p class="hd__meo"><strong>Tip:</strong> the screen is round, so the corners of the square will not show. Leave a little space around faces and keep them near the centre.</p>
      </div>
    </li>
    <li class="hd__buoc">
      <span class="hd__so">3</span>
      <div>
        {%- render 'orb-anh-buoc', ten: 'memory-orb-guide-3' -%}
        <h2>Plug the globe into your computer</h2>
        <p>Use the cable from the box and switch the globe on. Give it a moment: it shows up as a drive, like a USB stick, with a folder for videos.</p>
      </div>
    </li>
    <li class="hd__buoc">
      <span class="hd__so">4</span>
      <div>
        <h2>Drag the video into its video folder</h2>
        <p>Copy your MP4 into the <strong>existing video folder</strong>. Do not create new folders on the globe. Wait for the copy to finish, then eject the drive before you unplug.</p>
        <p class="hd__meo"><strong>Using a Mac?</strong> macOS quietly adds hidden files to every drive, and they stop the globe playing. Before you eject, open <strong>Terminal</strong> and type <code>dot_clean /Volumes/</code> followed by the globe&rsquo;s drive name, then press Return. Or, in Finder, press <strong>Cmd + Shift + .</strong> to show hidden items and delete anything on the globe whose name starts with a dot.</p>
      </div>
    </li>
  </ol>

  <div class="hd__loi">
    <h2>Good to know</h2>
    <dl>
      <dt>One clip at a time</dt>
      <dd>You can keep several clips on the globe. It plays one at a time; press the button to move to the next. It does not shuffle through them on its own.</dd>
    </dl>
    <h2>Something not working?</h2>
    <dl>
      <dt>The video does not play</dt>
      <dd>Check the file is exactly 480 &times; 480 and saved as MP4. If it still will not play, convert it again with the free app <strong>HandBrake</strong>: H.264 video, 480 &times; 480, MP3 audio at 128 kbps, the format given in the globe&rsquo;s manual. On a Mac, also do the hidden-file clean-up in step 4.</dd>
      <dt>The picture freezes but the sound keeps going</dt>
      <dd>The clip is too long or too large. Trim it to under a minute, or split a longer video into one-minute parts.</dd>
      <dt>The picture looks squashed</dt>
      <dd>The clip was resized without cropping first. Crop it to a square, then resize.</dd>
      <dt>The computer does not see the globe, or only charges it</dt>
      <dd>Use the cable from the box, make sure the globe is charged and switched on, then try another USB port.</dd>
    </dl>
    <p>Still stuck? <a href="{{ pages['contact'].url | default: '/pages/contact' }}">Contact us</a> and a real person will help, usually within a day.</p>
  </div>
</div>`;
const t = {
  sections: {
    main: {
      type: "_blocks",
      blocks: { noi_dung: { type: "custom-liquid", settings: { custom_liquid: html } } },
      block_order: ["noi_dung"],
      settings: sec,
    },
  },
  order: ["main"],
};
fs.writeFileSync(R + "templates/page.orb-setup.json", JSON.stringify(t, null, 2) + "\n");
console.log("ok", html.length);
