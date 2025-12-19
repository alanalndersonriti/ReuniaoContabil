// --- ESTADO GLOBAL ---
const allSteps = ['step-geral', 'step-part', 'step-conv', 'step-medias', 'step-relat', 'step-contabil', 'step-rbt12', 'step-perfil2', 'step-metas', 'step-dificuldades', 'step-patrimonio', 'step-honorarios', 'step-perfil', 'step-tecnica', 'step-modulos'];

function updateAll() {
    setText('viewCodigo', 'inputCodigo'); setText('viewRazao', 'inputRazao');
    setHTML('viewTecnicos', 'inputTecnicos'); setHTML('viewFolha', 'inputFolha'); setHTML('viewEscrita', 'inputEscrita'); setHTML('viewContabil', 'inputContabil');

    // LÓGICA DE CONVERSÃO CORRIGIDA
    const valConv = document.getElementById('selTipoConversao').value;
    const isNoConv = (valConv === "" || valConv.includes('Não haverá'));

    if(isNoConv) {
        hide('grupoCamposConversao');
        hide('wrapperConversao'); hide('sectionMedias'); hide('sectionRelatorios'); hide('sectionContabil'); hide('sectionRbt12'); hide('sectionMetas');
        hide('btn-medias'); hide('btn-relat'); hide('btn-contabil'); hide('btn-rbt12'); hide('btn-metas');
        
        const active = document.querySelector('.tab-section.active');
        if (active && ['tab-medias','tab-relat','tab-contabil','tab-rbt12','tab-metas'].includes(active.id)) openTab('tab-conv');
    } else {
        show('grupoCamposConversao');
        show('wrapperConversao'); show('sectionMetas');
        show('btn-medias'); show('btn-relat'); show('btn-contabil'); show('btn-rbt12'); show('btn-metas');
        logicConversao(); logicMedias(); logicRelatorios(); logicContabil(); logicRbt12(); logicMetas();
    }

    logicPerfil2(); logicDificuldades(); logicPatrimonio(); logicHonorarios(); logicPerfil(); logicTecnica(); logicModulos();
}

