const fs = require('fs');
const data = require('./prefill_data.json');
const jsonStr = JSON.stringify(data);

// Read existing script.js
let script = fs.readFileSync('script.js', 'utf8');

// 1. Add KANTINKU_PREFILL constant right after "use strict";
const konstanta = `\n/* =========================================================
   DATA KANTINKU NABILA RIZKY — AUTO PREFILL
   ========================================================= */
const KANTINKU_PREFILL = ${jsonStr};

`;
script = script.replace('"use strict";', '"use strict";' + konstanta);

// 2. Patch loadAllFormData to auto-apply prefill when no data in storage
const oldCheck = 'if(d){ applyData(d); renderAll(); updateStorageMeter(); return; }';
const newCheck = 'if(d && d.judulProyek){ applyData(d); renderAll(); updateStorageMeter(); return; }';

if (script.includes(oldCheck)) {
  script = script.replace(oldCheck, newCheck);
  console.log('IDB check patched OK');
} else {
  console.log('WARNING: IDB check not found');
}

// 3. After "renderAll(); updateStorageMeter();" in the then() catch fallback, inject auto-prefill
// We patch the then() fallback where there's no saved data
const oldFallback = '    renderAll(); updateStorageMeter();\n  }).catch(()=>{';
const newFallback = `    // Auto-prefill KantinKu jika tidak ada data sebelumnya
    applyData(KANTINKU_PREFILL);
    renderAll();
    idbSet("main", collectFormData()).catch(()=>{});
    updateStorageMeter();
  }).catch(()=>{`;

script = script.replace(oldFallback, newFallback);

// 4. Also patch the catch block's fallback
const oldCatchFallback = '    if(raw){ try{ applyData(JSON.parse(raw)); }catch(e){ console.warn(e); } }\n    renderAll(); updateStorageMeter();\n  });\n}';
const newCatchFallback = `    if(raw){ try{ const parsed=JSON.parse(raw); if(parsed.judulProyek){ applyData(parsed); renderAll(); updateStorageMeter(); return; } }catch(e){ console.warn(e); } }
    applyData(KANTINKU_PREFILL);
    renderAll();
    updateStorageMeter();
  });
}`;

if (script.includes(oldCatchFallback)) {
  script = script.replace(oldCatchFallback, newCatchFallback);
  console.log('catch fallback patched OK');
} else {
  console.log('WARNING: catch fallback not found, applying simple end patch...');
}

fs.writeFileSync('script.js', script, 'utf8');
console.log('script.js updated, size:', fs.statSync('script.js').size, 'bytes');
