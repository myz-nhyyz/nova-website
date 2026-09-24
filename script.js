const LANGUAGE_COPY={vi:{home:'Trang chủ',features:'Tính năng',commands:'Lệnh',help:'Help',privacy:'Privacy',terms:'Terms',invite:'Mời Nova',support:'Tham gia Support',explore:'Khám phá tính năng',hero:'AI thông minh, moderation vững vàng và những công cụ cộng đồng được gói gọn trong một bot.',capabilities:'Một bot, nhiều nhịp sống.',capabilitiesLead:'Nova được thiết kế để server vận hành rõ ràng hơn, an toàn hơn và vui hơn.',commandDeck:'Tìm đúng lệnh, thật nhanh.',commandLead:'Tra cứu command theo nhóm, type và quyền cần thiết.',helpTitle:'Help, nhưng có ngữ cảnh.',helpLead:'Chọn một nhóm để xem nhanh cách Nova hoạt động trong server của bạn.',search:'Tìm lệnh hoặc mô tả...',all:'Tất cả',details:'Xem chi tiết →',commandsCount:'lệnh',model:'Mô hình AI',owner:'Chủ sở hữu',groups:'Nhóm tính năng',ready:'Lệnh sẵn sàng'},en:{home:'Home',features:'Features',commands:'Commands',help:'Help',privacy:'Privacy',terms:'Terms',invite:'Invite Nova',support:'Join Support',explore:'Explore features',hero:'Smart AI, dependable moderation, and community tools packed into one focused Discord bot.',capabilities:'One bot. Many rhythms.',capabilitiesLead:'Nova gives your server a clearer, safer, more capable operating layer.',commandDeck:'Find the right command.',commandLead:'Browse commands by group, type, and required permission.',helpTitle:'Help with context.',helpLead:'Pick a group to see how Nova fits into your server.',search:'Search commands or descriptions...',all:'All',details:'View details →',commandsCount:'commands',model:'AI model',owner:'Owner',groups:'Feature groups',ready:'Ready commands'}};
const FEATURE_EN={ai:['AI Chatbot','Talk to AI inside Discord.','Chat with Qwen3.7-max, private conversation history, image generation, and custom personas.'],moderation:['Moderation','Moderation + automated Security.','Core moderation combined with Anti-Nuke, Anti-Raid, Anti-Spam, Bot-Watch, and Auto-Lockdown.'],banzone:['Ban Zone','Multi-server protection with Ban/Mute modes.','Protect compromised channels with configured actions, per-server whitelists, and 24-hour cleanup.'],war:['War Ping / Backup','Coordinate War and Backup sessions.','Collect the right details, open coordination threads, and control sessions with action buttons.'],event:['Create events','Create and manage events.','Send events, manage participants, and maintain a blacklist through one command group.'],others:['Others','Info, Prefix, Language, and utilities.','Useful commands for bot/server info, server prefixes, language, help, and voice-kick logs.']};
function setLanguage(lang){const copy=LANGUAGE_COPY[lang]||LANGUAGE_COPY.vi;document.documentElement.lang=lang;localStorage.setItem('nova-lang',lang);$('.language-switch')?.classList.toggle('en',lang==='en');$$('.lang-button').forEach(button=>button.classList.toggle('active',button.dataset.lang===lang));const textMap={'.nav-link[href="#home"]':copy.home,'.nav-link[href="#features"]':copy.features,'.nav-link[href="#commands"]':copy.commands,'.nav-link[href="#help"]':copy.help,'.nav-link[href="privacy-policy.html"]':copy.privacy,'.nav-link[href="terms-of-service.html"]':copy.terms,'.invite-nav':copy.invite,'.hero-subtitle':copy.hero,'.hero-actions .btn-ghost':copy.explore,'.section-heading h2':copy.capabilities,'.section-heading>p':copy.capabilitiesLead,'#command-search':copy.search};Object.entries(textMap).forEach(([selector,text])=>{const element=$(selector);if(element){if(element.matches('input'))element.placeholder=text;else element.textContent=text}});const headings=$$('.section-heading h2');if(headings[1])headings[1].textContent=copy.commandDeck;if(headings[2])headings[2].textContent=copy.helpTitle;const sectionLeads=$$('.section-heading>p');if(sectionLeads[1])sectionLeads[1].textContent=copy.commandLead;if(sectionLeads[2])sectionLeads[2].textContent=copy.helpLead;const statLabels=$$('.stat-label');[copy.model,copy.owner,copy.groups,copy.ready].forEach((label,index)=>{if(statLabels[index])statLabels[index].textContent=label});features.forEach(feature=>{if(!feature._vi)feature._vi={title:feature.title,short:feature.short,lead:feature.lead};if(lang==='en'){const english=FEATURE_EN[feature.id];feature.title=english[0];feature.short=english[1];feature.lead=english[2]}else{feature.title=feature._vi.title;feature.short=feature._vi.short;feature.lead=feature._vi.lead}});renderFeatures();renderChips();renderCommands();renderHelp();}
window.addEventListener('DOMContentLoaded',()=>{const initial=localStorage.getItem('nova-lang')==='en'?'en':'vi';setLanguage(initial);$$('.lang-button').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)))});
/* Nova static site: content, rendering and interaction layer. */
const $=(selector,root=document)=>root.querySelector(selector);const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const inviteUrl='https://discord.com/oauth2/authorize?client_id=1532745879944036523';const supportUrl='https://discord.gg/qkyu3G6WMa';
const features=[
{id:'ai',icon:'🤖',title:'AI Chatbot',short:'Trò chuyện với AI ngay trong Discord.',lead:'Chat với AI trực tiếp trong Discord, kèm lịch sử hội thoại riêng, tạo ảnh AI và persona tuỳ chỉnh.',details:['AI chat với mô hình công khai Qwen3.7-max.','Mỗi người dùng có lịch sử hội thoại riêng.','Bật AI Channel bằng /setai hoặc !setai.','Persona tuỳ chỉnh và chọn ngôn ngữ vi/en.','Tạo ảnh AI từ mô tả văn bản.'],perms:['Send Messages và Embed Links','Read Message History','Manage Channels cho cấu hình AI'],examples:['!chat Giải thích quicksort thật đơn giản','?image một phi hành gia mèo uống cà phê trên sao Hoả','!persona custom: Trả lời ngắn gọn, thân thiện'],commands:[['/chat • !chat','both','Trò chuyện với AI trong Discord.','Send Messages'],['/image • !image','both','Tạo ảnh AI từ mô tả văn bản.','Send Messages, Attach Files'],['/setai • !setai','both','Bật/tắt AI mode cho kênh.','Manage Channels'],['/persona • !persona','both','Đổi persona AI theo mã hoặc mô tả.','Send Messages']]},
{id:'moderation',icon:'🛡️',title:'Moderation',short:'Kiểm duyệt + hệ thống Security tự động.',lead:'Bộ lệnh moderation cơ bản kết hợp Anti-Nuke, Anti-Raid, Anti-Spam, Bot-Watch và Auto-Lockdown.',details:['Trusted Admin cấp quyền Moderation + Security config.','/kick, /mute, /ban qua Security moderation engine.','Whitelist user, role và channel để bypass.','Backup roles/channels và Auto-Restore.','Module config cho raid, spam và punishment.'],perms:['Server Owner hoặc Trusted Moderation','Security commands cần Manager','Bot role cao hơn target'],examples:['/trusted admin add user: @Helper','/mute user: @Noisy duration: 10m','/backup create'],commands:[['/trusted admin add|remove|list','slash','Cấp/thu hồi quyền Moderation + Security.','Server Owner'],['/ban • !ban','both','Ban member qua Security moderation engine.','Owner / Trusted'],['/mute • !mute','both','Timeout, fallback Muted Role theo config.','Owner / Trusted'],['/security','slash','Xem trạng thái Security.','Manager']]},
{id:'banzone',icon:'☠️',title:'Ban Zone',short:'Bảo vệ server đa server + mode Ban/Mute.',lead:'Khi kênh bị xâm phạm, Nova xử lý người vi phạm theo mode đã cấu hình và dọn tin nhắn 24 giờ.',details:['Mỗi server có kênh Ban Zone và mode riêng.','Ban hoặc Mute tối đa 28 ngày.','Tự khôi phục kênh nếu Ban Zone bị xoá.','Whitelist riêng theo từng server.','Trusted Ban Zone quản lý cấu hình cùng Owner.'],perms:['Manage Channels','Ban Members hoặc Moderate Members tuỳ mode','Server Owner hoặc Trusted Ban Zone'],examples:['/setbanchannel value:true','/banzone mute duration:10m','/banwhitelist add @TrustedUser'],commands:[['/setbanchannel • !setbanchannel','both','Bật/tắt Ban Zone cho kênh hiện tại.','Owner / Trusted'],['/banzone ban|mute • !banzone','both','Chọn mode ban hoặc mute.','Owner / Trusted'],['/banwhitelist add|remove|list','slash','Quản lý whitelist Ban Zone.','Owner / Trusted']]},
{id:'war',icon:'⚔️',title:'War Ping / Backup',short:'Điều phối War và Backup.',lead:'Tạo yêu cầu ping, thu thập thông tin và mở thread điều phối với các nút hành động.',details:['Tạo yêu cầu War Ping hoặc Backup Ping.','Nút WAR, BACKUP, WIN, LOSE, END.','/end all kết thúc mọi phiên đang chạy.','Call Hacker và trusted users theo permission group.','Cấu hình role và channel bằng /bot-config.'],perms:['Manage Roles','Manage Channels/Threads','Manager cho cấu hình nhạy cảm'],examples:['/end all','/endpermission allow','/bot-config view'],commands:[['WAR / BACKUP','button','Tạo yêu cầu War hoặc Backup Ping.','Configurable'],['WIN / LOSE / END','button','Kết thúc phiên với kết quả tương ứng.','Manager / Trusted'],['/end all','slash','Kết thúc mọi phiên đang hoạt động.','Manager / Trusted'],['/bot-config view','slash','Xem cấu hình hiện tại.','Manager']]},
{id:'event',icon:'🏆',title:'Tạo event',short:'Tạo và quản lý sự kiện.',lead:'Gửi sự kiện, quản lý người tham gia và blacklist, tất cả qua nhóm lệnh /event.',details:['/event send và /event test.','Chỉnh sửa title và description.','Xem, đếm, xoá người tham gia.','Blacklist role bị chặn khỏi event.'],perms:['Manage Events','Manage Channels','Manager cho blacklist'],examples:['/event send','/event edit title','/event blacklist add role: @Banned'],commands:[['/event send','slash','Gửi và tạo sự kiện.','Manage Events'],['/event participants','slash','Xem danh sách người tham gia.','Manage Events'],['/event blacklist add|remove|list','slash','Quản lý role bị chặn.','Manager']]},
{id:'others',icon:'🛠️',title:'Others',short:'Thông tin · Prefix · Language · Tiện ích.',lead:'Các lệnh tiện ích để xem thông tin, đổi prefix, đổi ngôn ngữ và mở Help Menu.',details:['/info, /serverinfo, /userinfo và phiên bản prefix.','!prefix đổi prefix riêng theo server.','/language đổi ngôn ngữ giao diện.','/help mở Help Menu theo danh mục.','!log xem lịch sử kick voice.'],perms:['Send Messages cho hầu hết lệnh','Administrator / Manage Server / Manage Channels cho !prefix'],examples:['/info','!prefix ?','/language vi','!help moderation'],commands:[['/info • !info','both','Xem thông tin bot.','Send Messages'],['/serverinfo • !serverinfo','both','Xem thông tin server.','Send Messages'],['!prefix','prefix','Xem hoặc đổi prefix riêng server.','Administrator / Manage Server'],['/help • !help','both','Mở Help Menu chính theo danh mục.','Send Messages']]}
];
const expandedCommands={
ai:[
['/clearchat • !clearchat','both','Xoá lịch sử trò chuyện AI của bạn.','Send Messages'],
['/setai • !setai true|false','both','Bật hoặc tắt AI cho kênh hiện tại.','Manage Channels'],
['/setsharedhistory • !setsharedhistory true|false','both','Bật hoặc tắt lịch sử AI dùng chung.','Manage Channels'],
['/persona • !persona','both','Thiết lập phong cách nói của AI.','Send Messages'],
['/mypersona • !mypersona','both','Xem persona hiện tại của bạn.','Send Messages'],
['/resetpersona • !resetpersona','both','Đặt persona về mặc định.','Send Messages']
],
war:[
['WAR','button','Mở yêu cầu War từ bảng Help Desk.','Configurable'],
['BACKUP','button','Mở yêu cầu Backup từ bảng Help Desk.','Configurable'],
['JOIN','button','Tham gia phiên War hoặc Backup đang chạy.','Member'],
['HACKER SHOWED UP','button','Báo hacker đã xuất hiện trong phiên.','Member'],
['CALL HACKER','button','Gọi hacker trong phiên đang chạy.','Manager / Trusted'],
['WIN • LOSE • END','button','Kết thúc phiên bằng kết quả hoặc đóng phiên.','Manager / Trusted'],
['/trust @user war','slash','Cấp quyền War cho người dùng.','Server Owner'],
['/untrust @user war','slash','Thu hồi quyền War của người dùng.','Server Owner'],
['/trust-list war','slash','Liệt kê người dùng có quyền War.','Server Owner'],
['/helppanel','slash','Di chuyển bảng Help Desk xuống cuối kênh.','Manager'],
['/callhacker show|hide','slash','Hiện hoặc ẩn nút Call hacker.','Manager'],
['/bot-config view','slash','Xem cấu hình War và Backup hiện tại.','Manager'],
['/bot-config help_channel','slash','Đổi kênh Help Desk.','Manager'],
['/bot-config war_ping_role','slash','Đổi role War Ping.','Manager'],
['/bot-config backup_ping_role','slash','Đổi role Backup Ping.','Manager'],
['/bot-config joined_war_role','slash','Đổi role người tham gia War.','Manager'],
['/bot-config joined_backup_role','slash','Đổi role người tham gia Backup.','Manager'],
['/bot-config hacker_role','slash','Đổi role hacker.','Manager']
],
event:[
['Join Event','button','Tham gia sự kiện từ bảng event.','Member'],
['End Event','button','Kết thúc sự kiện hiện tại.','Manage Server'],
['/event send','slash','Đăng bảng event vào kênh cố định.','Manage Server'],
['/event test','slash','Đăng bảng event thử trong kênh hiện tại.','Manage Server'],
['/event participants','slash','Liệt kê người đã tham gia.','Manage Server'],
['/event count','slash','Xem số lượng người tham gia.','Manage Server'],
['/event remove','slash','Xoá một người khỏi danh sách tham gia.','Manage Server'],
['/event clear','slash','Xoá toàn bộ danh sách tham gia.','Manage Server'],
['/event blacklist add|remove|list','slash','Quản lý role bị chặn khỏi event.','Manage Server']
],
moderation:[
['/trust @user permission','slash','Cấp quyền moderation, banzone, security, war, backup hoặc all.','Server Owner'],
['/untrust @user permission','slash','Thu hồi quyền trusted.','Server Owner'],
['/trust-list permission','slash','Liệt kê người dùng trusted theo quyền.','Server Owner'],
['/kick user','slash','Kick thành viên khỏi server.','Server Owner'],
['/mute user duration','slash','Mute thành viên theo thời lượng.','Server Owner'],
['/ban user','slash','Ban thành viên khỏi server.','Server Owner'],
['/security','slash','Xem trạng thái Security.','Manager'],
['/toggle module state','slash','Bật hoặc tắt module Security.','Manager'],
['/threshold module action percent','slash','Đặt phần trăm tăng threshold cho action.','Manager'],
['/config module action percent','slash','Alias cũ của threshold.','Manager'],
['/punishment module action duration','slash','Chọn hình phạt Ban, Kick hoặc Mute.','Manager'],
['/fallback action','slash','Chọn hành động dự phòng.','Manager'],
['/post-punish mode','slash','Đặt cách reset hoặc tiếp tục decay.','Manager'],
['/decay interval amount','slash','Cấu hình decay.','Manager'],
['/mute-duration duration','slash','Đặt thời lượng mute mặc định.','Manager'],
['/admin-mute-method method','slash','Chọn phương thức admin mute.','Manager'],
['/setchannel type channel','slash','Đặt kênh Security, Bot Watch hoặc Raid Alert.','Manager'],
['/whitelist add user','slash','Thêm người dùng vào whitelist.','Manager'],
['/whitelist remove user','slash','Xoá người dùng khỏi whitelist.','Manager'],
['/whitelist list','slash','Xem whitelist người dùng.','Manager'],
['/whitelist role action role','slash','Quản lý whitelist theo role.','Manager'],
['/whitelist channel action channel','slash','Quản lý whitelist theo kênh.','Manager'],
['/raid-config account-age join-threshold window','slash','Cấu hình Anti-Raid.','Manager'],
['/spam-config similarity rate-count rate-seconds','slash','Cấu hình Anti-Spam.','Manager'],
['/language lang','slash','Đổi ngôn ngữ Security.','Manager'],
['/muted-role-name name','slash','Đổi tên Muted Role.','Manager'],
['/setup-mute-role role name','slash','Dùng hoặc tạo Muted Role.','Manager'],
['/unmute user','slash','Gỡ mute và khôi phục role đã lưu.','Manager'],
['/backup create','slash','Tạo backup role và channel.','Manager'],
['/backup load backup-id','slash','Load backup sau khi xác nhận.','Manager'],
['/backup info backup-id','slash','Xem thông tin backup.','Manager'],
['/backup list','slash','Duyệt danh sách backup.','Manager'],
['/backup status','slash','Xem tiến trình load gần nhất.','Manager'],
['/backup delete backup-id','slash','Xoá một backup.','Manager']
],
banzone:[
['/trusted banzone add|remove|list','slash','Cấp hoặc thu hồi quyền Ban Zone.','Server Owner'],
['/setbanchannel true|false • !setbanchannel','both','Bật hoặc tắt Ban Zone.','Server Owner'],
['/banzone ban • !banzone ban','both','Bật Ban Mode.','Server Owner'],
['/banzone mute duration • !banzone mute','both','Bật Mute Mode theo thời lượng.','Server Owner'],
['/banwhitelist add|remove|list','slash','Quản lý whitelist Ban Zone.','Server Owner'],
['/bandebug user • !bandebug user','both','Kiểm tra điều kiện xử lý Ban Zone.','Bot Owner']
],
others:[
['/info • !info','both','Xem thông tin đầy đủ về bot.','Send Messages'],
['/serverinfo • !serverinfo','both','Xem thông tin server hiện tại.','Send Messages'],
['/userinfo user','slash','Xem thông tin người dùng.','Send Messages'],
['!prefix','prefix','Xem hoặc đổi prefix riêng của server.','Administrator / Manage Server'],
['/language • !language','both','Đặt ngôn ngữ giao diện cá nhân.','Send Messages'],
['/help • !help','both','Mở Help Menu.','Send Messages'],
['!log kick|voicekick','prefix','Xem lịch sử voice-kick gần đây.','Send Messages']
]};
Object.entries(expandedCommands).forEach(([featureId,commands])=>{
const feature=features.find(item=>item.id===featureId);
if(feature)feature.commands.push(...commands);
});
const updates=[{id:'03',date:'23/09/2026',current:true,items:[['⚙️ End Permission & End All','/endpermission allow|deny cho phép member thường dùng nút Win/Lose/End. /end all kết thúc mọi phiên War/Backup đang chạy.'],['🛡️ Security Module hoàn chỉnh','Anti-Nuke, Anti-Raid, Anti-Spam, Bot-Watch, Auto-Lockdown / Auto-Restore, whitelist và Trusted Admin.'],['🛠️ Info Slash & Prefix riêng server','Thêm /serverinfo, /userinfo, !prefix và /bot-config mở rộng cho role/kênh.']]},{id:'02',date:'22/09/2026',items:[['🛡️ Moderation & Security','Moderation gồm /ban, /kick, /mute, /unmute, /unban và các lệnh cấu hình Security.'],['🛠️ Others','Gộp info, prefix, language, help và log vào nhóm tiện ích.']]},{id:'01',date:'19/09/2026',items:[['ℹ️ !info','Phiên bản prefix của /info với bảng thông tin bot đầy đủ.'],['🔧 Prefix riêng từng server','Prefix mặc định ! và được lưu độc lập theo từng Guild.']]}];
let activeCategory='all';let lastFocused=null;let showAllCommands=false;
function typeClass(type){return 'tag-'+type}function typeLabel(type){return type==='both'?'BOTH':type.toUpperCase()}
function renderFeatures(){const grid=$('#feature-grid');if(!grid)return;grid.innerHTML=features.map((f,i)=>`<article class="feature-card glass reveal" data-feature="${f.id}" style="--delay:${i*60}ms"><div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.short}</p><div class="feature-meta"><span>${f.commands.length + 4} lệnh</span><span>Xem chi tiết →</span></div></article>`).join('');bindFeatures();observeReveals()}
function renderChips(){const el=$('#category-chips');if(!el)return;el.innerHTML=[['all','Tất cả'],...features.map(f=>[f.id,f.title])].map(([id,label])=>`<button class="chip ${id===activeCategory?'active':''}" data-category="${id}">${label}</button>`).join('');$$('.chip',el).forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.category;showAllCommands=false;renderChips();renderCommands()}))}
function allCommands(){return features.flatMap(f=>f.commands.map(command=>({feature:f.id,featureTitle:f.title,icon:f.icon,name:command[0],type:command[1],description:command[2],perm:command[3]})))}
function renderCommands(){
  const list=$('#command-list');
  if(!list)return;
  const query=($('#command-search')?.value||'').toLowerCase().trim();
  const all=allCommands();
  const filtered=all.filter(c=>(activeCategory==='all'||c.feature===activeCategory)&&(!query||`${c.name} ${c.description} ${c.featureTitle}`.toLowerCase().includes(query)));

  // "Tất cả" + không search + chưa bấm Xem thêm → 7 ô + 1 ô Xem thêm = 8 ô
  const collapse=activeCategory==='all'&&!query&&!showAllCommands;
  const LIMIT=7;
  const visible=collapse?filtered.slice(0,LIMIT):filtered;
  const remaining=filtered.length-visible.length;

  list.innerHTML=visible.map(c=>`<article class="command-card"><div><div class="command-name">${c.icon} ${c.name}</div><div class="command-description">${c.description}</div><span class="tag ${typeClass(c.type)}">${typeLabel(c.type)} · ${c.featureTitle}</span></div><div class="command-perm">${c.perm}</div></article>`).join('');

  if(collapse&&remaining>0){
    const more=document.createElement('button');
    more.type='button';
    more.id='show-more-commands';
    more.className='command-card show-more-card';
    more.setAttribute('aria-label','Xem thêm lệnh');
    more.innerHTML=`<div><div class="command-name">＋ Xem thêm</div><div class="command-description">Còn ${remaining} lệnh chưa hiển thị.</div><span class="tag tag-both">ALL · Tất cả nhóm</span></div><div class="command-perm">Bấm để xem toàn bộ →</div>`;
    more.addEventListener('click',()=>{showAllCommands=true;renderCommands()});
    list.appendChild(more);
  }

  $('#no-results').hidden=filtered.length>0;
  $('#clear-search').classList.toggle('visible',Boolean(query));
}
function renderHelp(){const preview=$('#help-preview');if(!preview)return;const f=features.find(item=>item.id===activeCategory)||features[0];preview.innerHTML=`<h3>${f.icon} ${f.title}</h3><p>${f.lead}</p><div class="help-command">${f.commands.slice(0,4).map(c=>`<code>${c[0]}</code>`).join('')}</div>`;const chips=$('#help-feature-chips');chips.innerHTML=features.map(f=>`<button class="chip ${f.id===features[0].id?'active':''}" data-help-feature="${f.id}">${f.title}</button>`).join('');$('#help-feature-result').innerHTML=`Try <code>!help ${features[0].id}</code> to see the full command set.`;$$('[data-help-feature]').forEach(button=>button.addEventListener('click',()=>{const item=features.find(f=>f.id===button.dataset.helpFeature);$$('[data-help-feature]').forEach(b=>b.classList.toggle('active',b===button));$('#help-feature-result').innerHTML=`<strong>${item.icon} ${item.title}</strong><br>${item.lead}<br><code>!help ${item.id}</code>`}))}
function openFeature(id){const f=features.find(item=>item.id===id);if(!f)return;lastFocused=document.activeElement;$('#feature-modal-content').innerHTML=`<div class="modal-hero"><div class="feature-icon">${f.icon}</div><h2 id="feature-modal-title">${f.title}</h2><p>${f.lead}</p></div><div class="modal-section"><h3>Chi tiết</h3><ul>${f.details.map(item=>`<li>${item}</li>`).join('')}</ul></div><div class="modal-section"><h3>Lệnh</h3>${f.commands.map(c=>`<div class="modal-command"><strong>${c[0]} <span class="tag ${typeClass(c[1])}">${typeLabel(c[1])}</span></strong><p>${c[2]} · ${c[3]}</p></div>`).join('')}</div><div class="modal-section"><h3>Ví dụ</h3>${f.examples.map(item=>`<div class="example">${item}</div>`).join('')}</div><div class="modal-actions"><a class="btn btn-primary" href="${inviteUrl}" target="_blank" rel="noreferrer">Mời Nova ↗</a><a class="btn btn-glass" href="${supportUrl}" target="_blank" rel="noreferrer">Support Server</a></div>`;$('#feature-modal').hidden=false;document.body.style.overflow='hidden';$('.modal-close',$('#feature-modal')).focus()}
function closeModal(id){const modal=$('#'+id);if(modal)modal.hidden=true;document.body.style.overflow='';if(lastFocused?.focus)lastFocused.focus()}
function renderUpdates(){const body=$('#update-log-body');if(!body)return;body.innerHTML=updates.map(update=>`<article class="update-entry"><h3>UPDATE ${update.id}${update.current?'<span class="new-badge">MỚI</span>':''}</h3><time>${update.date}</time><ul>${update.items.map(item=>`<li><strong>${item[0]}</strong><br>${item[1]}</li>`).join('')}</ul></article>`).join('')}
function bindFeatures(){$$('[data-feature]').forEach(card=>{card.addEventListener('click',()=>openFeature(card.dataset.feature));card.addEventListener('pointermove',event=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=card.getBoundingClientRect();card.style.setProperty('--mx',`${event.clientX-rect.left}px`);card.style.setProperty('--my',`${event.clientY-rect.top}px`)})})}
function observeReveals(){if(!('IntersectionObserver'in window)){$$('.reveal').forEach(el=>el.classList.add('in'));return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el))}
function setup(){renderFeatures();renderChips();renderCommands();renderHelp();renderUpdates();observeReveals();const stored=localStorage.getItem('nova-lang');if(stored==='en')document.querySelector('.language-switch')?.classList.add('en');$$('.lang-button').forEach(button=>button.addEventListener('click',()=>{localStorage.setItem('nova-lang',button.dataset.lang);$('.language-switch').classList.toggle('en',button.dataset.lang==='en')}));$('#command-search')?.addEventListener('input',()=>{showAllCommands=false;renderCommands()});$('#clear-search')?.addEventListener('click',()=>{$('#command-search').value='';showAllCommands=false;renderCommands();$('#command-search').focus()});$$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeModal(button.dataset.close)));$$('.modal-backdrop').forEach(backdrop=>backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeModal(backdrop.id)}));document.addEventListener('keydown',event=>{if(event.key==='Escape')$$('.modal-backdrop').filter(m=>!m.hidden).forEach(m=>closeModal(m.id));});const toggle=$('.menu-toggle'),menu=$('.mobile-menu');toggle?.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open)});$$('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>menu.classList.remove('open')));const sectionLinks=$$('.nav-link[href^="#"]');const sections=sectionLinks.map(link=>$(link.getAttribute('href'))).filter(Boolean);if(sections.length){const spy=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55%'});sections.forEach(section=>spy.observe(section))}if(document.body.dataset.page==='home'){const until=Number(localStorage.getItem('nova_update_log_snooze_until')||0);if(Date.now()>until)setTimeout(()=>{$('#update-modal').hidden=false},600);$('#snooze-updates')?.addEventListener('change',event=>{if(event.target.checked)localStorage.setItem('nova_update_log_snooze_until',String(Date.now()+86400000))})}}
window.addEventListener('DOMContentLoaded',setup);