function logicConversao() {
    setText('viewTipoConversao', 'selTipoConversao');
    setDate('viewDataColeta', 'inputDataColeta'); setDate('viewDataPlanilha', 'inputDataPlanilha'); setDate('viewDataRetorno', 'inputDataRetorno'); setDate('viewPrazo', 'inputPrazo');
    const obs = document.getElementById('inputObsConversao').value;
    if(obs) { show('viewObsContainer'); document.getElementById('viewObsConversao').innerHTML=formatText(obs); } else hide('viewObsContainer');
    show('viewDicasConversao'); // Mostra os balões se houver conversão
}
function logicMedias() {
    const val = document.getElementById('selPermiteMedias').value;
    if(val === "") { hide('sectionMedias'); return; } show('sectionMedias');
    document.getElementById('viewPermiteMedias').textContent=val;
    if(val === 'SIM') show('textPadraoMedias'); else hide('textPadraoMedias');
    const lbl = document.getElementById('lblObsMedias');
    if(val === 'NÃO') { lbl.innerText='Detalhe (Obrigatório):'; lbl.style.color='#e11d48'; } else { lbl.innerText='Detalhes:'; lbl.style.color='#64748b'; }
    const obs = document.getElementById('inputObsMedias').value;
    if(obs) { show('viewObsMediasContainer'); document.getElementById('viewObsMedias').innerHTML=formatText(obs); } else hide('viewObsMediasContainer');
}
function logicRelatorios() {
    const val = document.getElementById('selRelatorios').value;
    if(val === "") { hide('sectionRelatorios'); return; } show('sectionRelatorios');
    document.getElementById('viewRelatorios').textContent=val;
    if(val === 'SIM') { show('camposRelatoriosSim'); show('viewDetalhesRelatorios'); setDate('viewMetaRelatorios','inputMetaRelatorios'); setText('viewRespRelatorios','inputRespRelatorios'); } 
    else { hide('camposRelatoriosSim'); hide('viewDetalhesRelatorios'); }
    const obs=document.getElementById('inputObsRelatorios').value;
    if(obs){ show('viewObsRelatoriosContainer'); document.getElementById('viewObsRelatorios').innerHTML=formatText(obs); } else hide('viewObsRelatoriosContainer');
}
function logicContabil() {
    const plano = document.getElementById('selPlanoContas').value;
    const saldos = document.getElementById('selSaldosAnteriores').value;
    if(plano===""){ hide('sectionContabil'); return; } show('sectionContabil');
    document.getElementById('viewPlanoContas').textContent=plano;
    document.getElementById('viewSaldos').textContent=saldos||'-';
    if(plano.includes('software anterior')) { show('grupoTrazerPlano'); show('viewRowTrazerPlano'); setText('viewTrazerPlano','selTrazerPlano'); } else { hide('grupoTrazerPlano'); hide('viewRowTrazerPlano'); }
    if(saldos.includes('importação')) { show('grupoMetodoImportacao'); show('viewRowMetodoImport'); setText('viewMetodoImportacao','selMetodoImportacao'); } else { hide('grupoMetodoImportacao'); hide('viewRowMetodoImport'); }
    if(plano.includes('padrão Dominio') && saldos.includes('importação')) { show('alertaDePara'); show('viewAlertaDePara'); } else { hide('alertaDePara'); hide('viewAlertaDePara'); }
    const obs=document.getElementById('inputObsContabil').value;
    if(obs){ show('viewObsContabilContainer'); document.getElementById('viewObsContabil').innerHTML=formatText(obs); } else hide('viewObsContabilContainer');
}
function logicRbt12() {
    const val=document.getElementById('selRbt12Inclusao').value;
    if(val===""){ hide('sectionRbt12'); return; } show('sectionRbt12');
    document.getElementById('viewRbt12Inclusao').textContent=val;
    if(!val.includes('individual')){ show('camposRbt12Extras'); show('viewRbt12Detalhes'); setDate('viewMetaRbt12','inputMetaRbt12'); setText('viewRespRbt12','inputRespRbt12');
        if(val.includes('PDF')) show('viewRbt12PdfObs'); else hide('viewRbt12PdfObs');
        if(val.includes('excel')) show('viewRbt12ExcelLink'); else hide('viewRbt12ExcelLink');
    } else { hide('camposRbt12Extras'); hide('viewRbt12Detalhes'); hide('viewRbt12PdfObs'); hide('viewRbt12ExcelLink'); }
}
function logicPatrimonio() {
    const val=document.getElementById('selPossuiPatrimonio').value;
    if(val!=='SIM'){ hide('sectionPatrimonio'); hide('grupoPatrimonioDetalhes'); return; } show('sectionPatrimonio'); show('grupoPatrimonioDetalhes');
    document.getElementById('viewPossuiPatr').textContent=val;
    const c=document.getElementById('selControleBens').value;
    document.getElementById('viewControleBens').textContent=c;
    if(c!=="") show('viewRowBens'); else hide('viewRowBens');
    if(c==='SIM') show('viewInfoPatr'); else hide('viewInfoPatr');
    const obs=document.getElementById('inputObsPatrimonio').value;
    if(obs){ show('viewObsPatrContainer'); document.getElementById('viewObsPatr').innerHTML=formatText(obs); } else hide('viewObsPatrContainer');
}
function logicHonorarios() {
    const val=document.getElementById('selPossuiHonorarios').value;
    if(val!=='SIM'){ hide('sectionHonorarios'); hide('camposHonorarios'); return; } show('sectionHonorarios'); show('camposHonorarios');
    document.getElementById('viewPossuiHonor').textContent=val; show('viewDetalhesHonor');
    const bol=document.getElementById('selBoletos').value; document.getElementById('viewBoletos').textContent=bol;
    if(bol==='SIM'){ show('grupoBanco'); show('viewRowBanco'); setText('viewBanco','inputBanco'); } else { hide('grupoBanco'); hide('viewRowBanco'); }
    setText('viewNFS','selNFS'); setText('viewRespHonor','inputRespHonorarios');
    const obs=document.getElementById('inputObsHonorarios').value;
    if(obs){ show('viewObsHonorContainer'); document.getElementById('viewObsHonor').innerHTML=formatText(obs); } else hide('viewObsHonorContainer');
}
function logicPerfil2() {
    const fmt=(s,i)=>{const v=document.getElementById(s).value;const t=document.getElementById(i).value;return(v==='SIM'&&t)?`SIM - ${t}`:v;};
    const tgl=(s,d)=>{const v=document.getElementById(s).value;if(v==='SIM')show(d);else hide(d);};
    tgl('selUserDominio','divUserDominio'); tgl('selCaptura','divCaptura'); tgl('selAuditoria','divAuditoria'); tgl('selOutrosSoft','divOutrosSoft');
    document.getElementById('viewUserDominio').textContent=fmt('selUserDominio','inputUserDominio');
    document.getElementById('viewCaptura').textContent=fmt('selCaptura','inputCaptura');
    document.getElementById('viewAuditoria').textContent=fmt('selAuditoria','inputAuditoria');
    document.getElementById('viewOutrosSoft').textContent=fmt('selOutrosSoft','inputOutrosSoft');
    const erp=document.getElementById('inputErpApi').value; if(erp){show('viewErpApiContainer');document.getElementById('viewErpApi').innerHTML=formatText(erp);}else hide('viewErpApiContainer');
    const obs=document.getElementById('inputObsPerfil2').value; if(obs){show('viewObsPerfil2Container');document.getElementById('viewObsPerfil2').innerHTML=formatText(obs);}else hide('viewObsPerfil2Container');
}
function logicTecnica() {
    const val=document.getElementById('selTipoServidor').value;
    if(val===""){ hide('sectionTecnica'); return; } show('sectionTecnica');
    document.getElementById('viewTipoServidor').textContent=val;
    hide('infoWindows'); hide('infoLinux'); hide('groupDominioWeb'); hide('viewInfoWindows'); hide('viewInfoLinux'); hide('viewInfoDW'); hide('viewDominioWebDetails');
    if(val==='WINDOWS'){ show('infoWindows'); show('viewInfoWindows'); }
    else if(val==='LINUX'){ show('infoLinux'); show('viewInfoLinux'); }
    else if(val==='DOMINIO WEB'){ show('groupDominioWeb'); show('viewInfoDW'); show('viewDominioWebDetails'); setText('viewProvedor','inputProvedor'); setText('viewVelocidade','inputVelocidade'); }
}
function logicDificuldades() {
    const d1=document.getElementById('inputDifFolha').value, d2=document.getElementById('inputDifEscrita').value, d3=document.getElementById('inputDifContabil').value;
    let has=false;
    if(d1){has=true;show('viewDifFolha');document.querySelector('#viewDifFolha .diff-content').innerHTML=formatText(d1);}else hide('viewDifFolha');
    if(d2){has=true;show('viewDifEscrita');document.querySelector('#viewDifEscrita .diff-content').innerHTML=formatText(d2);}else hide('viewDifEscrita');
    if(d3){has=true;show('viewDifContabil');document.querySelector('#viewDifContabil .diff-content').innerHTML=formatText(d3);}else hide('viewDifContabil');
    if(has)show('sectionDificuldades');else hide('sectionDificuldades');
}
function logicPerfil() {
    let html='';
    const items = [ {id:'perf_simples', l:'Simples Nacional'}, {id:'perf_presumido', l:'Lucro Presumido'}, {id:'perf_real', l:'Lucro Real'}, {id:'perf_professor', l:'Cálculo Folha Professor'}, {id:'perf_civil', l:'Construção Civil'}, {id:'perf_imob', l:'Empreendimento Imob.'}, {id:'perf_veiculos', l:'Revenda Veículos'}, {id:'perf_farmacia', l:'Farmácia'}, {id:'perf_posto', l:'Posto Combustível'}, {id:'perf_filiais', l:'Matriz / Filiais'}, {id:'perf_super', l:'Supermercado'}, {id:'perf_mei', l:'MEI'}, {id:'perf_rural', l:'Produtor Rural'} ];
    items.forEach(i=>{ const v=document.getElementById(i.id).value; if(v!==''){ html+=`<li class="profile-item"><span class="profile-label">${i.l}:</span><span class="profile-val ${v==='SIM'?'val-sim':'val-nao'}">${v}</span></li>`; } });
    document.getElementById('listPerfil').innerHTML=html;
    const obs=document.getElementById('inputObsPerfil').value;
    if(obs){show('viewObsPerfilContainer');document.getElementById('viewObsPerfil').innerHTML=formatText(obs);}else hide('viewObsPerfilContainer');
}
function logicModulos() {
    let tm=0; let h=''; let vis=false;
    const mods=[{id:'modInstalacao',l:'Instalação/Geral'},{id:'modFolha',l:'Folha'},{id:'modFiscal',l:'Fiscal'},{id:'modContabil',l:'Contábil'},{id:'modHonorarios',l:'Honorários'},{id:'modPatrimonio',l:'Patrimônio'},{id:'modLalur',l:'Lalur'},{id:'modBackup',l:'Backup'},{id:'modBoxe',l:'Box-e'},{id:'modPortal',l:'Portal'}];
    mods.forEach(m=>{
        const ck=document.getElementById('check_'+m.id);
        if(ck && ck.checked){ vis=true; const v=document.getElementById('time_'+m.id).value||'00:00'; h+=`<tr><td>${m.l}</td><td class="col-time">${v}</td></tr>`; const [hr,mn]=v.split(':').map(Number); if(!isNaN(hr)) tm+=(hr*60)+(mn||0); }
    });
    const ts=`${String(Math.floor(tm/60)).padStart(2,'0')}:${String(tm%60).padStart(2,'0')}`;
    document.getElementById('inputTempoTotal').value=ts; document.getElementById('viewTabelaHoras').innerHTML=h; document.getElementById('viewTotalHoras').innerText=ts;
    if(vis)show('sectionModulos');else hide('sectionModulos');
}
// METAS
function getBusinessDays(s,e){ let c=0;const st=new Date(s);const en=new Date(e);if(isNaN(st)||isNaN(en)||st>en)return 0;let cur=new Date(st);while(cur<=en){const d=cur.getDay();if(d!==5&&d!==6)c++;cur.setDate(cur.getDate()+1);}return c;}
function calcRow(p){ const i=document.getElementById(p+'_ini').value; const f=document.getElementById(p+'_fim').value; const e=parseInt(document.getElementById(p+'_emp').value)||0; const d=getBusinessDays(i,f); let di=0; if(d>0&&e>0) di=(e/d).toFixed(1); const sm=(di*5).toFixed(1); document.getElementById(p+'_dias').value=d; document.getElementById(p+'_dia').value=di; document.getElementById(p+'_sem').value=sm; return {days:d, diaria:di, semanal:sm, fim:f}; }
function calcMetas(){ calcRow('folha'); calcRow('fiscal'); calcRow('contabil'); }
function gerarTextoMetas(){ calcMetas(); const f=calcRow('folha'); const fi=calcRow('fiscal'); const c=calcRow('contabil'); let t="Resumo das Metas Estabelecidas:\n\n"; if(f.days>0)t+=`FOLHA: Meta até ${formatDate(f.fim)}, ${f.days} dias úteis. Aprox. ${f.diaria} emp/dia.\n`; if(fi.days>0)t+=`FISCAL: Meta até ${formatDate(fi.fim)}, ${fi.days} dias úteis. Aprox. ${fi.diaria} emp/dia.\n`; if(c.days>0)t+=`CONTÁBIL: Meta até ${formatDate(c.fim)}, ${c.days} dias úteis. Aprox. ${c.diaria} emp/dia.\n`; document.getElementById('txtResumoMetas').value=t; updateAll(); }
function logicMetas(){
    const tab=document.getElementById('chkResumoTabela').checked, desc=document.getElementById('chkResumoDescrito').checked, txt=document.getElementById('txtResumoMetas').value;
    if(desc && txt){ show('viewMetasDescrito'); document.getElementById('txtMetasDescritoPreview').textContent=txt; } else hide('viewMetasDescrito');
    let h=''; const rs=[{n:'Folha',p:'folha'},{n:'Fiscal',p:'fiscal'},{n:'Contábil',p:'contabil'}]; let hasData=false;
    rs.forEach(r=>{ const i=document.getElementById(r.p+'_ini').value; if(i){ hasData=true; h+=`<tr><td>${r.n}</td><td>${formatDate(document.getElementById(r.p+'_ini').value)}</td><td>${formatDate(document.getElementById(r.p+'_fim').value)}</td><td>${document.getElementById(r.p+'_dias').value}</td><td>${document.getElementById(r.p+'_dia').value}</td><td>${document.getElementById(r.p+'_sem').value}</td></tr>`; } });
    document.getElementById('tbodyMetas').innerHTML=h;
    if(tab && hasData) show('viewMetasTabela'); else hide('viewMetasTabela');
}

