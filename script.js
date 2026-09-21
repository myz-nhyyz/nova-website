/* ============================================================
   NOVA — Main Script
   ============================================================ */
'use strict';

const CONFIG = {
  BOT_NAME: 'Nova',
  BOT_OWNER: 'nova_.inovation',
  BOT_AVATAR: './assets/avatar.png',
  BOT_INVITE_URL: 'https://discord.com/oauth2/authorize?client_id=1532745879944036523',
  CONTACT_EMAIL: 'anhbao27072011@gmail.com',
  SUPPORT_SERVER_URL: 'https://discord.gg/qkyu3G6WMa',
  AI_PROVIDER: 'Qwen3.7-max',
  EFFECTIVE_DATE: '19/09/2026'
};
window.NOVA_CONFIG = CONFIG;

/* ============================================================
   CATEGORY + FEATURE DATA
   ============================================================ */
const CATEGORIES = [
  /* ---------------- AI ---------------- */
  {
    id: 'ai', icon: '🤖',
    title: { vi: 'AI', en: 'AI' },
    blurb: {
      vi: 'Trò chuyện với AI và tạo ảnh bằng AI ngay trong Discord.',
      en: 'Chat with AI and generate images with AI right inside Discord.'
    },
    features: [
      {
        id: 'ai-chat', icon: '💬',
        title: { vi: 'AI Chat', en: 'AI Chat' },
        desc: {
          vi: 'Nova cung cấp hội thoại do AI tạo ra ngay trong Discord. Bạn có thể trò chuyện tự nhiên với Nova và nhận phản hồi do AI sinh ra, không cần rời khỏi server.',
          en: 'Nova provides AI-powered conversations inside Discord. You can chat naturally with Nova and receive AI-generated responses without leaving your server.'
        },
        commands: [
          { name: '/chat', desc: { vi: 'Bắt đầu hoặc tiếp tục hội thoại với AI.', en: 'Start or continue a conversation with the AI.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!chat', desc: { vi: 'Dạng prefix command, dùng khi bạn không muốn gõ slash command.', en: 'Prefix form, for when you prefer not to type a slash command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/chat prompt: Giải thích Discord là gì?', en: '/chat prompt: Explain what Discord is.' },
          { vi: '!chat kể cho tôi một câu chuyện ngắn', en: '!chat tell me a short story' }
        ],
        notes: {
          vi: 'Lịch sử hội thoại có thể riêng theo từng người hoặc dùng chung cho cả kênh, tuỳ cấu hình server. Bạn có thể xoá lịch sử bằng lệnh liên quan.',
          en: 'Conversation history can be per-user or shared per channel, depending on server configuration. You can clear history with the related command.'
        },
        related: ['ai-image', 'ai-fallback']
      },
      {
        id: 'ai-image', icon: '🎨',
        title: { vi: 'AI Image Generation', en: 'AI Image Generation' },
        desc: {
          vi: 'Nova có thể tạo hình ảnh từ mô tả văn bản. Bạn nhập prompt mô tả hình ảnh mong muốn và Nova sẽ trả về ảnh do AI tạo ra.',
          en: 'Nova can generate images from text prompts. You enter a prompt describing the desired image and Nova returns an AI-generated image.'
        },
        commands: [
          { name: '/image', desc: { vi: 'Tạo ảnh AI từ prompt mô tả.', en: 'Generate an AI image from a text prompt.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!image', desc: { vi: 'Dạng prefix command để tạo ảnh AI.', en: 'Prefix form to generate an AI image.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/image prompt: anime girl under a blue moon', en: '/image prompt: anime girl under a blue moon' },
          { vi: '!image prompt: thành phố tương lai lúc hoàng hôn', en: '!image prompt: futuristic city at sunset' }
        ],
        notes: {
          vi: 'Kết quả phụ thuộc vào prompt. Prompt càng rõ ràng thì ảnh càng sát ý bạn. Ảnh do AI tạo có thể không chính xác hoàn toàn.',
          en: 'Results depend on the prompt. Clearer prompts produce closer results. AI-generated images may not be fully accurate.'
        },
        related: ['ai-chat', 'ai-fallback']
      },
      {
        id: 'ai-fallback', icon: '🔁',
        title: { vi: 'AI Fallback', en: 'AI Fallback' },
        desc: {
          vi: 'Nova sử dụng dịch vụ AI chính và có hệ thống AI dự phòng khi dịch vụ chính không khả dụng, giúp tính năng AI hoạt động ổn định hơn.',
          en: 'Nova uses its primary AI service and has a fallback AI system when the primary service is unavailable, helping AI features stay more reliable.'
        },
        commands: [],
        examples: [],
        notes: {
          vi: 'Nhà cung cấp AI công khai: Qwen3.7-max. Thông tin cấu hình nội bộ và khoá API không được hiển thị công khai.',
          en: 'Public AI provider: Qwen3.7-max. Internal configuration and API keys are not publicly disclosed.'
        },
        related: ['ai-chat', 'ai-image']
      }
    ]
  },

  /* ---------------- MODERATION ---------------- */
  {
    id: 'moderation', icon: '🛡️',
    title: { vi: 'Moderation', en: 'Moderation' },
    blurb: {
      vi: 'Công cụ kiểm duyệt cơ bản cho server: ban, unban, mute, unmute.',
      en: 'Core moderation tools for your server: ban, unban, mute, unmute.'
    },
    features: [
      {
        id: 'mod-ban', icon: '🔨',
        title: { vi: 'Ban', en: 'Ban' },
        desc: {
          vi: 'Ban một thành viên khỏi server Discord hiện tại. Nova tôn trọng quyền hạn Discord và thứ bậc role — bot cần role cao hơn người bị tác động mới thực hiện được.',
          en: 'Ban a member from the current Discord server. Nova respects Discord permissions and role hierarchy — the bot needs a higher role than the target to act.'
        },
        commands: [
          { name: '/ban', desc: { vi: 'Ban một thành viên khỏi server.', en: 'Ban a member from the server.' }, perm: { vi: 'Ban Members + role cao hơn mục tiêu', en: 'Ban Members + role above target' } }
        ],
        examples: [
          { vi: '/ban user:@member reason: Spam', en: '/ban user:@member reason: Spam' }
        ],
        notes: {
          vi: 'Nova không thể ban Server Owner hoặc người có role cao hơn bot.',
          en: 'Nova cannot ban the Server Owner or anyone with a role above the bot.'
        },
        related: ['mod-unban', 'mod-mute', 'banzone-banzone']
      },
      {
        id: 'mod-unban', icon: '♻️',
        title: { vi: 'Unban', en: 'Unban' },
        desc: {
          vi: 'Gỡ một người dùng khỏi danh sách ban của server.',
          en: 'Remove a user from the server ban list.'
        },
        commands: [
          { name: '/unban', desc: { vi: 'Gỡ ban một người dùng theo User ID.', en: 'Unban a user by User ID.' }, perm: { vi: 'Ban Members', en: 'Ban Members' } }
        ],
        examples: [
          { vi: '/unban user_id:123456789012345678', en: '/unban user_id:123456789012345678' }
        ],
        notes: {
          vi: 'Cần nhập đúng User ID của người đã bị ban.',
          en: 'You need the correct User ID of the banned user.'
        },
        related: ['mod-ban', 'mod-mute']
      },
      {
        id: 'mod-mute', icon: '🔇',
        title: { vi: 'Mute', en: 'Mute' },
        desc: {
          vi: 'Tạm thời timeout một thành viên trong khoảng thời gian nhất định.',
          en: 'Temporarily timeout a member for a set duration.'
        },
        commands: [
          { name: '/mute', desc: { vi: 'Timeout một thành viên với duration chỉ định.', en: 'Timeout a member for the specified duration.' }, perm: { vi: 'Moderate Members + role cao hơn mục tiêu', en: 'Moderate Members + role above target' } }
        ],
        examples: [
          { vi: '/mute user:@member duration: 10m', en: '/mute user:@member duration: 10m' },
          { vi: '/mute user:@member duration: 1h', en: '/mute user:@member duration: 1h' },
          { vi: '/mute user:@member duration: 1d', en: '/mute user:@member duration: 1d' },
          { vi: '/mute user:@member duration: 7d', en: '/mute user:@member duration: 7d' }
        ],
        notes: {
          vi: 'Duration hỗ trợ các dạng như 10m, 1h, 1d, 7d. Giới hạn tối đa phụ thuộc vào Discord và cấu hình server.',
          en: 'Durations support forms like 10m, 1h, 1d, 7d. Maximum limits depend on Discord and server configuration.'
        },
        related: ['mod-unmute', 'mod-ban', 'banzone-banzone']
      },
      {
        id: 'mod-unmute', icon: '🔊',
        title: { vi: 'Unmute', en: 'Unmute' },
        desc: {
          vi: 'Gỡ timeout của một thành viên.',
          en: "Remove a member's timeout."
        },
        commands: [
          { name: '/unmute', desc: { vi: 'Gỡ timeout cho một thành viên.', en: 'Remove a timeout from a member.' }, perm: { vi: 'Moderate Members + role cao hơn mục tiêu', en: 'Moderate Members + role above target' } }
        ],
        examples: [
          { vi: '/unmute user:@member', en: '/unmute user:@member' }
        ],
        notes: {
          vi: 'Mọi hành động moderation đều tôn trọng quyền Discord và thứ bậc role của bot.',
          en: 'All moderation actions respect Discord permissions and the bot role hierarchy.'
        },
        related: ['mod-mute', 'mod-ban']
      }
    ]
  },

  /* ---------------- BAN ZONE ---------------- */
  {
    id: 'banzone', icon: '☠️',
    title: { vi: 'Ban Zone', en: 'Ban Zone' },
    blurb: {
      vi: 'Hệ thống bảo vệ và kiểm duyệt riêng theo từng server.',
      en: 'A server-specific protection and moderation system.'
    },
    features: [
      {
        id: 'banzone-banzone', icon: '⚙️',
        title: { vi: '/banzone', en: '/banzone' },
        desc: {
          vi: 'Cấu hình hành động tự động mà Ban Zone sẽ sử dụng: Ban hoặc Mute.',
          en: 'Configure the automatic action Ban Zone will use: Ban or Mute.'
        },
        commands: [
          { name: '/banzone', desc: { vi: 'Chọn mode Ban hoặc Mute cho Ban Zone.', en: 'Choose Ban or Mute mode for Ban Zone.' }, perm: { vi: 'Quản lý server / Server Owner', en: 'Manage Server / Server Owner' } }
        ],
        examples: [
          { vi: '/banzone mode: Ban', en: '/banzone mode: Ban' },
          { vi: '/banzone mode: Mute duration: 1d', en: '/banzone mode: Mute duration: 1d' }
        ],
        notes: {
          vi: 'Mode Mute sử dụng timeout của Discord, với duration tối đa theo giới hạn Discord (tối đa 28 ngày).',
          en: "Mute mode uses Discord's timeout, with a maximum duration per Discord's limit (up to 28 days)."
        },
        related: ['banzone-setbanchannel', 'banzone-banwhitelist', 'banzone-bandebug']
      },
      {
        id: 'banzone-setbanchannel', icon: '📍',
        title: { vi: '/setbanchannel', en: '/setbanchannel' },
        desc: {
          vi: 'Đặt kênh được dùng cho các hành động / panel của Ban Zone trong server.',
          en: 'Set the channel used for Ban Zone actions / panel in the server.'
        },
        commands: [
          { name: '/setbanchannel', desc: { vi: 'Chỉ định kênh Ban Zone cho server.', en: 'Assign the Ban Zone channel for the server.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/setbanchannel channel:#ban-zone', en: '/setbanchannel channel:#ban-zone' }
        ],
        notes: {
          vi: 'Cấu hình được lưu riêng cho từng server. Nếu kênh Ban Zone bị xoá, Nova có cơ chế phát hiện và khôi phục theo cấu hình hiện tại.',
          en: 'Configuration is stored per server. If the Ban Zone channel is deleted, Nova can detect it and restore based on current configuration.'
        },
        related: ['banzone-banzone', 'banzone-protection']
      },
      {
        id: 'banzone-banwhitelist', icon: '📋',
        title: { vi: '/banwhitelist', en: '/banwhitelist' },
        desc: {
          vi: 'Quản lý whitelist Ban Zone. Chỉ Server Owner có thể quản lý whitelist của server mình.',
          en: 'Manage the Ban Zone whitelist. Only the Server Owner can manage their own server whitelist.'
        },
        commands: [
          { name: '/banwhitelist add', desc: { vi: 'Thêm người dùng vào whitelist.', en: 'Add a user to the whitelist.' }, perm: { vi: 'Server Owner', en: 'Server Owner' } },
          { name: '/banwhitelist remove', desc: { vi: 'Xoá người dùng khỏi whitelist.', en: 'Remove a user from the whitelist.' }, perm: { vi: 'Server Owner', en: 'Server Owner' } },
          { name: '/banwhitelist list', desc: { vi: 'Xem danh sách whitelist hiện tại.', en: 'View the current whitelist.' }, perm: { vi: 'Server Owner', en: 'Server Owner' } }
        ],
        examples: [
          { vi: '/banwhitelist add user:@member', en: '/banwhitelist add user:@member' },
          { vi: '/banwhitelist list', en: '/banwhitelist list' }
        ],
        notes: {
          vi: 'Whitelist hoàn toàn độc lập giữa các server. Người được whitelist ở Server A không tự động được whitelist ở Server B.',
          en: 'Whitelists are fully independent per server. A user whitelisted in Server A is NOT automatically whitelisted in Server B.'
        },
        related: ['banzone-banzone', 'banzone-bandebug']
      },
      {
        id: 'banzone-bandebug', icon: '🐞',
        title: { vi: '/bandebug', en: '/bandebug' },
        desc: {
          vi: 'Xem và kiểm tra hành vi hiện tại của Ban Zone để đảm bảo cấu hình hoạt động đúng.',
          en: 'View and inspect current Ban Zone behavior to make sure configuration works as expected.'
        },
        commands: [
          { name: '/bandebug', desc: { vi: 'Xem trạng thái và hành vi của Ban Zone.', en: 'Inspect Ban Zone status and behavior.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/bandebug', en: '/bandebug' }
        ],
        notes: {
          vi: 'Dùng để kiểm tra mode, kênh và whitelist trước khi bật bảo vệ thực tế.',
          en: 'Use it to verify mode, channel and whitelist before enabling real protection.'
        },
        related: ['banzone-banzone', 'banzone-setbanchannel']
      },
      {
        id: 'banzone-protection', icon: '🛑',
        title: { vi: 'Ban Zone protection', en: 'Ban Zone protection' },
        desc: {
          vi: 'Ban Zone có thể theo dõi việc xoá kênh đã cấu hình và phản ứng với hành vi xoá không được phép, tuỳ theo thứ bậc role của bot và cấu hình server.',
          en: 'Ban Zone can monitor deletion of the configured channel and react to unauthorized deletion according to the bot role hierarchy and server configuration.'
        },
        commands: [],
        examples: [],
        notes: {
          vi: 'Nova không thể thực hiện hành động vượt quá quyền hạn thực tế của bot. Nếu bot không đủ role, hành động bảo vệ sẽ không thực thi được.',
          en: 'Nova cannot perform actions beyond the bot actual permissions. If the bot lacks sufficient role, protection actions cannot execute.'
        },
        related: ['banzone-setbanchannel', 'banzone-cleanup']
      },
      {
        id: 'banzone-cleanup', icon: '🧹',
        title: { vi: '24-hour cleanup', en: '24-hour cleanup' },
        desc: {
          vi: 'Ban Zone có thể xoá các tin nhắn gần đây liên quan tới hành động được bảo vệ trong khoảng thời gian dọn dẹp đã cấu hình.',
          en: 'Ban Zone can remove recent messages associated with the protected action within the configured cleanup window.'
        },
        commands: [],
        examples: [],
        notes: {
          vi: 'Discord giới hạn khả năng xoá tin nhắn hàng loạt. Nova chỉ thực hiện trong phạm vi Discord thực sự cho phép.',
          en: 'Discord limits bulk message deletion. Nova only operates within what Discord actually allows.'
        },
        related: ['banzone-protection', 'banzone-banzone']
      }
    ]
  },

  /* ---------------- WAR / BACKUP ---------------- */
  {
    id: 'war', icon: '⚔️',
    title: { vi: 'War / Backup', en: 'War / Backup' },
    blurb: {
      vi: 'Tạo và quản lý phiên War / Backup với ping role, panel và quyền End.',
      en: 'Create and manage War / Backup sessions with ping roles, panels and End permissions.'
    },
    features: [
      {
        id: 'war-war', icon: '⚔️',
        title: { vi: 'War', en: 'War' },
        desc: {
          vi: 'Tạo và quản lý phiên War, đồng thời thông báo cho thành viên qua War Ping Role đã cấu hình.',
          en: 'Create and manage War sessions, and notify members using the configured War Ping Role.'
        },
        commands: [
          { name: 'War', desc: { vi: 'Tạo phiên War và ping role War.', en: 'Create a War session and ping the War role.' }, perm: { vi: 'Thành viên có quyền tạo theo cấu hình', en: 'Members allowed by server configuration' } }
        ],
        examples: [],
        notes: {
          vi: 'Phiên War có thread riêng, giúp thảo luận tách biệt khỏi kênh chính.',
          en: 'War sessions have their own thread, keeping discussion separate from the main channel.'
        },
        related: ['war-backup', 'war-win', 'war-end']
      },
      {
        id: 'war-backup', icon: '🛟',
        title: { vi: 'Backup', en: 'Backup' },
        desc: {
          vi: 'Tạo và quản lý phiên Backup, đồng thời thông báo cho thành viên qua Backup Ping Role đã cấu hình.',
          en: 'Create and manage Backup sessions, and notify members using the configured Backup Ping Role.'
        },
        commands: [
          { name: 'Backup', desc: { vi: 'Tạo phiên Backup và ping role Backup.', en: 'Create a Backup session and ping the Backup role.' }, perm: { vi: 'Thành viên có quyền tạo theo cấu hình', en: 'Members allowed by server configuration' } }
        ],
        examples: [],
        notes: {
          vi: 'Cấu hình role riêng cho Backup trong phần Configuration.',
          en: 'Backup roles are configured separately in the Configuration section.'
        },
        related: ['war-war', 'war-end', 'war-config']
      },
      {
        id: 'war-win', icon: '🏅',
        title: { vi: 'Win', en: 'Win' },
        desc: {
          vi: 'Kết thúc phiên War / Backup với kết quả Win.',
          en: 'End a War / Backup session with the Win result.'
        },
        commands: [
          { name: 'Win', desc: { vi: 'Kết thúc phiên với kết quả thắng.', en: 'End the session with a win result.' }, perm: { vi: 'Phụ thuộc cấu hình server', en: 'Depends on server configuration' } }
        ],
        examples: [],
        notes: {
          vi: 'Server có thể giới hạn thành viên thường được dùng nút Win hay không.',
          en: 'Servers can restrict whether regular members may use the Win button.'
        },
        related: ['war-lose', 'war-end', 'war-button-perms']
      },
      {
        id: 'war-lose', icon: '💀',
        title: { vi: 'Lose', en: 'Lose' },
        desc: {
          vi: 'Kết thúc phiên War / Backup với kết quả Lose.',
          en: 'End a War / Backup session with the Lose result.'
        },
        commands: [
          { name: 'Lose', desc: { vi: 'Kết thúc phiên với kết quả thua.', en: 'End the session with a loss result.' }, perm: { vi: 'Phụ thuộc cấu hình server', en: 'Depends on server configuration' } }
        ],
        examples: [],
        notes: {
          vi: 'Tương tự Win, quyền dùng nút Lose do cấu hình server quyết định.',
          en: 'Like Win, permission to use the Lose button is controlled by server configuration.'
        },
        related: ['war-win', 'war-end', 'war-button-perms']
      },
      {
        id: 'war-end', icon: '🏁',
        title: { vi: 'End', en: 'End' },
        desc: {
          vi: 'Kết thúc một phiên War / Backup đang hoạt động.',
          en: 'End an active War / Backup session.'
        },
        commands: [
          { name: 'End', desc: { vi: 'Kết thúc phiên đang hoạt động.', en: 'End the active session.' }, perm: { vi: 'Phụ thuộc cấu hình server', en: 'Depends on server configuration' } }
        ],
        examples: [],
        notes: {
          vi: 'Dùng khi phiên cần đóng mà không ghi nhận thắng/thua.',
          en: 'Use when a session needs to close without recording a win/loss.'
        },
        related: ['war-endall', 'war-win', 'war-lose']
      },
      {
        id: 'war-endall', icon: '🗂️',
        title: { vi: '/end all', en: '/end all' },
        desc: {
          vi: 'Kết thúc toàn bộ phiên War / Backup đang hoạt động trong server hiện tại.',
          en: 'End all active War / Backup sessions in the current server.'
        },
        commands: [
          { name: '/end all', desc: { vi: 'Đóng tất cả phiên War / Backup đang mở.', en: 'Close every open War / Backup session.' }, perm: { vi: 'Quản lý server / người được tin cậy', en: 'Manage Server / trusted users' } }
        ],
        examples: [
          { vi: '/end all', en: '/end all' }
        ],
        notes: {
          vi: 'Hữu ích khi có nhiều phiên bị treo cùng lúc.',
          en: 'Useful when several sessions are stuck at the same time.'
        },
        related: ['war-end', 'war-war', 'war-backup']
      },
      {
        id: 'war-button-perms', icon: '🔐',
        title: { vi: 'Button permissions', en: 'Button permissions' },
        desc: {
          vi: 'Cấu hình server có thể quyết định thành viên thường có được dùng các nút Win, Lose, End hay không. Nếu tắt, chỉ người được phép theo cấu hình mới dùng được.',
          en: 'Server configuration can control whether regular members may use the Win, Lose and End buttons. If disabled, only permitted users can use them.'
        },
        commands: [],
        examples: [],
        notes: {
          vi: 'Đây là cấu hình theo từng server, không ảnh hưởng server khác.',
          en: 'This is per-server configuration and does not affect other servers.'
        },
        related: ['war-win', 'war-lose', 'war-end']
      },
      {
        id: 'war-callhacker', icon: '🥷',
        title: { vi: 'Call Hacker', en: 'Call Hacker' },
        desc: {
          vi: 'Hiện hoặc ẩn nút Call Hacker trong panel War / Backup.',
          en: 'Show or hide the Call Hacker button in War / Backup panels.'
        },
        commands: [
          { name: '/callhacker show', desc: { vi: 'Hiện nút Call Hacker.', en: 'Show the Call Hacker button.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } },
          { name: '/callhacker hide', desc: { vi: 'Ẩn nút Call Hacker.', en: 'Hide the Call Hacker button.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/callhacker show', en: '/callhacker show' },
          { vi: '/callhacker hide', en: '/callhacker hide' }
        ],
        notes: {
          vi: 'Nút Call Hacker dùng Hacker Role đã cấu hình trong server.',
          en: 'The Call Hacker button uses the Hacker Role configured for the server.'
        },
        related: ['war-config', 'config-hacker-role']
      },
      {
        id: 'war-config', icon: '🧩',
        title: { vi: 'Configuration', en: 'Configuration' },
        desc: {
          vi: 'Các role có thể cấu hình cho War / Backup: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role.',
          en: 'Configurable roles for War / Backup: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role.'
        },
        commands: [
          { name: '/config war_ping_role', desc: { vi: 'Cấu hình role ping cho War.', en: 'Configure the War ping role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } },
          { name: '/config backup_ping_role', desc: { vi: 'Cấu hình role ping cho Backup.', en: 'Configure the Backup ping role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } },
          { name: '/config joined_war_role', desc: { vi: 'Cấu hình role cho người tham gia War.', en: 'Configure the role for War joiners.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } },
          { name: '/config joined_backup_role', desc: { vi: 'Cấu hình role cho người tham gia Backup.', en: 'Configure the role for Backup joiners.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } },
          { name: '/config hacker_role', desc: { vi: 'Cấu hình Hacker Role.', en: 'Configure the Hacker Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [],
        notes: {
          vi: 'Toàn bộ cấu hình được lưu riêng theo từng server.',
          en: 'All configuration is stored per server.'
        },
        related: ['config-view', 'war-callhacker']
      }
    ]
  },

  /* ---------------- EVENT ---------------- */
  {
    id: 'event', icon: '🏆',
    title: { vi: 'Event', en: 'Event' },
    blurb: {
      vi: 'Tạo event với panel tham gia, quản lý danh sách và blacklist.',
      en: 'Create events with a join panel, participant management and blacklist.'
    },
    features: [
      {
        id: 'event-create', icon: '🎉',
        title: { vi: 'Tạo event', en: 'Create events' },
        desc: {
          vi: 'Nova cho phép tạo event trong server với panel tham gia, quản lý danh sách người tham gia và công bố kết quả.',
          en: 'Nova lets you create events in your server with a join panel, participant management and result announcement.'
        },
        commands: [
          { name: '/event send', desc: { vi: 'Gửi / tạo panel event.', en: 'Send / create the event panel.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event send', en: '/event send' }
        ],
        notes: {
          vi: 'Panel event cho phép thành viên tham gia bằng nút, danh sách được cập nhật theo thời gian thực.',
          en: 'The event panel lets members join via button, with the list updated in real time.'
        },
        related: ['event-send', 'event-test', 'event-participants']
      },
      {
        id: 'event-send', icon: '📤',
        title: { vi: '/event send', en: '/event send' },
        desc: {
          vi: 'Gửi và tạo panel event trong kênh được chỉ định.',
          en: 'Send and create the event panel in the specified channel.'
        },
        commands: [
          { name: '/event send', desc: { vi: 'Tạo panel event để thành viên tham gia.', en: 'Create the event panel for members to join.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event send channel:#events title: Giải đấu cuối tuần', en: '/event send channel:#events title: Weekend Tournament' }
        ],
        notes: {
          vi: 'Có thể tuỳ chỉnh tiêu đề và mô tả cho event.',
          en: 'You can customise the event title and description.'
        },
        related: ['event-create', 'event-test', 'event-blacklist']
      },
      {
        id: 'event-test', icon: '🧪',
        title: { vi: '/event test', en: '/event test' },
        desc: {
          vi: 'Kiểm thử panel / chức năng event trước khi triển khai chính thức.',
          en: 'Test the event panel / functionality before going live.'
        },
        commands: [
          { name: '/event test', desc: { vi: 'Chạy thử panel event.', en: 'Run a test of the event panel.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event test', en: '/event test' }
        ],
        notes: {
          vi: 'Nên test trước khi mở đăng ký thật cho thành viên.',
          en: 'Test before opening real registration for members.'
        },
        related: ['event-send', 'event-create']
      },
      {
        id: 'event-participants', icon: '👥',
        title: { vi: '/event participants', en: '/event participants' },
        desc: {
          vi: 'Xem danh sách người tham gia event hiện tại.',
          en: 'View the current event participant list.'
        },
        commands: [
          { name: '/event participants', desc: { vi: 'Xem danh sách người tham gia.', en: 'View the participant list.' }, perm: { vi: 'Mọi thành viên / quản lý server', en: 'Everyone / Manage Server' } }
        ],
        examples: [
          { vi: '/event participants', en: '/event participants' }
        ],
        notes: {
          vi: 'Danh sách phản ánh trạng thái đăng ký mới nhất.',
          en: 'The list reflects the latest registration state.'
        },
        related: ['event-count', 'event-remove', 'event-clear']
      },
      {
        id: 'event-count', icon: '🔢',
        title: { vi: '/event count', en: '/event count' },
        desc: {
          vi: 'Xem số lượng người tham gia event.',
          en: 'View the participant count.'
        },
        commands: [
          { name: '/event count', desc: { vi: 'Xem tổng số người tham gia.', en: 'View the total participant count.' }, perm: { vi: 'Mọi thành viên / quản lý server', en: 'Everyone / Manage Server' } }
        ],
        examples: [
          { vi: '/event count', en: '/event count' }
        ],
        notes: {
          vi: 'Hữu ích khi cần kiểm tra nhanh số lượng trước khi bắt đầu.',
          en: 'Useful for a quick check before the event starts.'
        },
        related: ['event-participants', 'event-clear']
      },
      {
        id: 'event-remove', icon: '➖',
        title: { vi: '/event remove', en: '/event remove' },
        desc: {
          vi: 'Xoá một người tham gia khỏi danh sách event.',
          en: 'Remove a participant from the event list.'
        },
        commands: [
          { name: '/event remove', desc: { vi: 'Xoá một người tham gia.', en: 'Remove one participant.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event remove user:@member', en: '/event remove user:@member' }
        ],
        notes: {
          vi: 'Đây là lệnh quản lý, cần quyền phù hợp.',
          en: 'This is a management command and requires appropriate permissions.'
        },
        related: ['event-participants', 'event-clear', 'event-blacklist']
      },
      {
        id: 'event-clear', icon: '🗑️',
        title: { vi: '/event clear', en: '/event clear' },
        desc: {
          vi: 'Xoá toàn bộ danh sách người tham gia event.',
          en: 'Clear all event participants.'
        },
        commands: [
          { name: '/event clear', desc: { vi: 'Xoá toàn bộ danh sách tham gia.', en: 'Clear the entire participant list.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event clear', en: '/event clear' }
        ],
        notes: {
          vi: 'Thao tác này không thể hoàn tác. Cân nhắc trước khi dùng.',
          en: 'This action cannot be undone. Consider carefully before using it.'
        },
        related: ['event-remove', 'event-participants']
      },
      {
        id: 'event-blacklist', icon: '🚫',
        title: { vi: '/event blacklist', en: '/event blacklist' },
        desc: {
          vi: 'Quản lý blacklist của event — những người không được phép tham gia.',
          en: 'Manage the event blacklist — users who are not allowed to join.'
        },
        commands: [
          { name: '/event blacklist', desc: { vi: 'Thêm / xoá / xem blacklist event.', en: 'Add / remove / view the event blacklist.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/event blacklist add user:@member', en: '/event blacklist add user:@member' },
          { vi: '/event blacklist list', en: '/event blacklist list' }
        ],
        notes: {
          vi: 'Blacklist giúp ngăn người không mong muốn tham gia event.',
          en: 'The blacklist prevents unwanted users from joining events.'
        },
        related: ['event-remove', 'event-clear']
      }
    ]
  },

  /* ---------------- SERVER INFORMATION ---------------- */
  {
    id: 'server', icon: 'ℹ️',
    title: { vi: 'Server Information', en: 'Server Information' },
    blurb: {
      vi: 'Xem thông tin bot, server và thành viên ngay trong Discord.',
      en: 'View bot, server and member information right inside Discord.'
    },
    features: [
      {
        id: 'server-info', icon: '🤖',
        title: { vi: '/info', en: '/info' },
        desc: {
          vi: 'Hiển thị trạng thái AI / dịch vụ hiện tại của Nova và các thông tin cấu hình server có thể công khai cho người dùng.',
          en: 'Shows Nova current AI / service status and relevant server configuration information available to the user.'
        },
        commands: [
          { name: '/info', desc: { vi: 'Xem trạng thái và thông tin Nova.', en: 'View Nova status and information.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/info', en: '/info' }
        ],
        notes: {
          vi: 'Không hiển thị thông tin nội bộ, khoá API hay cấu hình riêng tư.',
          en: 'Does not display internal information, API keys or private configuration.'
        },
        related: ['server-serverinfo', 'server-userinfo']
      },
      {
        id: 'server-serverinfo', icon: '🏠',
        title: { vi: '/serverinfo', en: '/serverinfo' },
        desc: {
          vi: 'Hiển thị thông tin về server Discord hiện tại.',
          en: 'Shows information about the current Discord server.'
        },
        commands: [
          { name: '/serverinfo', desc: { vi: 'Xem thông tin server hiện tại.', en: 'View current server information.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/serverinfo', en: '/serverinfo' }
        ],
        notes: {
          vi: 'Bao gồm các thông tin cơ bản mà bot có thể truy cập.',
          en: 'Includes basic information the bot can access.'
        },
        related: ['server-info', 'server-userinfo']
      },
      {
        id: 'server-userinfo', icon: '👤',
        title: { vi: '/userinfo', en: '/userinfo' },
        desc: {
          vi: 'Hiển thị thông tin về một thành viên / người dùng Discord.',
          en: 'Shows information about a Discord member / user.'
        },
        commands: [
          { name: '/userinfo', desc: { vi: 'Xem thông tin thành viên.', en: 'View member information.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/userinfo user:@member', en: '/userinfo user:@member' }
        ],
        notes: {
          vi: 'Chỉ hiển thị thông tin công khai mà Discord cung cấp.',
          en: 'Only displays public information provided by Discord.'
        },
        related: ['server-info', 'server-serverinfo']
      }
    ]
  },

  /* ---------------- CONFIGURATION ---------------- */
  {
    id: 'config', icon: '🔐',
    title: { vi: 'Configuration', en: 'Configuration' },
    blurb: {
      vi: 'Quản lý server có thể cấu hình các tính năng được hỗ trợ của Nova.',
      en: 'Server managers can configure supported Nova features.'
    },
    features: [
      {
        id: 'config-view', icon: '📄',
        title: { vi: '/config view', en: '/config view' },
        desc: {
          vi: 'Xem cấu hình hiện tại của Nova trong server.',
          en: 'View the current Nova configuration in the server.'
        },
        commands: [
          { name: '/config view', desc: { vi: 'Xem toàn bộ cấu hình hiện tại.', en: 'View all current configuration.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config view', en: '/config view' }
        ],
        notes: {
          vi: 'Cấu hình là riêng biệt cho từng server.',
          en: 'Configuration is specific to each server.'
        },
        related: ['config-help-channel', 'config-war-ping-role']
      },
      {
        id: 'config-help-channel', icon: '❓',
        title: { vi: '/config help_channel', en: '/config help_channel' },
        desc: {
          vi: 'Cấu hình kênh Help cho server.',
          en: 'Configure the Help channel for the server.'
        },
        commands: [
          { name: '/config help_channel', desc: { vi: 'Đặt kênh help.', en: 'Set the help channel.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config help_channel channel:#help', en: '/config help_channel channel:#help' }
        ],
        notes: {
          vi: 'Kênh help dùng để hướng dẫn thành viên sử dụng Nova.',
          en: 'The help channel is used to guide members on using Nova.'
        },
        related: ['config-view', 'help-overview']
      },
      {
        id: 'config-war-ping-role', icon: '⚔️',
        title: { vi: '/config war_ping_role', en: '/config war_ping_role' },
        desc: {
          vi: 'Cấu hình role được ping khi tạo phiên War.',
          en: 'Configure the role pinged when a War session is created.'
        },
        commands: [
          { name: '/config war_ping_role', desc: { vi: 'Đặt War Ping Role.', en: 'Set the War Ping Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config war_ping_role role:@War Ping', en: '/config war_ping_role role:@War Ping' }
        ],
        notes: {
          vi: 'Nên chọn role ít bị ping ngoài mục đích War.',
          en: 'Choose a role that is not pinged for unrelated purposes.'
        },
        related: ['war-war', 'config-backup-ping-role']
      },
      {
        id: 'config-backup-ping-role', icon: '🛟',
        title: { vi: '/config backup_ping_role', en: '/config backup_ping_role' },
        desc: {
          vi: 'Cấu hình role được ping khi tạo phiên Backup.',
          en: 'Configure the role pinged when a Backup session is created.'
        },
        commands: [
          { name: '/config backup_ping_role', desc: { vi: 'Đặt Backup Ping Role.', en: 'Set the Backup Ping Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config backup_ping_role role:@Backup Ping', en: '/config backup_ping_role role:@Backup Ping' }
        ],
        notes: {
          vi: 'Tách biệt với War Ping Role để tránh ping sai nhóm.',
          en: 'Separate from War Ping Role to avoid pinging the wrong group.'
        },
        related: ['war-backup', 'config-war-ping-role']
      },
      {
        id: 'config-joined-war-role', icon: '➕',
        title: { vi: '/config joined_war_role', en: '/config joined_war_role' },
        desc: {
          vi: 'Cấu hình role được cấp / dùng cho người tham gia phiên War.',
          en: 'Configure the role given / used for War session joiners.'
        },
        commands: [
          { name: '/config joined_war_role', desc: { vi: 'Đặt Joined War Role.', en: 'Set the Joined War Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config joined_war_role role:@War Joined', en: '/config joined_war_role role:@War Joined' }
        ],
        notes: {
          vi: 'Giúp theo dõi ai đã tham gia War.',
          en: 'Helps track who has joined a War.'
        },
        related: ['config-joined-backup-role', 'war-war']
      },
      {
        id: 'config-joined-backup-role', icon: '➕',
        title: { vi: '/config joined_backup_role', en: '/config joined_backup_role' },
        desc: {
          vi: 'Cấu hình role được cấp / dùng cho người tham gia phiên Backup.',
          en: 'Configure the role given / used for Backup session joiners.'
        },
        commands: [
          { name: '/config joined_backup_role', desc: { vi: 'Đặt Joined Backup Role.', en: 'Set the Joined Backup Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config joined_backup_role role:@Backup Joined', en: '/config joined_backup_role role:@Backup Joined' }
        ],
        notes: {
          vi: 'Tách biệt với Joined War Role.',
          en: 'Separate from the Joined War Role.'
        },
        related: ['config-joined-war-role', 'war-backup']
      },
      {
        id: 'config-hacker-role', icon: '🥷',
        title: { vi: '/config hacker_role', en: '/config hacker_role' },
        desc: {
          vi: 'Cấu hình Hacker Role cho server.',
          en: 'Configure the Hacker Role for the server.'
        },
        commands: [
          { name: '/config hacker_role', desc: { vi: 'Đặt Hacker Role.', en: 'Set the Hacker Role.' }, perm: { vi: 'Quản lý server', en: 'Manage Server' } }
        ],
        examples: [
          { vi: '/config hacker_role role:@Hacker', en: '/config hacker_role role:@Hacker' }
        ],
        notes: {
          vi: 'Hacker Role được dùng bởi nút Call Hacker trong panel War / Backup.',
          en: 'The Hacker Role is used by the Call Hacker button in War / Backup panels.'
        },
        related: ['war-callhacker', 'config-view']
      }
    ]
  },

  /* ---------------- HELP SYSTEM ---------------- */
  {
    id: 'help', icon: '📖',
    title: { vi: 'Help System', en: 'Help System' },
    blurb: {
      vi: 'Menu trợ giúp tương tác với danh mục và dropdown.',
      en: 'An interactive help menu with categories and a dropdown.'
    },
    features: [
      {
        id: 'help-overview', icon: '📖',
        title: { vi: '!help', en: '!help' },
        desc: {
          vi: 'Mở menu Categories của Nova. Menu dùng danh mục và dropdown để bạn điều hướng tính năng mà không phải đọc một "bức tường chữ".',
          en: "Opens Nova's Categories menu. The menu uses categories and a dropdown so you can navigate features without reading a huge wall of text."
        },
        commands: [
          { name: '!help', desc: { vi: 'Mở menu danh mục trợ giúp.', en: 'Open the help categories menu.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '!help', en: '!help' }
        ],
        notes: {
          vi: 'Menu hiển thị danh mục: AI, Moderation, Ban Zone, War / Backup, Event, Server Information, Configuration, Help System.',
          en: 'The menu shows categories: AI, Moderation, Ban Zone, War / Backup, Event, Server Information, Configuration, Help System.'
        },
        related: ['help-feature', 'help-categories']
      },
      {
        id: 'help-feature', icon: '🎯',
        title: { vi: '!help <feature>', en: '!help <feature>' },
        desc: {
          vi: 'Chỉ hiển thị hướng dẫn chi tiết của đúng tính năng / lệnh bạn chọn, thay vì toàn bộ danh sách.',
          en: "Shows ONLY the selected feature / command's detailed instructions."
        },
        commands: [
          { name: '!help chat', desc: { vi: 'Hướng dẫn tính năng AI Chat.', en: 'Instructions for AI Chat.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help image', desc: { vi: 'Hướng dẫn tạo ảnh AI.', en: 'Instructions for AI image generation.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help ban', desc: { vi: 'Hướng dẫn lệnh ban.', en: 'Instructions for the ban command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help unban', desc: { vi: 'Hướng dẫn lệnh unban.', en: 'Instructions for the unban command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help mute', desc: { vi: 'Hướng dẫn lệnh mute.', en: 'Instructions for the mute command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help unmute', desc: { vi: 'Hướng dẫn lệnh unmute.', en: 'Instructions for the unmute command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help banzone', desc: { vi: 'Hướng dẫn Ban Zone.', en: 'Instructions for Ban Zone.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help banwhitelist', desc: { vi: 'Hướng dẫn whitelist Ban Zone.', en: 'Instructions for the Ban Zone whitelist.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help event', desc: { vi: 'Hướng dẫn tạo event.', en: 'Instructions for creating events.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } },
          { name: '!help config', desc: { vi: 'Hướng dẫn cấu hình server.', en: 'Instructions for server configuration.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '!help chat', en: '!help chat' },
          { vi: '!help banzone', en: '!help banzone' },
          { vi: '!help config', en: '!help config' }
        ],
        notes: {
          vi: 'Cách này giúp bạn nhận đúng thông tin cần thiết mà không phải cuộn qua toàn bộ menu.',
          en: 'This gives you exactly the information you need without scrolling through the whole menu.'
        },
        related: ['help-overview', 'help-categories']
      },
      {
        id: 'help-categories', icon: '🗂️',
        title: { vi: 'Categories & Dropdown', en: 'Categories & Dropdown' },
        desc: {
          vi: 'Help Menu tổ chức theo danh mục và dùng dropdown để chọn. Khi chọn một danh mục, chỉ nội dung của danh mục đó được hiển thị.',
          en: 'The Help Menu is organised by category and uses a dropdown to select. Selecting a category shows only that category content.'
        },
        commands: [
          { name: '/help', desc: { vi: 'Mở help dạng slash command.', en: 'Open help as a slash command.' }, perm: { vi: 'Mọi thành viên', en: 'Everyone' } }
        ],
        examples: [
          { vi: '/help', en: '/help' }
        ],
        notes: {
          vi: 'Danh mục trong Help Menu: AI, Moderation, Ban Zone, War / Backup, Event, Server Information, Configuration, Help System.',
          en: 'Help Menu categories: AI, Moderation, Ban Zone, War / Backup, Event, Server Information, Configuration, Help System.'
        },
        related: ['help-overview', 'help-feature']
      }
    ]
  }
];

/* Flat feature index */
const FEATURE_INDEX = {};
CATEGORIES.forEach(cat => {
  cat.features.forEach(f => {
    FEATURE_INDEX[f.id] = { ...f, catId: cat.id, catTitle: cat.title, catIcon: cat.icon };
  });
});

/* ============================================================
   I18N — UI STRINGS (EN). Vietnamese lives inline in the HTML
   and is restored from the original DOM snapshot.
   ============================================================ */
const I18N = {
  vi: {
    'nav.home': 'Trang chủ',
    'nav.features': 'Tính năng',
    'nav.commands': 'Lệnh',
    'nav.ai': 'AI',
    'nav.moderation': 'Moderation',
    'nav.war': 'War',
    'nav.event': 'Event',
    'nav.help': 'Trợ giúp',
    'nav.privacy': 'Bảo mật',
    'nav.terms': 'Điều khoản',
    'nav.invite': 'Mời Nova',

    'hero.tagline': 'Trợ lý thông minh cho Discord.',
    'hero.subtitle': 'AI chat, tạo ảnh AI, công cụ server, moderation, Ban Zone, War / Backup, Event và các tiện ích cấu hình — tất cả ngay trong Discord.',
    'hero.invite': 'Mời Nova',
    'hero.support': 'Tham gia Support Server',
    'hero.explore': 'Khám phá tính năng',

    'features.eyebrow': 'Tính năng',
    'features.title': 'Tính năng <em>mạnh mẽ.</em>',
    'features.sub': 'Chọn một nhóm bên dưới để xem chi tiết từng tính năng và lệnh tương ứng.',

    'commands.eyebrow': 'Danh mục lệnh',
    'commands.title': 'Toàn bộ <em>lệnh</em>',
    'commands.sub': 'Tìm kiếm hoặc duyệt theo nhóm. Nhấn vào một lệnh để xem chi tiết.',
    'search.placeholder': 'Tìm lệnh… (ban, image, war, event, config…)',
    'search.noresults': 'Không tìm thấy lệnh nào phù hợp.',

    'help.eyebrow': 'Help System',
    'help.title': 'Menu trợ giúp <em>tương tác</em>',
    'help.sub': 'Dùng <code>!help</code> để mở menu, hoặc <code>!help &lt;feature&gt;</code> để xem đúng mục bạn cần.',
    'help.head': 'Nova Help Menu',
    'help.categories': 'Danh mục',
    'help.menuTitle': '📖 Help Menu',
    'help.menuDesc': 'Chọn một danh mục trong dropdown để xem chi tiết. Menu chỉ hiển thị phần bạn chọn, tránh một "bức tường chữ".',
    'help.select': 'Đưa ra lựa chọn',
    'help.tip': '💡 Mẹo',
    'help.tipText': 'Bạn cũng có thể gõ trực tiếp <code>!help chat</code>, <code>!help ban</code>, <code>!help event</code>… để nhảy thẳng tới mục tương ứng.',

    'cta.title': 'Sẵn sàng dùng thử <em>Nova?</em>',
    'cta.desc': 'Mời Nova vào server của bạn — miễn phí, không cần cấu hình phức tạp.',
    'cta.invite': 'Mời Nova',
    'cta.support': 'Tham gia Support Server',

    'footer.tagline': 'AI-powered Discord bot.',
    'footer.nav': 'Điều hướng',
    'footer.community': 'Cộng đồng',
    'footer.legal': 'Pháp lý',
    'footer.contact': 'Liên hệ',
    'footer.copyright': '© 2026 Nova. All rights reserved.',
    'footer.effective': 'Ngày hiệu lực',

    'meta.effective': 'Ngày hiệu lực',

    'modal.commands': 'Lệnh',
    'modal.examples': 'Ví dụ',
    'modal.permissions': 'Quyền',
    'modal.notes': 'Lưu ý',
    'modal.related': 'Tính năng liên quan',
    'modal.permLabel': 'Quyền',
    'cmd.groupCount': 'lệnh',

    /* legal page titles */
    'pp.title': 'Chính sách <em>bảo mật</em>',
    'pp.sub': 'Cách Nova xử lý dữ liệu khi bạn sử dụng bot.',
    'tos.title': 'Điều khoản <em>dịch vụ</em>',
    'tos.sub': 'Các quy định khi sử dụng Nova.'
  },

  en: {
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.commands': 'Commands',
    'nav.ai': 'AI',
    'nav.moderation': 'Moderation',
    'nav.war': 'War',
    'nav.event': 'Event',
    'nav.help': 'Help',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'nav.invite': 'Invite Nova',

    'hero.tagline': 'Your intelligent Discord companion.',
    'hero.subtitle': 'AI chat, AI image generation, server utilities, moderation, Ban Zone, War / Backup tools, events and configurable utilities — all inside Discord.',
    'hero.invite': 'Invite Nova',
    'hero.support': 'Join Support Server',
    'hero.explore': 'Explore Features',

    'features.eyebrow': 'Features',
    'features.title': 'Powerful <em>features.</em>',
    'features.sub': 'Pick a group below to see each feature in detail along with its commands.',

    'commands.eyebrow': 'Command Directory',
    'commands.title': 'All <em>commands</em>',
    'commands.sub': 'Search or browse by group. Click a command to see the details.',
    'search.placeholder': 'Search commands… (ban, image, war, event, config…)',
    'search.noresults': 'No matching commands found.',

    'help.eyebrow': 'Help System',
    'help.title': 'Interactive <em>help menu</em>',
    'help.sub': 'Use <code>!help</code> to open the menu, or <code>!help &lt;feature&gt;</code> to jump straight to what you need.',
    'help.head': 'Nova Help Menu',
    'help.categories': 'Categories',
    'help.menuTitle': '📖 Help Menu',
    'help.menuDesc': 'Pick a category from the dropdown to see its details. The menu only shows what you select, so you never get a huge wall of text.',
    'help.select': 'Make a selection',
    'help.tip': '💡 Tip',
    'help.tipText': 'You can also type <code>!help chat</code>, <code>!help ban</code>, <code>!help event</code>… to jump straight to the matching entry.',

    'cta.title': 'Ready to try <em>Nova?</em>',
    'cta.desc': 'Invite Nova to your server — free, no complex setup required.',
    'cta.invite': 'Invite Nova',
    'cta.support': 'Join Support Server',

    'footer.tagline': 'AI-powered Discord bot.',
    'footer.nav': 'Navigation',
    'footer.community': 'Community',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Nova. All rights reserved.',
    'footer.effective': 'Effective Date',

    'meta.effective': 'Effective Date',

    'modal.commands': 'Commands',
    'modal.examples': 'Examples',
    'modal.permissions': 'Permissions',
    'modal.notes': 'Important notes',
    'modal.related': 'Related features',
    'modal.permLabel': 'Permission',
    'cmd.groupCount': 'commands',

    /* legal pages — EN content (VI lives inline in the HTML) */
    'pp.title': 'Privacy <em>Policy</em>',
    'pp.sub': 'How Nova handles your data when you use the bot.',
    'pp.s01t': 'Introduction',
    'pp.s01': '<p>Nova ("the bot", "we") is a Discord bot providing AI Chatbot, AI Image, War Ping / Backup Ping, Event, Ban Zone and moderation tools. Nova is operated by <strong>nova_.inovation</strong>.</p><p>This policy explains what kinds of data Nova may process when you or your server use the bot, and how that data is used and protected.</p><p>By inviting Nova to a server or interacting with the bot, you agree to this policy. If you do not agree, please do not use Nova.</p>',
    'pp.s02t': 'Information Nova may process',
    'pp.s02': '<p>Depending on the features you use, Nova may process the following categories of data:</p><ul><li>Identifiers provided by Discord (User ID, Server ID, Channel ID, Role ID, Message ID).</li><li>Command interaction data needed to execute your request.</li><li>Server configuration data (help channel, ping roles, trusted users, Ban Zone configuration).</li><li>AI data (prompts, message content sent to the AI, conversation context, persona, language).</li><li>Moderation-related data required by the feature (whitelist, ban/mute actions, related logs).</li></ul><p>Nova does not intentionally collect data beyond what is required to operate the features above.</p>',
    'pp.s03t': 'Discord identifiers',
    'pp.s03': '<p>Nova may store identifiers provided by Discord in order to operate the bot:</p><ul><li><strong>User ID</strong> — links settings, AI history, event participation and moderation records to a user.</li><li><strong>Server (Guild) ID</strong> — separates configuration and data between servers, especially for Ban Zone.</li><li><strong>Channel ID</strong> — identifies AI channels, Ban Zone channels, help channels and interaction panels.</li><li><strong>Role ID</strong> — stores ping roles, hacker role, joined roles and event blacklist roles.</li><li><strong>Message ID</strong> — links interaction panels to specific messages.</li></ul><p>These identifiers are not used to identify you outside of Discord.</p>',
    'pp.s04t': 'Command interaction data',
    'pp.s04': '<p>When you use a Nova command, the bot may process the command name, the parameters you provide, and the server/channel where the command was invoked. This is required to execute the request and return the result to the right place.</p><p>Nova does not store the entire message history of your server. Only content you actively send to Nova features (for example an AI prompt) is processed.</p>',
    'pp.s05t': 'Server configuration data',
    'pp.s05': '<p>To operate War Ping / Backup Ping, Event, Ban Zone and other utilities, Nova may store:</p><ul><li>Channel configuration: help channel, Ban Zone channel, notification channel.</li><li>Role configuration: War Ping Role, Backup Ping Role, Joined War Role, Joined Backup Role, Hacker Role.</li><li>Trusted user lists and per-server Ban Zone whitelists.</li><li>War / Backup / Event session information: title, description, participant list.</li></ul><p>Configuration is stored <strong>per Discord server</strong>. A whitelist in one server does not affect another server.</p>',
    'pp.s06t': 'AI data',
    'pp.s06': '<p>When you use AI features, Nova may process:</p><ul><li>Prompts or messages you send to the AI (via <code>/chat</code>, <code>!chat</code> or an AI channel).</li><li>Image prompts sent via <code>/image</code> / <code>!image</code> and the images produced by the AI.</li><li>Conversation context (per-user or shared per channel, depending on configuration).</li><li>The persona and interface language you select.</li></ul><p>Content you send to the AI may be transmitted to the third-party model provider <strong>Qwen3.7-max</strong> in order to generate a response. We do not control that provider\'s data handling policies.</p>',
    'pp.s07t': 'Moderation-related data',
    'pp.s07': '<p>If Ban Zone and moderation commands are used, Nova may store:</p><ul><li>The Ban Zone channel configured for each server (stored per guild).</li><li>Ban Zone mode (ban or mute) and mute duration for each server.</li><li>The per-server Ban Zone whitelist.</li><li>Moderation events: ban, mute, unban, unmute, actions from <code>/ban</code>, <code>/mute</code>.</li><li>Voice kick logs if the bot has permission to view the audit log.</li></ul><p>This data is only used to operate the feature and is never used for advertising.</p>',
    'pp.s08t': 'How Nova uses information',
    'pp.s08': '<p>Data is used to:</p><ul><li>Execute commands and return results to the right user.</li><li>Maintain per-server configuration.</li><li>Operate AI, Ban Zone, War / Backup and Event features.</li><li>Keep the logs administrators need to review moderation actions.</li></ul><p>Nova does not sell user data and does not use data for advertising purposes.</p>',
    'pp.s09t': 'Data retention',
    'pp.s09': '<p>Data is stored in a local database on the machine that runs the bot. Retention depends on the specific feature:</p><ul><li>Personal AI history: can be cleared with the relevant command or automatically refreshed after a number of turns.</li><li>War / Backup / Event / Moderation data: kept until an administrator deletes or reconfigures it.</li><li>Persona and language: can be changed or reset via the relevant command.</li></ul><p>If the Ban Zone channel is deleted, Nova has a mechanism to detect this and restore based on the server\'s current configuration.</p>',
    'pp.s10t': 'Security',
    'pp.s10': '<p>We apply reasonable measures to protect data:</p><ul><li>Restricting access to the machine that runs the bot.</li><li>Limiting the bot\'s permissions following the principle of least privilege.</li><li>Using secure connections when the bot communicates with Discord and third-party providers.</li></ul><p>No system is perfectly secure. We do not guarantee that data will never be accessed without authorisation.</p>',
    'pp.s11t': 'Third-party services',
    'pp.s11': '<p>Nova uses third-party services where necessary to provide features:</p><ul><li><strong>Discord</strong> — the platform the bot runs on.</li><li><strong>AI provider</strong> — <strong>Qwen3.7-max</strong> — receives content you send to the AI to generate a response (text or image).</li><li><strong>Infrastructure provider</strong> — where the bot and local data are hosted.</li></ul><p>This list may change depending on how the bot is deployed.</p>',
    'pp.s12t': 'Your rights &amp; contact',
    'pp.s12': '<p>You can:</p><ul><li>Request deletion of data linked to your User ID.</li><li>Request deletion of configuration or data for a server you manage.</li><li>Remove Nova from a server at any time to stop further processing.</li></ul><p>For any questions about the Privacy Policy, please contact:</p><ul><li>Bot Owner: <strong>nova_.inovation</strong></li><li>Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a></li><li>Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener noreferrer">discord.gg/qkyu3G6WMa</a></li></ul>',

    'tos.title': 'Terms of <em>Service</em>',
    'tos.sub': 'The rules for using Nova.',
    'tos.s01t': 'Introduction',
    'tos.s01': '<p>Nova is a Discord bot providing AI Chatbot, AI Image, War Ping / Backup Ping, Event, Ban Zone and moderation tools. Nova is operated by <strong>nova_.inovation</strong>.</p><p><strong>Nova is a third-party Discord bot and is not an official Discord product.</strong> Nova is not endorsed by, sponsored by, or affiliated with Discord.</p>',
    'tos.s02t': 'Acceptance of terms',
    'tos.s02': '<p>By inviting Nova to a server or using any Nova feature, you agree to these Terms of Service. If you do not agree, please do not use Nova.</p>',
    'tos.s03t': 'Acceptable use',
    'tos.s03': '<p>You may only use Nova while complying with the Discord Terms of Service and Community Guidelines, and with the laws applicable in your region.</p><p>Nova is provided free of charge. The bot owner may change, suspend or discontinue any feature at any time.</p>',
    'tos.s04t': 'Prohibited abuse',
    'tos.s04': '<p>You agree not to use Nova to:</p><ul><li>Harass, threaten or abuse other users.</li><li>Participate in or support illegal activity.</li><li>Spam commands, channels or other users.</li><li>Exploit, crash or reverse engineer the bot.</li><li>Bypass permission systems, role hierarchy or whitelists.</li><li>Abuse moderation tools (Ban Zone, ban, mute) against users who did nothing wrong.</li></ul>',
    'tos.s05t': 'Discord permission requirements',
    'tos.s05': '<p>Many Nova features require the corresponding Discord permissions to work:</p><ul><li>Moderation commands (<code>/ban</code>, <code>/unban</code>, <code>/mute</code>, <code>/unmute</code>) require the appropriate permission, and Nova needs a higher role than the target.</li><li>Nova cannot act on the Server Owner or on roles above the bot.</li><li>Server configuration requires Manage Server permission.</li><li>Ban Zone whitelist management is restricted to the Server Owner.</li></ul>',
    'tos.s06t': 'AI feature limitations',
    'tos.s06': '<p>AI responses (text or images) may be inaccurate, incomplete or outdated. Do not treat AI output as fact or as professional, medical, legal or financial advice.</p><p>Nova does not guarantee that the AI will always answer correctly, appropriately, or without harmful content. The AI is powered by <strong>Qwen3.7-max</strong> and may include a fallback system when the primary service is unavailable.</p>',
    'tos.s07t': 'Moderation feature limitations',
    'tos.s07': '<p>Ban Zone and moderation tools are assistive tools and do not fully replace server administration.</p><ul><li>Nova does not guarantee complete raid protection or handling of every violating case.</li><li>Automated actions depend on server configuration, permissions and role hierarchy.</li><li>Server administrators are responsible for configuring and using the tools appropriately.</li></ul>',
    'tos.s08t': 'Availability',
    'tos.s08': '<p>Nova is provided "as is" and "as available". We do not guarantee 100% uptime or that every feature will run continuously.</p><p>Interruptions may come from Discord, the AI provider, the infrastructure provider, or bot maintenance.</p>',
    'tos.s09t': 'Service changes',
    'tos.s09': '<p>We may add, modify or remove any Nova feature at any time, including commands, permissions and behaviour.</p><p>These terms may also be updated. The latest version is always posted on this page. Continued use of Nova after an update means you accept the new version.</p>',
    'tos.s10t': 'Termination',
    'tos.s10': '<p>We may suspend or terminate access to Nova for any user or server that violates these Terms, without prior notice.</p><p>You may remove Nova from your server at any time to stop using the service.</p>',
    'tos.s11t': 'Limitation of liability',
    'tos.s11': '<p>The bot owner is not liable for any direct or indirect damages arising from the use or inability to use Nova, including but not limited to: data loss, server disruption, moderation actions, AI-generated content, or the outcome of War / Backup / Event sessions between servers.</p><p>You use Nova entirely at your own risk.</p>',
    'tos.s12t': 'Contact',
    'tos.s12': '<p>For any questions about the Terms of Service, please contact:</p><ul><li>Bot Owner: <strong>nova_.inovation</strong></li><li>Email: <a href="mailto:anhbao27072011@gmail.com">anhbao27072011@gmail.com</a></li><li>Support Server: <a href="https://discord.gg/qkyu3G6WMa" target="_blank" rel="noopener noreferrer">discord.gg/qkyu3G6WMa</a></li></ul>'
  }
};

const LANG_KEY = 'nova-language';
const ORIGINAL_VI = new WeakMap();

function t(key, lang) {
  const L = lang || currentLang;
  return (I18N[L] && I18N[L][key]) != null ? I18N[L][key] : (I18N.vi[key] != null ? I18N.vi[key] : key);
}
function tf(obj, lang) {
  if (!obj) return '';
  const L = lang || currentLang;
  return obj[L] != null ? obj[L] : (obj.vi != null ? obj.vi : '');
}

let currentLang = 'vi';

/* ============================================================
   LANGUAGE
   ============================================================ */
function getStoredLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === 'vi' || v === 'en') return v;
  } catch (e) {}
  return 'vi';
}

function snapshotOriginal() {
  document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-placeholder]').forEach(el => {
    if (ORIGINAL_VI.has(el)) return;
    ORIGINAL_VI.set(el, {
      html: el.innerHTML,
      text: el.textContent,
      placeholder: el.getAttribute('placeholder')
    });
  });
}

function applyLang(lang) {
  if (lang !== 'vi' && lang !== 'en') lang = 'vi';
  currentLang = lang;
  document.documentElement.lang = lang;
  const dict = I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if (val != null) el.textContent = val;
    else {
      const orig = ORIGINAL_VI.get(el);
      if (orig) el.textContent = orig.text;
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = dict[key];
    if (val != null) el.innerHTML = val;
    else {
      const orig = ORIGINAL_VI.get(el);
      if (orig) el.innerHTML = orig.html;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = dict[key];
    if (val != null) el.setAttribute('placeholder', val);
    else {
      const orig = ORIGINAL_VI.get(el);
      if (orig && orig.placeholder) el.setAttribute('placeholder', orig.placeholder);
    }
  });

  document.querySelectorAll('.lang button').forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  requestAnimationFrame(moveLangThumb);
  updateMeta(lang);

  /* re-render dynamic parts */
  renderFeatureNav();
  renderFeaturePanel();
  renderCommandsDirectory();
  renderHelpDropdown();
  renderHelpOutput();

  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
}

function moveLangThumb() {
  const wrap = document.querySelector('.lang');
  const thumb = document.querySelector('.lang-thumb');
  if (!wrap || !thumb) return;
  const active = wrap.querySelector('button.active');
  if (!active) return;
  thumb.style.transform = `translateX(${active.offsetLeft - 3}px)`;
  thumb.style.width = active.offsetWidth + 'px';
}

function updateMeta(lang) {
  const page = document.body.dataset.page;
  const titles = {
    index:   { vi: 'Nova — Intelligent Discord Bot',  en: 'Nova — Intelligent Discord Bot' },
    privacy: { vi: 'Chính sách bảo mật — Nova',        en: 'Privacy Policy — Nova' },
    terms:   { vi: 'Điều khoản dịch vụ — Nova',        en: 'Terms of Service — Nova' }
  };
  const descs = {
    vi: 'Nova là Discord bot thông minh cung cấp AI chat, tạo ảnh AI, moderation, Ban Zone, War / Backup, event và tiện ích server.',
    en: 'Nova is an intelligent Discord bot providing AI chat, AI image generation, moderation, Ban Zone, War / Backup tools, events and server utilities.'
  };
  if (page && titles[page]) document.title = titles[page][lang] || titles[page].vi;
  const d = document.querySelector('meta[name="description"]');
  if (d) d.setAttribute('content', descs[lang]);
}

/* ============================================================
   FEATURE SYSTEM
   ============================================================ */
let activeCat = 'ai';

function renderFeatureNav() {
  const nav = document.getElementById('featureNav');
  if (!nav) return;
  nav.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'feature-tab';
    btn.setAttribute('role', 'tab');
    btn.dataset.cat = cat.id;
    const on = cat.id === activeCat;
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
    btn.innerHTML =
      `<span class="tab-icon" aria-hidden="true">${cat.icon}</span>` +
      `<span class="tab-label">${escapeHtml(tf(cat.title))}</span>` +
      `<span class="tab-count">${cat.features.length}</span>`;
    btn.addEventListener('click', () => setCategory(cat.id, true));
    nav.appendChild(btn);
  });
}

function renderFeaturePanel() {
  const panel = document.getElementById('featurePanel');
  if (!panel) return;
  const cat = CATEGORIES.find(c => c.id === activeCat) || CATEGORIES[0];
  panel.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'feature-panel-head';
  head.innerHTML =
    `<h3><span aria-hidden="true">${cat.icon}</span><span>${escapeHtml(tf(cat.title))}</span></h3>` +
    `<p>${escapeHtml(tf(cat.blurb))}</p>`;
  panel.appendChild(head);

  const grid = document.createElement('div');
  grid.className = 'feature-grid';

  cat.features.forEach(f => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'feature-card';
    card.dataset.feature = f.id;
    const cmds = (f.commands || []).slice(0, 3).map(c =>
      `<span class="cmd-chip">${escapeHtml(c.name)}</span>`).join('');
    card.innerHTML =
      `<span class="feature-card-top">` +
        `<span class="feature-card-icon" aria-hidden="true">${f.icon || '•'}</span>` +
        `<h4>${escapeHtml(tf(f.title))}</h4>` +
      `</span>` +
      `<p>${escapeHtml(tf(f.desc))}</p>` +
      (cmds ? `<span class="cmd-chips">${cmds}</span>` : '');
    card.addEventListener('click', () => openFeature(f.id));
    grid.appendChild(card);
  });

  panel.appendChild(grid);
}

function setCategory(id, scroll) {
  if (!CATEGORIES.some(c => c.id === id)) return;
  activeCat = id;
  renderFeatureNav();
  renderFeaturePanel();
  document.querySelectorAll('[data-cat]').forEach(a => {
    a.classList.toggle('active', a.dataset.cat === id);
  });
  if (scroll) {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
  }
}

/* ============================================================
   MODAL
   ============================================================ */
let lastFocused = null;

function openFeature(id) {
  const f = FEATURE_INDEX[id];
  if (!f) return;
  const root = document.getElementById('modalRoot');
  const body = document.getElementById('modalBody');
  if (!root || !body) return;

  const cmds = (f.commands || []).map(c =>
    `<div class="mb-cmd">
       <code>${escapeHtml(c.name)}</code>
       <div class="mc-body">
         <div class="mc-desc">${escapeHtml(tf(c.desc))}</div>
         ${c.perm ? `<div class="mc-perm">${escapeHtml(t('modal.permLabel'))}: <strong>${escapeHtml(tf(c.perm))}</strong></div>` : ''}
       </div>
     </div>`).join('');

  const examples = (f.examples || []).map(e =>
    `<div class="mb-example">${escapeHtml(tf(e))}</div>`).join('');

  const related = (f.related || [])
    .map(rid => FEATURE_INDEX[rid] ? { id: rid, title: tf(FEATURE_INDEX[rid].title) } : null)
    .filter(Boolean)
    .map(r => `<button type="button" class="mb-rel-btn" data-rel="${r.id}">${escapeHtml(r.title)}</button>`)
    .join('');

  body.innerHTML =
    `<span class="mb-cat"><span aria-hidden="true">${f.catIcon}</span><span>${escapeHtml(tf(f.catTitle))}</span></span>` +
    `<h2 class="mb-title" id="modalTitle">${escapeHtml(tf(f.title))}</h2>` +
    `<p class="mb-desc">${escapeHtml(tf(f.desc))}</p>` +
    (cmds ? `<div class="mb-block"><div class="mb-label">${escapeHtml(t('modal.commands'))}</div><div class="mb-cmd-list">${cmds}</div></div>` : '') +
    (examples ? `<div class="mb-block"><div class="mb-label">${escapeHtml(t('modal.examples'))}</div><div class="mb-examples">${examples}</div></div>` : '') +
    (f.notes ? `<div class="mb-block"><div class="mb-label">${escapeHtml(t('modal.notes'))}</div><div class="mb-note">${escapeHtml(tf(f.notes))}</div></div>` : '') +
    (related ? `<div class="mb-block"><div class="mb-label">${escapeHtml(t('modal.related'))}</div><div class="mb-related">${related}</div></div>` : '');

  body.querySelectorAll('[data-rel]').forEach(btn => {
    btn.addEventListener('click', () => openFeature(btn.dataset.rel));
  });

  lastFocused = document.activeElement;
  root.classList.add('open');
  root.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const dialog = root.querySelector('.modal');
  if (dialog) dialog.focus();
}

function closeModal() {
  const root = document.getElementById('modalRoot');
  if (!root || !root.classList.contains('open')) return;
  root.classList.remove('open');
  root.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

/* ============================================================
   COMMANDS DIRECTORY
   ============================================================ */
function collectCommands() {
  const out = [];
  CATEGORIES.forEach(cat => {
    cat.features.forEach(f => {
      (f.commands || []).forEach(c => {
        out.push({
          name: c.name,
          desc: c.desc,
          perm: c.perm,
          catId: cat.id,
          catTitle: cat.title,
          featureId: f.id,
          featureTitle: f.title
        });
      });
    });
  });
  return out;
}

function renderCommandsDirectory() {
  const wrap = document.getElementById('commandsDirectory');
  if (!wrap) return;
  wrap.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const cmds = [];
    cat.features.forEach(f => {
      (f.commands || []).forEach(c => {
        cmds.push({ c, f });
      });
    });
    if (!cmds.length) return;

    const group = document.createElement('div');
    group.className = 'cmd-group';
    group.innerHTML =
      `<div class="cmd-group-head">` +
        `<span aria-hidden="true">${cat.icon}</span>` +
        `<span>${escapeHtml(tf(cat.title))}</span>` +
        `<span class="line" aria-hidden="true"></span>` +
        `<span class="count">${cmds.length} ${escapeHtml(t('cmd.groupCount'))}</span>` +
      `</div>`;

    const rows = document.createElement('div');
    rows.className = 'cmd-rows';

    cmds.forEach(({ c, f }) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'cmd-row';
      row.dataset.search = (c.name + ' ' + tf(c.desc) + ' ' + tf(f.title) + ' ' + tf(cat.title)).toLowerCase();
      row.innerHTML =
        `<code>${escapeHtml(c.name)}</code>` +
        `<span class="cr-body">` +
          `<span class="cr-desc">${escapeHtml(tf(c.desc))}</span>` +
          (c.perm ? `<span class="cr-perm">${escapeHtml(t('modal.permLabel'))}: <strong>${escapeHtml(tf(c.perm))}</strong></span>` : '') +
        `</span>`;
      row.addEventListener('click', () => openFeature(f.id));
      rows.appendChild(row);
    });

    group.appendChild(rows);
    wrap.appendChild(group);
  });
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
  const input = document.getElementById('commandSearch');
  const results = document.getElementById('searchResults');
  const clearBtn = document.getElementById('searchClear');
  if (!input || !results) return;

  let items = [];

  function rebuild() {
    items = collectCommands().map(c => ({
      ...c,
      hay: (c.name + ' ' + tf(c.desc) + ' ' + tf(c.featureTitle) + ' ' + tf(c.catTitle)).toLowerCase()
    }));
  }

  function render(q) {
    const query = q.trim().toLowerCase();
    if (!query) {
      results.hidden = true;
      results.innerHTML = '';
      if (clearBtn) clearBtn.hidden = true;
      return;
    }
    if (clearBtn) clearBtn.hidden = false;

    const matches = items.filter(i => i.hay.includes(query)).slice(0, 14);
    results.innerHTML = '';
    if (!matches.length) {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = t('search.noresults');
      results.appendChild(empty);
      results.hidden = false;
      return;
    }
    matches.forEach(m => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-result';
      btn.setAttribute('role', 'option');
      btn.innerHTML =
        `<code>${escapeHtml(m.name)}</code>` +
        `<span class="sr-desc">${escapeHtml(tf(m.desc))}</span>` +
        `<span class="sr-cat">${escapeHtml(tf(m.catTitle))}</span>`;
      btn.addEventListener('click', () => {
        results.hidden = true;
        input.value = '';
        if (clearBtn) clearBtn.hidden = true;
        openFeature(m.featureId);
      });
      results.appendChild(btn);
    });
    results.hidden = false;
  }

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('focus', () => { if (input.value.trim()) render(input.value); });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      render('');
      input.focus();
    });
  }

  document.addEventListener('click', e => {
    if (!results.contains(e.target) && e.target !== input) results.hidden = true;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !results.hidden) {
      results.hidden = true;
      input.blur();
    }
  });

  window.__rebuildSearchIndex = rebuild;
  rebuild();
}

/* ============================================================
   HELP MENU MOCKUP
   ============================================================ */
let helpCat = 'ai';

function renderHelpDropdown() {
  const menu = document.getElementById('helpDropdownMenu');
  const label = document.querySelector('#helpDropdown .dropdown-label');
  if (!menu) return;
  const prev = helpCat;
  menu.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'dropdown-item' + (cat.id === prev ? ' selected' : '');
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', cat.id === prev ? 'true' : 'false');
    item.dataset.cat = cat.id;
    item.innerHTML =
      `<span class="label"><span aria-hidden="true">${cat.icon}</span><span>${escapeHtml(tf(cat.title))}</span></span>` +
      `<span class="check" aria-hidden="true">✓</span>`;
    item.addEventListener('click', () => {
      helpCat = cat.id;
      const dd = document.getElementById('helpDropdown');
      if (dd) dd.classList.remove('open');
      const tg = dd && dd.querySelector('.dropdown-toggle');
      if (tg) tg.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('#helpDropdownMenu .dropdown-item').forEach(i => {
        const on = i.dataset.cat === helpCat;
        i.classList.toggle('selected', on);
        i.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (label) label.textContent = tf(cat.title);
      renderHelpOutput();
    });
    menu.appendChild(item);
  });
  if (label) {
    const cur = CATEGORIES.find(c => c.id === helpCat);
    if (cur) label.textContent = tf(cur.title);
  }
}

function renderHelpOutput() {
  const out = document.getElementById('helpOutput');
  if (!out) return;
  const cat = CATEGORIES.find(c => c.id === helpCat) || CATEGORIES[0];
  const items = cat.features.map(f => {
    const cmd = (f.commands && f.commands[0]) ? f.commands[0].name : (f.title.vi.startsWith('/') ? f.title.vi : '');
    return `<li>${cmd ? `<code>${escapeHtml(cmd)}</code>` : ''}<span>${escapeHtml(tf(f.title))} — ${escapeHtml(tf(f.desc))}</span></li>`;
  }).join('');
  out.innerHTML =
    `<h6><span aria-hidden="true">${cat.icon}</span><span>${escapeHtml(tf(cat.title))}</span></h6>` +
    `<div class="ho-blurb">${escapeHtml(tf(cat.blurb))}</div>` +
    `<ul>${items}</ul>`;
}

function initHelpDropdown() {
  const dd = document.getElementById('helpDropdown');
  if (!dd) return;
  const toggle = dd.querySelector('.dropdown-toggle');
  if (toggle) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = dd.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.addEventListener('click', e => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dd.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   NAVBAR / MOBILE MENU / SCROLL
   ============================================================ */
function initNavbar() {
  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const update = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.getElementById('mobileMenu');
  if (toggle && mobile) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!mobile.contains(e.target) && !toggle.contains(e.target)) {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* category links */
  document.querySelectorAll('[data-cat]').forEach(a => {
    a.addEventListener('click', e => {
      const cat = a.dataset.cat;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        setCategory(cat, true);
      } else if (href.indexOf('#features') !== -1) {
        e.preventDefault();
        window.location.href = href.replace(/#.*$/, '') + '#features';
        setTimeout(() => setCategory(cat, false), 120);
      }
    });
  });

  /* smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* active nav state on scroll */
  const sections = ['features', 'commands', 'help']
    .map(id => document.getElementById(id)).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${en.target.id}"]`);
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
  }
}

/* ============================================================
   INVITE BUTTONS
   ============================================================ */
function initInviteButtons() {
  document.querySelectorAll('[data-invite]').forEach(el => {
    el.setAttribute('href', CONFIG.BOT_INVITE_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ============================================================
   REVEAL
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (prefersReduced() || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const delay = parseInt(en.target.dataset.delay || '0', 10);
        setTimeout(() => en.target.classList.add('in'), delay);
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ============================================================
   AVATAR FALLBACK
   ============================================================ */
function initAvatar() {
  const wrap = document.getElementById('heroAvatar');
  const img = document.getElementById('heroAvatarImg');
  if (!wrap || !img) return;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    if (wrap.querySelector('.fallback')) return;
    const fb = document.createElement('div');
    fb.className = 'fallback';
    fb.textContent = '◉';
    wrap.appendChild(fb);
  });
}

/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
function initPageTransitions() {
  const fade = document.querySelector('.page-fade');
  if (!fade) return;
  fade.classList.remove('active');
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || /^https?:/i.test(href) || href.startsWith('mailto:')) return;
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      fade.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });
  window.addEventListener('pageshow', () => fade.classList.remove('active'));
}

/* ============================================================
   UTIL
   ============================================================ */
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function prefersReduced() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  document.body.classList.add('lang-loading');
  snapshotOriginal();

  /* initial dynamic render before language is applied */
  renderFeatureNav();
  renderFeaturePanel();
  renderCommandsDirectory();
  renderHelpDropdown();
  renderHelpOutput();
  initHelpDropdown();
  initSearch();

  applyLang(getStoredLang());

  initNavbar();
  initInviteButtons();
  initReveal();
  initAvatar();
  initPageTransitions();

  /* language switch */
  document.querySelectorAll('.lang button[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.lang);
      if (window.__rebuildSearchIndex) window.__rebuildSearchIndex();
    });
  });

  requestAnimationFrame(moveLangThumb);
  window.addEventListener('load', moveLangThumb);
  window.addEventListener('resize', moveLangThumb);

  /* modal close */
  document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  requestAnimationFrame(() => document.body.classList.remove('lang-loading'));
  document.body.classList.add('lang-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