/* ============================================================
   Legal pages i18n — VI/EN dịch thật nội dung
   (Không tạo hamburger, nav ngang do HTML lo)
   ============================================================ */
const LEGAL_COPY = {
  privacy: {
    vi: {
      title: 'Privacy Policy',
      intro: 'Chính sách này có hiệu lực từ ngày <strong>19/09/2026</strong> và mô tả cách Nova xử lý dữ liệu khi bạn sử dụng bot.',
      navLabels: { home: 'Trang chủ', features: 'Tính năng', commands: 'Lệnh', help: 'Giúp đỡ', terms: 'Terms', privacy: 'Privacy' },
      sections: [
        { h: '1. Giới thiệu', p: 'Nova là Discord bot do <strong>nova_.inovation</strong> vận hành, cung cấp AI Chatbot, moderation, security, Ban Zone, War/Backup và Event tools.' },
        { h: '2. Dữ liệu Nova có thể xử lý', p: 'Tuỳ tính năng được bật, Nova có thể xử lý ID người dùng và server, nội dung tin nhắn gửi đến AI, lịch sử AI, dữ liệu moderation, event, War/Backup, cấu hình server và prefix riêng.' },
        { h: '3. Nhà cung cấp AI', p: 'AI công khai của Nova sử dụng <strong>Qwen3.7-max</strong>. Tạo ảnh dùng Cocolink là nhà cung cấp chính và Gemini làm dự phòng. Chỉ dữ liệu cần thiết cho yêu cầu được chuyển tiếp.' },
        { h: '4. Lưu trữ tối thiểu', p: 'Nova chỉ giữ dữ liệu cần cho tính năng đang hoạt động. Bạn có thể xoá lịch sử AI bằng <code>!clearchat</code>. Cấu hình được giữ khi server còn sử dụng bot và có thể được chủ server yêu cầu xoá.' },
        { h: '5. Bảo mật', p: 'Nova giới hạn quyền truy cập nội bộ, tách dữ liệu theo server và không lưu token Discord hoặc API key của người dùng.' },
        { h: '6. Quyền của bạn', p: 'Bạn có quyền yêu cầu xem, sửa hoặc xoá dữ liệu liên quan đến mình; chủ server có thể yêu cầu xoá cấu hình. Hãy liên hệ qua email bên dưới.' },
        { h: '7. Liên hệ', p: 'Nếu có câu hỏi về quyền riêng tư, gửi email đến <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a>.' }
      ],
      contact: { icon: '✦', strong: 'Cần trao đổi trực tiếp?', p: 'anhbao27072011@gmail.com', btn: 'Gửi email ↗', href: 'mailto:anhbao27072011@gmail.com' }
    },
    en: {
      title: 'Privacy Policy',
      intro: 'This policy is effective from <strong>19/09/2026</strong> and describes how Nova processes data when you use the bot.',
      navLabels: { home: 'Home', features: 'Features', commands: 'Commands', help: 'Help', terms: 'Terms', privacy: 'Privacy' },
      sections: [
        { h: '1. Introduction', p: 'Nova is a Discord bot operated by <strong>nova_.inovation</strong>, providing AI Chatbot, moderation, security, Ban Zone, War/Backup and Event tools.' },
        { h: '2. Data Nova may process', p: 'Depending on enabled features, Nova may process user and server IDs, messages sent to AI, AI history, moderation data, event data, War/Backup data, server configuration and custom prefixes.' },
        { h: '3. AI providers', p: "Nova's public AI uses <strong>Qwen3.7-max</strong>. Image generation uses Cocolink as the primary provider and Gemini as fallback. Only data necessary for the request is forwarded." },
        { h: '4. Minimal storage', p: "Nova only keeps data needed for active features. You can clear AI history with <code>!clearchat</code>. Configuration is kept while the server uses the bot and can be deleted at the owner's request." },
        { h: '5. Security', p: 'Nova limits internal access, isolates data per server, and does not store Discord tokens or user API keys.' },
        { h: '6. Your rights', p: 'You can request to view, modify or delete data related to you; server owners can request configuration deletion. Contact via the email below.' },
        { h: '7. Contact', p: 'For privacy questions, email <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a>.' }
      ],
      contact: { icon: '✦', strong: 'Need to talk directly?', p: 'anhbao27072011@gmail.com', btn: 'Send email ↗', href: 'mailto:anhbao27072011@gmail.com' }
    }
  },
  terms: {
    vi: {
      title: 'Terms of Service',
      intro: 'Các điều khoản này có hiệu lực từ ngày <strong>19/09/2026</strong>. Khi mời hoặc sử dụng Nova, bạn đồng ý với các điều khoản sau.',
      navLabels: { home: 'Trang chủ', features: 'Tính năng', commands: 'Lệnh', help: 'Giúp đỡ', terms: 'Terms', privacy: 'Privacy' },
      sections: [
        { h: '1. Mô tả dịch vụ', p: 'Nova cung cấp công cụ AI, moderation, security, Ban Zone, War/Backup và Event cho cộng đồng Discord.' },
        { h: '2. Sử dụng hợp lệ', p: 'Bạn phải tuân thủ Discord Terms of Service, Community Guidelines, pháp luật hiện hành và các quy định riêng của server.' },
        { h: '3. Hành vi bị cấm', p: 'Không dùng Nova để spam, raid, lạm dụng quyền, quấy rối, phát tán nội dung bất hợp pháp hoặc cố gắng phá hoại bot và server.' },
        { h: '4. Trách nhiệm kiểm duyệt', p: 'Chủ server và đội ngũ quản trị chịu trách nhiệm cấu hình moderation, security, whitelist, role hierarchy và quyết định xử lý member.' },
        { h: '5. Prefix riêng', p: 'Prefix được lưu theo từng server. Chỉ người có Administrator, Manage Server hoặc Manage Channels nên thay đổi prefix và cần thông báo cho thành viên.' },
        { h: '6. Nội dung AI', p: 'Phản hồi AI có thể sai, thiếu hoặc không phù hợp. Hãy kiểm tra thông tin trước khi dựa vào đó để ra quyết định.' },
        { h: '7. War, Backup và Event', p: 'Người dùng chịu trách nhiệm về lời mời, nội dung và hành vi trong các phiên War, Backup và Event do server tạo.' },
        { h: '8. Ban Zone', p: 'Ban Zone là công cụ tự động có thể ban hoặc mute theo cấu hình. Hãy thiết lập whitelist, mode và role hierarchy cẩn thận.' },
        { h: '9. Tính khả dụng', p: 'Nova được cung cấp theo tình trạng hiện có. Có thể xảy ra gián đoạn do bảo trì, giới hạn Discord hoặc dịch vụ phụ thuộc.' },
        { h: '10. Thay đổi dịch vụ', p: 'Nova có thể được cập nhật, thêm, thay đổi hoặc loại bỏ tính năng. Update log sẽ ghi nhận các thay đổi quan trọng.' },
        { h: '11. Tạm ngừng hoặc chấm dứt', p: 'Nova có thể hạn chế hoặc chấm dứt quyền sử dụng khi phát hiện lạm dụng, vi phạm điều khoản hoặc yêu cầu từ Discord.' },
        { h: '12. Liên hệ', p: 'Liên hệ <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a> cho câu hỏi về điều khoản.' }
      ],
      contact: { icon: '↗', strong: 'Support server', p: 'discord.gg/qkyu3G6WMa', btn: 'Tham gia ↗', href: 'https://discord.gg/qkyu3G6WMa' }
    },
    en: {
      title: 'Terms of Service',
      intro: 'These terms are effective from <strong>19/09/2026</strong>. By inviting or using Nova, you agree to the following terms.',
      navLabels: { home: 'Home', features: 'Features', commands: 'Commands', help: 'Help', terms: 'Terms', privacy: 'Privacy' },
      sections: [
        { h: '1. Service description', p: 'Nova provides AI, moderation, security, Ban Zone, War/Backup and Event tools for Discord communities.' },
        { h: '2. Acceptable use', p: "You must comply with Discord Terms of Service, Community Guidelines, applicable laws, and your server's rules." },
        { h: '3. Prohibited behavior', p: 'Do not use Nova for spam, raids, permission abuse, harassment, illegal content, or attempts to damage the bot or servers.' },
        { h: '4. Moderation responsibility', p: 'Server owners and admins are responsible for configuring moderation, security, whitelist, role hierarchy, and handling members.' },
        { h: '5. Custom prefix', p: 'Prefixes are stored per server. Only users with Administrator, Manage Server, or Manage Channels should change the prefix and should notify members.' },
        { h: '6. AI content', p: 'AI responses may be incorrect, incomplete, or inappropriate. Verify information before making decisions based on it.' },
        { h: '7. War, Backup and Events', p: 'Users are responsible for invitations, content, and behavior in War, Backup, and Event sessions created by the server.' },
        { h: '8. Ban Zone', p: 'Ban Zone is an automated tool that can ban or mute according to configuration. Set up whitelist, mode, and role hierarchy carefully.' },
        { h: '9. Availability', p: 'Nova is provided as-is. Interruptions may occur due to maintenance, Discord limits, or dependent services.' },
        { h: '10. Service changes', p: 'Nova may be updated, added to, modified, or have features removed. The update log will record significant changes.' },
        { h: '11. Suspension or termination', p: 'Nova may limit or terminate usage rights when abuse, term violations, or Discord requirements are detected.' },
        { h: '12. Contact', p: 'Contact <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a> for questions about the terms.' }
      ],
      contact: { icon: '↗', strong: 'Support server', p: 'discord.gg/qkyu3G6WMa', btn: 'Join ↗', href: 'https://discord.gg/qkyu3G6WMa' }
    }
  }
};