// --- HELPERS ---
function show(id) { const el=document.getElementById(id); if(el) el.classList.remove('hidden'); }
function hide(id) { const el=document.getElementById(id); if(el) el.classList.add('hidden'); }
function setText(vId, iId) { document.getElementById(vId).textContent = document.getElementById(iId).value || '---'; }
function setHTML(vId, iId) { document.getElementById(vId).innerHTML = formatText(document.getElementById(iId).value); }
function setHTMLContainer(vId, iId, cId) { const v=document.getElementById(iId).value; if(v && v.trim()){ show(cId); document.getElementById(vId).innerHTML=formatText(v); } else hide(cId); }
function setDate(vId, iId) { document.getElementById(vId).textContent = formatDate(document.getElementById(iId).value); }
function formatText(t) { return t ? t.replace(/\n/g, '<br>') : '-'; }
function formatDate(d) { if(!d) return '--/--/----'; const [y,m,dy]=d.split('-'); return `${dy}/${m}/${y}`; }
function openTab(id) { 
    document.querySelectorAll('.tab-section').forEach(t=>t.classList.remove('active')); 
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); 
    document.getElementById(id).classList.add('active'); 
    document.querySelectorAll('.tab-btn').forEach(b=>{ if(b.getAttribute('onclick').includes(id)) b.classList.add('active'); }); 
}
function baixarHTML() {
    const element = document.createElement('a');
    const text = `<html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;font-size:10pt;line-height:1.4;color:#333;}.report-header h1{color:#FF4500;font-size:16pt;margin:0;}.client-box{background:#fff7ed;padding:10px;border:1px solid #ffedd5;margin:20px 0;display:flex;gap:20px;}.client-label{font-size:7pt;color:#9a3412;text-transform:uppercase;font-weight:bold;display:block;}.client-value{font-size:11pt;font-weight:bold;}.section-title{color:#FF4500;font-weight:bold;border-bottom:1px solid #eee;margin-top:20px;padding-bottom:5px;text-transform:uppercase;}.kv-pair{margin-bottom:6px;}.kv-key{font-weight:bold;}.info-text-box{background:#f0f9ff;padding:10px;border-left:4px solid #0ea5e9;font-size:9pt;margin:10px 0;}.alert-box{background:#fef2f2;border-left:4px solid #ef4444;padding:10px;color:#b91c1c;margin:10px 0;}table{width:100%;border-collapse:collapse;font-size:9pt;margin-top:10px;}th{background:#f1f5f9;text-align:left;padding:5px;border:1px solid #ccc;}td{padding:5px;border:1px solid #ccc;}.hidden{display:none;}.val-sim{color:#16a34a;font-weight:bold;}.val-nao{color:#94a3b8;}.profile-list{list-style:none;padding:0;}.profile-item{padding:4px 0;border-bottom:1px dotted #ccc;display:flex;justify-content:space-between;}.timeline-item{display:flex;justify-content:space-between;border-bottom:1px dashed #ccc;padding-bottom:4px;margin-bottom:6px;}.diff-box{border-left:4px solid #f97316;background:#fff7ed;padding:8px;margin-bottom:8px;}.diff-title{font-weight:bold;color:#c2410c;display:block;}</style></head><body>${document.getElementById('a4Content').innerHTML}</body></html>`;
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', (document.getElementById('inputRazao').value || 'Ata') + '.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// INIT
window.onload = function() {
    // Init Modulos
    const c = document.getElementById('listaModulos'); let h='';
    const mods = [ {id:'modInstalacao', l:'Instalação/Geral', d:'02:00'}, {id:'modFolha', l:'Folha', d:'08:00'}, {id:'modFiscal', l:'Fiscal', d:'08:00'}, {id:'modContabil', l:'Contábil', d:'06:00'}, {id:'modHonorarios', l:'Honorários', d:'01:00'}, {id:'modPatrimonio', l:'Patrimônio', d:'02:00'}, {id:'modLalur', l:'Lalur', d:'02:00'}, {id:'modBackup', l:'Backup', d:'01:00'}, {id:'modBoxe', l:'Box-e', d:'01:00'}, {id:'modPortal', l:'Portal', d:'02:00'} ];
    mods.forEach(m => { h += `<div class="module-row"><div class="module-check"><input type="checkbox" id="check_${m.id}" onchange="updateAll()"><label style="margin:0;cursor:pointer" for="check_${m.id}">${m.l}</label></div><input type="text" class="col-time" style="width:60px;text-align:center" id="time_${m.id}" value="${m.d}" onblur="updateAll()"></div>`; });
    c.innerHTML = h;

    // Init Perfil Checkboxes
    const perfList = document.getElementById('containerPerfilCheckboxes'); let ph='';
    const perfItems = [ {id:'perf_simples', l:'Simples Nacional'}, {id:'perf_presumido', l:'Lucro Presumido'}, {id:'perf_real', l:'Lucro Real'}, {id:'perf_professor', l:'Cálculo Folha Professor'}, {id:'perf_civil', l:'Construção Civil'}, {id:'perf_imob', l:'Empreendimento Imob.'}, {id:'perf_veiculos', l:'Revenda Veículos'}, {id:'perf_farmacia', l:'Farmácia'}, {id:'perf_posto', l:'Posto Combustível'}, {id:'perf_filiais', l:'Matriz / Filiais'}, {id:'perf_super', l:'Supermercado'}, {id:'perf_mei', l:'MEI'}, {id:'perf_rural', l:'Produtor Rural'} ];
    perfItems.forEach(i=>{ ph+=`<div class="input-group" style="margin-bottom:5px; flex-direction:row; align-items:center; justify-content:space-between;"><label style="margin:0">${i.l}</label><select id="${i.id}" style="width:80px;" onchange="updateAll()"><option value="">Selecionar...</option><option>NÃO</option><option>SIM</option></select></div>`; });
    perfList.innerHTML = ph;

    document.querySelectorAll('input, textarea, select').forEach(el => el.addEventListener('input', updateAll));
    
    // Removi o addEventListener para 'btnProcessarMetas' pois ele é redundante e causava erro (o botão já tem onclick no HTML)
    
    openTab('tab-geral');
    updateAll();
};
