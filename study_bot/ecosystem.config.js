module.exports = {
    apps: [{
        name: 'study-bot',
        script: 'dist/index.js',
        cwd: './',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '200M',
        env: {
            NODE_ENV: 'production',
            SERVICE_ACCOUNT_PATH: './service-account.json',
            HEALTH_CHECK_PORT: '3000'
        },
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_file: './logs/pm2-combined.log',
        time: true,
        merge_logs: true
    }]
};