function applyLegalLang(pageKey, lang) {
  const data = LEGAL_COPY[pageKey]?.[lang];
  if (!data) return;

  const navMap = [
    ['.nav-link[href="index.html"]', data.navLabels.home],
    ['.nav-link[href="index.html#features"]', data.navLabels.features],
    ['.nav-link[href="index.html#commands"]', data.navLabels.commands],
    ['.nav-link[href="index.html#help"]', data.navLabels.help],
    ['.nav-link[href="terms-of-service.html"]', data.navLabels.terms],
    ['.nav-link[href="privacy-policy.html"]', data.navLabels.privacy]
  ];
  navMap.forEach(([sel, text]) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
  });

  const doc = document.querySelector('.legal-doc');
  if (!doc) return;
  const h1 = doc.querySelector('h1');
  const intro = doc.querySelector('.legal-intro');
  if (h1) h1.textContent = data.title;
  if (intro) intro.innerHTML = data.intro;

  doc.querySelectorAll('section').forEach(s => s.remove());
  const contact = doc.querySelector('.contact-card');
  data.sections.forEach(({ h, p }) => {
    const sec = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = h;
    const pp = document.createElement('p');
    pp.innerHTML = p;
    sec.append(h2, pp);
    if (contact) doc.insertBefore(sec, contact);
    else doc.appendChild(sec);
  });

  if (contact) {
    const icon = contact.querySelector('.contact-icon');
    const strong = contact.querySelector('strong');
    const para = contact.querySelector('p');
    const btn = contact.querySelector('.btn');
    if (icon) icon.textContent = data.contact.icon;
    if (strong) strong.textContent = data.contact.strong;
    if (para) para.textContent = data.contact.p;
    if (btn) { btn.textContent = data.contact.btn; btn.href = data.contact.href; }
  }

  const footerHomeLink = document.querySelector('.footer-bottom a[href="index.html"]');
  if (footerHomeLink) footerHomeLink.textContent = lang === 'en' ? 'Home' : 'Trang chủ';
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'legal') return;

  const pageKey = location.pathname.includes('terms') ? 'terms' : 'privacy';
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;

  let lang = localStorage.getItem('nova-lang') === 'en' ? 'en' : 'vi';

  function applyLang(next) {
    lang = next;
    localStorage.setItem('nova-lang', lang);
    document.documentElement.lang = lang;
    actions.querySelector('.language-switch')?.classList.toggle('en', lang === 'en');
    actions.querySelectorAll('.lang-button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    applyLegalLang(pageKey, lang);
  }

  applyLang(lang);

  actions.querySelectorAll('.lang-button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
});
